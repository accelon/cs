import {glob,nodefs,writeChanged} from 'pitaka/cli';
await nodefs; //export fs to global
import offtextgen from './offtextgen.js';
import doInlineTag from './doinlinetag.js';

import transliterate from './transliterate.js';
import { shortenBodytext } from './buildutils.js';
const desfolder='../off/';
const srcfolder='../books/'; 
const testfn='dn1.xml';

let pat=process.argv[2]||testfn;

const filelist= glob(srcfolder,pat);

const Steps=[ /*transliterate*/, doInlineTag, offtextgen,shortenBodytext ];
const ctx={};
let  processed=0;  

filelist.forEach(fn=>{
    ctx.fn=fn;
    const outfn=fn.replace('.xml','');
    if (!fs.existsSync(fn)) fn=srcfolder+fn;
    let buf=fs.readFileSync(fn,'utf8');
    
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