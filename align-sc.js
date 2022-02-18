import {nodefs,glob, writeChanged,readTextLines} from 'pitaka/cli';
import {breakSentence,autoBreak,ensureArrayLength,toParagraphs} from "pitaka/utils";
await nodefs; //export fs to global
import { guidedBreak } from './src/guidedbreak.js';

// const desfolder='./ocs/break-by-sc/'; //copy to cs/breakpos
const srcfolder='./off/'
const desfolder='./off/'; //off is overwritable, ./pinpos/ need to 
const scfolder='../sc/pli/';     //
const testfn='dn1.off';
/*
  由 sc pli 指引的重排可能不完美，
  需手工修正後，產生pinpos，之後用pinpos 的資訊來產生分句。

*/
let pat=process.argv[2]||testfn;
const checkleadblank=(fn,lines)=>{
    for (let i=0;i<lines.length;i++) {
        if (lines[i][0]==' ') throw `${fn} line ${(i+1)} has leading blank`;
    }
}

const fixPunc=str=>{
    //.replace(/…\n pE…/g,'\n …pE…')
    return str.replace(/\n।/g,'।\n')
    .replace(/\^\n(v\[[^\]]+\])/g,'^$1\n')
    .replace(/ \n/g,'\n ').replace(/( ?‘)\n/g,'\n$1')
    .replace(/\n( ?–)/g,'$1\n');
}
const failmarker='<>';
const dofile=fn=>{
    const SC=readTextLines(scfolder+fn);
    const CS=readTextLines(srcfolder+fn);
    // checkleadblank(srcfolder+fn,sclines);
    // checkleadblank(csfolder+fn,cslines);

    const sc=toParagraphs(SC,{bkid:fn});
    const cs=toParagraphs(CS,{bkid:fn,combine:true});

    if (sc.length!==cs.length) {
        throw "max paragraph number unmatch cs "+cs.length+ ",sc "+sc.length
    }
    const out=[];
    for (let i=0;i<sc.length;i++) {
        const [id,sclines]=sc[i];
        const [id2,cslines]=cs[i];
        const problematic=[];
        if (id!==id2) throw "id unmatch "+id+ " "+id2;

        const breakpos=guidedBreak(id,sclines,cslines,problematic,'<>');

        let sents;
        if (!breakpos) {
            sents=autoBreak(cslines).sentences;
            sents[0]=failmarker+sents[0];    
            // console.log('no breakpos')
        } else {
            sents=breakSentence(cslines,breakpos);
            // if (id=="sn5.134-138") console.log(cs[i],sents);
        }

        ensureArrayLength(sents,sclines.length,failmarker)
        // sents=sents.map(it=>it.trim());
        out.push(...sents  ) ;
    }
    const outstr=fixPunc(out.join('\n'));
    if (writeChanged(desfolder+fn,outstr)) console.log('written',desfolder+fn);
}
const filelist= glob(srcfolder,pat);
filelist.forEach(dofile);