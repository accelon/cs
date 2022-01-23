export const handlers={
    'p':(el,ctx)=>{
        let t='',rend=el.attrs.rend,closebracket=false;
        let text=el.innerText();
        if (rend=='subhead'){ 
            if ((ctx.bkpf=='mn'||ctx.bkpf=='ja') && parseInt(text)) { 
                //MN 中經名必有數字，無數字的如 MN10 uddeso不是經名
                //JA 以 本生為 cluster
                ctx.cluster++;
                if (ctx.cluster!==parseInt(text)) {
                    if (!ctx.error_inconsistent) {
                        console.log('warning inconsistent number',ctx.cluster,parseInt(text))
                    }
                    ctx.error_inconsistent=true;
                }
                t='\n^c'+ctx.cluster+'[t="'
            } else {
                t='^h[t="';
            }
            closebracket=2;    
        } else if ( rend==='gatha1' || rend==='gatha2'|| rend==='gatha3'|| rend==='gathalast') {
            t='^sz ';
        } else if (rend==='centre'||rend==='nikaya') {
            if (rend==='centre' ) { //remove namo tassa
                if (text.substr(0,2)==='||') return '';
                else return '^end '+text;
            }
            if (rend==='nikaya') {
                const last=ctx.bkid.substr(ctx.bkid.length-1);
                if ((last=='1' || isNaN(parseInt(last))) && ctx.bkpf!=='ja') {
                    return '^bk[id='+ctx.bkid+']';
                }
                return '';
            }
            t='^'+rend+'[';
            closebracket=1;
        } else if ( ctx.bkpf=='ja') {//ja att use p , ja mul use head
            if (el.attrs.rend=='chapter') {
                return '\n^bk[id=ja'+parseInt(text)+']'+text;
            } else if (el.attrs.rend=='title') {
                if (ctx.bkid.length==3) {
                    return ''; //drop title of ja mula
                } else {
                    return '\n^title['+text+']';
                }
            }
        }
        if (el.attrs.n) {
            t='^n'+el.attrs.n;
        }
        t=t+text;
        if (closebracket>1) t+='"]'
        else if (closebracket) t+=']';
        return t+'\n';
    },
    'div':(el,ctx)=>{
        if (el.attrs.id) {
            const at=el.attrs.id.lastIndexOf('_');
            if (at>-1 && el.attrs.type!=='pannasaka' && ctx.bkpf!=='mn' && ctx.bkpf!=='ja') { //only AN has pannasaka
                ctx.cluster++;
            }
        }
    },
    'head':(el,ctx)=>{
        let head='[t="'+el.innerText()+'"]';
        const rend=el.attrs.rend;
        if (rend==='chapter' ) {
            if (ctx.bkpf=='mn') {
                return '';
            } else if (ctx.bkpf=='ja') {
                return '\n\n^bk[id=ja'+parseInt(el.innerText())+']';
            } else {
                return '^c'+ctx.cluster+head+'\n';
            }
        } else if (rend==='book') {
            return '';
        }
        if (ctx.bkpf!=='mn') head+='\n' //讓MN 的chapter 和 cluster 同一行
        return '^'+ (el.attrs.rend||'h')+head;
    },
    "body":()=>{},
    "trailer":()=>{},
    "hi":(el,ctx)=>{
        if (el.attrs.rend=='bold') {
            return '^b[ '
        } else {
            console.log('error hi tag')
        }
    },
    "*":(el,ctx)=>{
        console.log("unknown tag",el.name,el.attrs);
    }
}
export const closeHandlers={
    "hi":(el,ctx)=>{
        if (el.attrs.rend==='bold') return ctx.snippet+']';
    }
}