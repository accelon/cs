
import PHandlers from './phandler.js'
import {getMAT} from './utils.js'
/*
   bkpf : book prefix , e.g  sn
   bkid : book id     , e.g  sn1
*/
export const handlers={
    'p':(el,ctx)=>{
        let text=el.innerText();
        const ph=PHandlers[ctx.bkid]||PHandlers[ctx.bkpf];
        let r;
        if (ph && ph[el.attrs.rend]) {
            r=ph[el.attrs.rend](el,ctx,text);
        }

        /*
          PHandlers 若返回 undefined ，表示未完成
        */
        if (typeof r!=='undefined') return r;
        let t='',rend=el.attrs.rend;
        
        let newline=true;
        if (rend==='subhead'){ 
            t='^h['+text+']';
            //副標與段合併，方便顯示
            newline=false;// combine subhead with <p n=
        } else if ( rend==='gatha1' || rend==='gatha2'|| rend==='gatha3'|| rend==='gathalast') {
            t='^sz '+text;
        } else if (rend==='centre'||rend==='nikaya'||rend==='book') {
            if (rend==='centre' ) { //remove namo tassa
                if (text.substr(0,2)==='॥ ') return '';
              else return '^end '+text+'\n';
            } else if (rend==='nikaya') {
                return '^bk'+getMAT(ctx.bkid)+ctx.bkid+'['+text+']';
            } else if (rend==='book') {
                //att,tik 以數字表達，最後的 a,t 去掉
                return '^bk'+getMAT(ctx.bkid)+ctx.bkid.replace(/(\d+)[at]$/,'$1')+'['+text+']';
            }
            t='^'+rend+'['+text+']';
        } else if (el.attrs.rend==='chapter') {
            ctx.clusterCount++;
            return '^c'+ctx.clusterCount+'['+text+']';
        } else {
            t=text;
        }
        if (el.attrs.pn || el.attrs.hn) {
            const pn=el.attrs.pn || el.attrs.hn;
            if (pn=="1") {
                //emit bk
            }
            if (el.attrs.hn) newline=false;
            t='^n'+pn+' '+text;
        }
        return t+(newline?'\n':'');
    },
    'div':(el,ctx)=>{
        // if (el.attrs.id) {
        //     const at=el.attrs.id.lastIndexOf('_');
        //     if (at>-1 && el.attrs.type!=='pannasaka' && ctx.bkpf!=='mn' && ctx.bkpf!=='ja') { //only AN has pannasaka
        //         ctx.cluster++;
        //     }
        // }
    },
    // 'head':(el,ctx)=>{
    //     let head='[t="'+el.innerText()+'"]';
    //     const rend=el.attrs.rend;
    //     if (rend==='chapter' ) {
    //         // if (ctx.bkpf=='mn') {
    //         //     return '';
    //         // } else if (ctx.bkpf=='ja') {
    //         //     return '\n\n^bk[id=ja'+parseInt(el.innerText())+']';
    //         // } else {
    //             return '^c'+ctx.cluster+head;
    //         }
    //     } else if (rend==='book') {
    //         return '';
    //     }
    //     if (ctx.bkpf!=='mn') head+='\n' //讓MN 的chapter 和 cluster 同一行
    //     return '^'+ (el.attrs.rend||'h')+head;
    // },
    "body":(el,ctx)=>{
        ctx.clusterCount=0;
    },
    "trailer":(el)=>{return '^trailer '+el.innerText()+'\n'},
    "hi":(el,ctx)=>{
        if (el.attrs.rend=='bold') {
            return '^b[ '
        } else {
            console.log(ctx.bkid,{text:ctx.snippet},'error hi tag '+el.innerText())
        }
    },
    "*":(el,ctx)=>{
        console.log("unknown tag",ctx.bkid,el.name,el.attrs);
    },
    "pb":(el,ctx)=>{}
}
export const closeHandlers={
    "hi":(el,ctx)=>{
        if (el.attrs.rend==='bold') return ctx.snippet+']';
    }
}