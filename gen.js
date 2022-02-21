import {glob,nodefs,DELTASEP,writeChanged,readTextContent, readTextLines,LOCATORSEP} from 'pitaka/cli';
import {beforePN,afterPN, breakByPin,sentenceRatio} from 'pitaka/utils';

await nodefs; //export fs to global
import offtextgen from './src/offtextgen.js';
import doInlineTag from './src/doinlinetag.js';

import transliterate from './src/transliterate.js';
// import { shortenBodytext } from './buildutils.js';

const srcfolder='./books/'; 
const brkfolder='./brk/'
const testfn='dn1.xml';
console.log('node gen filepat [p]');
let pat=process.argv[2]||testfn;
let paramode=process.argv[3]==='p';
const desfolder=paramode?'par/':'off/';

const filelist= glob(srcfolder,pat);
const breaklines=(buf,ctx)=>{
    if (!ctx.pins) return buf;
    const lines=buf.split('\n');
    const out=[];
    let pn='';
    for (let i=0;i<lines.length&&i<ctx.pins.length;i++) {
        const m=lines[i].match(/\^n([\d\-]+)/);
        if (m) pn=m[1];
        const id=ctx.fn.replace('.xml','')+LOCATORSEP+pn;
        if (!ctx.pins[i].length) {
            throw `empty pin entry of ${id}, #${i+1}`
        }
        const pins=ctx.pins[i].split('\t');
        const pinpn=pins.shift();
        if (pn!==pinpn && pinpn[0]!==DELTASEP) {
            throw `pin paranum missmatch ${id} != ${pinpn}, #${i+1}`
        }
        const before=beforePN(lines[i]);
        let sentences=breakByPin(afterPN(lines[i]), pins,id);
        sentences[0]=before+sentences[0]
        out.push( ...sentences  );
    }
    return out.join('\n');
}
const Steps=[ transliterate, doInlineTag, offtextgen, breaklines];
const ctx={};
let  processed=0;  

filelist.forEach(fn=>{
    ctx.fn=fn;
    ctx.notes=[];
    const bkid=fn.replace('.xml','');
    let buf=readTextContent(srcfolder+fn);
    const pinfn=brkfolder+fn.replace('.xml','.txt');
    if (!paramode&&fs.existsSync(pinfn) ) {
        ctx.pins=readTextLines(pinfn);
        console.log('using pin',pinfn)
    } else ctx.pins=null;
    ctx.outfn=bkid;
    // ctx.cluster=ClusterStarts[outfn]||0;
    // ctx.validateClusterNum= !fn.match(/^mn/)
    processed++;
    Steps.forEach(step=>buf=step(buf,ctx));
    buf=buf.trim();
    
    const ofn=desfolder+bkid+'.off';

    if (ctx.notes.length) { //將校勘移出本文, 先用流水號，之後再處理
        const notefn=desfolder+bkid+'.notes';
        ctx.notes.unshift('^bk#'+bkid+'.notes');
        if (writeChanged(notefn,ctx.notes.join('\n'))){
            console.log('written notes',notefn,ctx.notes.length)
        }
        ctx.notes=[];
    }
    if (writeChanged(ofn, buf)) {
        console.log('written',ofn)
    }
})
process.stdout.write('\n');
console.log('processed',processed,'all',filelist.length);