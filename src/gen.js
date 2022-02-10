import {glob,nodefs,writeChanged,readTextContent, readTextLines,LOCATORSEP} from 'pitaka/cli';
import {breakByHook} from 'pitaka/utils';
await nodefs; //export fs to global
import offtextgen from './offtextgen.js';
import doInlineTag from './doinlinetag.js';

import transliterate from './transliterate.js';
// import { shortenBodytext } from './buildutils.js';
const desfolder='../off/';
const srcfolder='../books/'; 
const hookfolder='../breakhook/'
const testfn='dn1.xml';

let pat=process.argv[2]||testfn;

const filelist= glob(srcfolder,pat);
const breaklines=(buf,ctx)=>{
    const lines=buf.split('\n');
    const out=[];
    for (let i=0;i<lines.length&&i<ctx.hooks.length;i++) {
        const id=ctx.bkid+LOCATORSEP+ctx.pn;
        if (!ctx.hooks[i]) {
            // console.log('no ohook',i,ctx.hooks[i],lines[i])
        }
        out.push( ... breakByHook(lines[i], ctx.hooks[i].split('\t'),id) );
    }
    return out.join('\n');
}
const Steps=[ transliterate, doInlineTag, offtextgen, breaklines];
const ctx={};
let  processed=0;  

filelist.forEach(fn=>{
    ctx.fn=fn;
    const outfn=fn.replace('.xml','');
    let buf=readTextContent(srcfolder+fn);
    ctx.hooks=readTextLines(hookfolder+fn.replace('.xml','.txt'))
    ctx.outfn=outfn;
    // ctx.cluster=ClusterStarts[outfn]||0;
    // ctx.validateClusterNum= !fn.match(/^mn/)
    processed++;
    Steps.forEach(step=>buf=step(buf,ctx));
    buf=buf.trim().split('\n').filter(ln=>!!ln).join('\n');
    
    const ofn=desfolder+outfn+'.off';

    if (writeChanged(ofn, buf)) {
        console.log('written',ofn)
    }
})
process.stdout.write('\n');
console.log('processed',processed,'all',filelist.length);