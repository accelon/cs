import {existsSync, readdirSync,readFileSync} from 'fs'

import fixCST4 from './cst4-errata.js';
import prolog from './prolog.js';
import translit from './transliterate.js';
import aname from './aname.js';
import epilog from './epilog.js';
import htmlgen from './htmlgen.js';

const srcfolder='/Cst4/Xml/'; //download Cst4 from tipitaka.org
const testfn='s0102m.mul.xml';
const fn1=process.argv[2]?process.argv[2]:testfn;
const allfiles=readdirSync(srcfolder);
if (fn1&&!existsSync(srcfolder+fn1)) {
    throw "file not exists "+fn1;
}
const filelist=fn1?[fn1]:allfiles;

const Steps=[fixCST4, prolog ,translit ,  aname, epilog, htmlgen];
const ctx={};
filelist.forEach(fn=>{
    if (!fn.endsWith('.xml'))return;
    let lines=readFileSync(srcfolder+fn,'ucs2').split(/\r?\n/);
    process.stdout.write('\r'+fn+' linecount:'+lines.length);
    ctx.fn=fn;
    Steps.forEach(step=>lines=step(lines,ctx));
})
process.stdout.write('\n');
console.log('processed',filelist.length ,'files');
console.log('context',ctx)