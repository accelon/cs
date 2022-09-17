import { toBase26 } from "ptk/nodebundle.cjs";
const DN_SUTTA = {1:0,2:13,3:23}
const MN_SUTTA = {1:0,2:50,3:100}
const SN_SAMYUTTA = {1:0,2:11,3:21,4:34,5:44}
const JA_JATAKA={
    ja1:0    , ja1a1:0,ja1a2:150, ja1a3:300, ja1a4:438,
    ja2:520  , ja2a1:520, ja2a2:537, ja2a3:542,
    
}

export default { //key is bkid or bkpf , bkid has precedence
    'pj':{
        'chapter':(el,ctx,text,mat)=>{
            const n=parseInt(text);
            const id=ctx.div_id.substr(ctx.div_id.length-1);
            if (isNaN(n)) { // verañjakaṇḍaṃ , at the begining 只輸出第一個chapter,之後的chapter 緊接著有title
                return '^ck'+mat+'mv1['+text+']';
            } else return '^mv'+id+'['+text+']'; 
        },
        'title':(el,ctx,text,mat)=>{
            const n=parseInt(text);
            const id=ctx.div_id.substr(ctx.div_id.length-1);
            if (!isNaN(n) ) {
                return '^ck'+mat+'mv'+ id+toBase26(n-1)+'['+text+']';
            }
        }
    },
    'pc':{
        'chapter':(el,ctx,text,mat)=>{
            let id=parseInt(ctx.div_id.substr(ctx.div_id.length-1));
            if (ctx.div_id.substr(0,6)==='vin2_5') {///bhikkhuni
                id+=4; //bhikkhu pc 有四章，bhikkhuni從5起算
                if (ctx.div_id==='vin2_5_4'||ctx.div_id==='vin2_5_6') { //此三章有title
                    return '^ck'+mat+'cv'+id+'['+text+']';
                } else {
                    return '^ck'+mat+'cv'+id+'['+text+']';    
                }
            } else {
                if (ctx.div_id==='vin2_4') {//此chapter 無title
                    return '^ck'+mat+'cv4['+text+']';    
                } else return '^ck'+mat+'cv'+id+'['+text+']';//其餘的chapter 有title
            }
        },
        'title':(el,ctx,text,mat)=>{
            let id=parseInt(ctx.div_id.substr(ctx.div_id.length-1));
            if (ctx.div_id.substr(0,6)==='vin2_5') {///bhikkhuni
                id+=4; 
                const n=parseInt(text)-1;
                return '^ck'+mat+'cv'+id+toBase26(n)+'['+text+']';    
            } else {
                const n=parseInt(text);
                if (!isNaN(n) ) {
                    return '^ck'+mat+'cv'+ id+toBase26(n-1)+'['+text+']';
                }
            }
        }
    },
    'mv':{
        'chapter':(el,ctx,text,mat)=>{
            const n=parseInt(text);
            return '^ck'+mat+'mv'+n +'['+text+']';
        }
    },
    'cv':{
        'chapter':(el,ctx,text,mat)=>{
            const n=parseInt(text);
            return '^ck'+mat+'cv'+n +'['+text+']';
        }
    },
    'pvr':{ 
        'chapter':(el,ctx,text,mat)=>{
            let id=parseInt(ctx.div_id.substr(ctx.div_id.length-2).replace('_',''));
            if (id>=2) { 
                //vin5_2 對 pvr3_root-pli, vin5_3 =>4
                //samathabhedo 對 5
                //vin5_4 對 6 ...
                //atthavasapakaraṇaṃ 對 9
                //vin5_18 對 pvr21

                if (id===2) ctx.chunkCount=2;//
                ctx.chunkCount++;
                return '^ck'+mat+'pvr'+ctx.chunkCount+'['+text+']';
            } else return '^h['+text+']';//for soḷasamahāvāro
        },
        'title':(el,ctx,text,mat)=>{
            if (ctx.pn=="200") {
                ctx.chunkCount=0; //reset at bhikkhunivibhango
                ctx.pvr_n=2;
            }
            if (ctx.div_id==="vin5") return '^h['+text+']';//一開頭的 bhikkhuvibhango 多了1.，bhikkhunivibhango 少了2.
            const n=parseInt(text);
            //VRI 標為 1~8 , 1~8 ，用chunkCount改為1~16
            if (!isNaN(parseInt(n)) || ctx.div_id==='vin5_3') {
                return '^ck'+mat+'pvr'+(ctx.pvr_n||1)+ toBase26(ctx.chunkCount++) +'['+text+']';
            } else {
                return '^h['+text+']';
            }
        },
        
    },
    'dn':{
        'chapter':(el,ctx,text,mat)=>{
            const sutta=DN_SUTTA[ctx.bkid.substr(2)] + parseInt(text);
            return '^ck#d'+ sutta+'['+text+']';
        }
    },
    'mn':{
        'chapter':(el,ctx,text,mat)=>{
            return '^h['+text+']'
        },
        'subhead':(el,ctx,text,mat)=>{
            if (parseInt(text)) {
                //MN 中經名必有數字，無數字的如 MN10 uddeso不是經名
                ctx.chunkCount++; //reset on each file
                const sutta=MN_SUTTA[ctx.bkid.substr(2)] + (ctx.chunkCount);
                return '^ck#m'+sutta+'['+text+']';
            } else {
                return '^h['+text+']';
            }
        }
    },
    'sn':{  
        'chapter': (el,ctx,text,mat)=>{ //samyutta
            ctx.samy=SN_SAMYUTTA[ctx.bkid.substr(2)] + parseInt(text);
            ctx.vaggo=-1;
            return '^ck#s'+ctx.samy+'['+text+']';
        },
        'title': (el,ctx,text,mat)=>{
            return '^ck#s'+ctx.samy+  toBase26(++ctx.vaggo)+'['+text+']';
        },          //big samyutta has vaggo
        'subhead':(el,ctx,text,mat)=>{         //sutta
            return '^h' +'['+text+']';
        }
    },
    'an':{
        'book':(el,ctx)=>{
            ctx.vaggo=-1;
        },
        'chapter': (el,ctx,text,mat)=>{ //nipata
            let t=text;
            const nipata= parseInt(ctx.bkid.substr(2));
            if (text[0]=='(')t=text.substr(1);
            ctx.vaggo++;
            return '^ck#a'+nipata+toBase26(ctx.vaggo)+'['+text+']';
        },
        'title': (el,ctx,text,mat)=>{return ""},//skip pannasaka 不輸出文字(SC版無)
        'subhead':(el,ctx,text,mat)=>{         //sutta
            return '^h['+text+']';
        }
    },
 
    'ja':{
        'chapter':(el,ctx,text,mat)=>{return '\n\n^bk'+mat+'ja'+parseInt(text)+' '},
        'title':(el,ctx,text,mat)=>{
            if (ctx.bkid.length==3) {
                return ''; //drop title of ja mula
            } else {
                return '\n^title['+text+']';
            }
        },
        'subhead':(el,ctx,text,mat)=>{ //JA 以 本生為 chunk
            const sutta=JA_JATAKA[ctx.bkid] + parseInt(text);
            return '^ck#m'+sutta+'['+text+']';  
        }
    },
    'aas':{//abhidhammattha sangaha
        'chapter':(el,ctx,text,mat)=>{
            ctx.chunkCount++;
            return  '^ck#aas'+ctx.chunkCount+'['+text+']';  
        },
    },
    'vs':{//visuddhimagga 
        'chapter':(el,ctx,text,mat)=>{
            if (ctx.bkid.substr(2,1)=='2' && ctx.chunkCount==0) ctx.chunkCount=11;
            ctx.chunkCount++;
            if (ctx.chunkCount==1) return '' //skip ck1,n1
            return  '^ck#vs'+ctx.chunkCount+'['+text+']';  
        },
        'book':(el,ctx,text,mat)=>{
            return '^bk#vs^ck#vs1[1. '+text+']^n1 ';//去掉 1a,2a
        }
    }
}