import {glob,nodefs,writeChanged,readTextContent, readTextLines,LOCATORSEP} from 'pitaka/cli';
import {breakByHook} from 'pitaka/utils';
await nodefs; //export fs to global
import offtextgen from './src/offtextgen.js';
import doInlineTag from './src/doinlinetag.js';

import transliterate from './src/transliterate.js';
// import { shortenBodytext } from './buildutils.js';
const desfolder='./off/';
const srcfolder='./books/'; 
const hookfolder='./breakhook/'
const testfn='dn1.xml';

let pat=process.argv[2]||testfn;

const filelist= glob(srcfolder,pat);
const breaklines=(buf,ctx)=>{
    if (!ctx.hooks) return buf;
    const lines=buf.split('\n');
    const out=[];
    let pn='';
    for (let i=0;i<lines.length&&i<ctx.hooks.length;i++) {
        const m=lines[i].match(/\^n([\d\-]+)/);
        if (m) pn=m[1];
        const id=ctx.fn.replace('.xml','')+LOCATORSEP+pn;
        if (ctx.hooks[i]) {
            out.push( ... breakByHook(lines[i], ctx.hooks[i].split('\t'),id) );
        } else {
            out.push(lines[i]);
        }
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
    const hookfn=hookfolder+fn.replace('.xml','.txt');
    if (fs.existsSync(hookfn) ) ctx.hooks=readTextLines(hookfn);
    else ctx.hooks=null;
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