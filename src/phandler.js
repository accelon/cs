import { toBase26 } from "pitaka/utils";
const DN_SUTTA = {1:0,2:13,3:23}
const MN_SUTTA = {1:0,2:50,3:100}
const SN_SAMYUTTA = {1:0,2:11,3:21,4:34,5:44}
const JA_JATAKA={
    ja1:0    , ja1a1:0,ja1a2:150, ja1a3:300, ja1a4:438,
    ja2:520  , ja2a1:520, ja2a2:537, ja2a3:542,
    
}

import {getMAT} from './utils.js'

export default { //key is bkid or bkpf , bkid has precedence
    'dn':{
        'chapter':(el,ctx,text)=>{
            const sutta=DN_SUTTA[ctx.bkid.substr(2)] + parseInt(text);
            return '^c'+getMAT(ctx.bkid)+'d'+ sutta+'['+text+']';
        }
    },
    'sn':{  
        'chapter': (el,ctx,text)=>{ //samyutta
            ctx.samy=SN_SAMYUTTA[ctx.bkid.substr(2)] + parseInt(text);
            ctx.vaggo=-1;
            return '^c'+getMAT(ctx.bkid)+'s'+ctx.samy+'['+text+']';
        },
        'title': (el,ctx,text)=>{
            return '^c'+getMAT(ctx.bkid)+'s'+ctx.samy+  toBase26(++ctx.vaggo)+'['+text+']';
        },          //big samyutta has vaggo
        'subhead':(el,ctx,text)=>{         //sutta
            return '^h' +'['+text+']';
        }
    },
    'an':{
        'book':(el,ctx)=>{
            ctx.vaggo=-1;
        },
        'chapter': (el,ctx,text)=>{ //nipata
            let t=text;
            const nipata= parseInt(ctx.bkid.substr(2));
            if (text[0]=='(')t=text.substr(1);
            ctx.vaggo++;
            return '^c'+getMAT(ctx.bkid)+'a'+nipata+toBase26(ctx.vaggo)+'['+text+']';
        },
        'title': (el,ctx,text)=>{},//skip pannasaka
        'subhead':(el,ctx,text)=>{         //sutta
            return '^h' +'['+text+']';
        }
    },
    'mn':{
        'chapter':(el,ctx,text)=>{
            return '^h['+text+']'
        },
        'subhead':(el,ctx,text)=>{
            if (parseInt(text)) {
                //MN 中經名必有數字，無數字的如 MN10 uddeso不是經名
                ctx.clusterCount++; //reset on each file
                const sutta=MN_SUTTA[ctx.bkid.substr(2)] + (ctx.clusterCount);
                return '^c'+getMAT(ctx.bkid)+'m'+sutta+'['+text+']';         
            } else {
                return '^h['+text+']';
            }
        }
    },
    'ja':{
        'chapter':(el,ctx,text)=>{return '\n\n^bk'+getMAT(ctx.bkid)+'ja'+parseInt(text)+']'},
        'title':(el,ctx,text)=>{
            if (ctx.bkid.length==3) {
                return ''; //drop title of ja mula
            } else {
                return '\n^title['+text+']';
            }
        },
        'subhead':(el,ctx,text)=>{ //JA 以 本生為 cluster
            const sutta=JA_JATAKA[ctx.bkid] + parseInt(text);
            return '^c'+getMAT(ctx.bkid)+'m'+sutta+'['+text+']';  
        }
    },
    'vs':{//visuddhimagga , vs1,vs2
        'chapter':(el,ctx,text)=>{
            if (ctx.bkid.substr(2,1)=='2' && ctx.clusterCount==0) ctx.clusterCount=11;
            ctx.clusterCount++;
            return  '^c'+getMAT(ctx.bkid)+'vs'+ctx.clusterCount+'['+text+']';  
        },
        'book':(el,ctx,text)=>{
            if (ctx.bkid.substr(2,1)=='1') {
                return '^bk'+getMAT(ctx.bkid)+'vs['+text+']';//去掉 1a,2a
            } else return ''; //雖分為兩檔(vs1:1-365, vs2:366-896)，但段落連號 ，合併為一書號 vs
        }
    }
}