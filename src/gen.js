import {existsSync, readdirSync,readFileSync,writeFileSync} from 'fs'
import fixCST4 from './cst4-errata.js';
import prolog from './prolog.js';
import translit from './transliterate.js';
import epilog from './epilog.js';
import offtextgen from './offtextgen.js';
import {cst4rename,ClusterStarts} from './cst4rename.js';
import doInlineTag from './doinlinetag.js';
import {OFFTAG_REGEX_G} from 'pitaka/offtext';

const outfolder='../off/';
const srcfolder='/Cst4/Xml/'; //download Cst4 from tipitaka.org
const testfn='s0513a1.att.xml';
// const testfn='s0401m.mul.xml';
// const testfn='sample.xml';

let fn1=process.argv[2]?process.argv[2]:testfn;
let allfiles=readdirSync(srcfolder);
if (fn1) {
    if (fn1.indexOf('?')>-1) { //consists pattern
        const pat=fn1.replace(/\?/g,'.');
        const reg=new RegExp(pat);
        allfiles=allfiles.filter(f=>f.match(reg));
        fn1='';
    }else if (!existsSync(srcfolder+fn1)) {
        if (!existsSync(fn1)) {
            throw "file not found "+fn1
        }
    }    
}

 
const filelist=fn1?[fn1]:allfiles;

const trimBodytext=buf=>{
    let out='',prev=0;
    buf.replace(OFFTAG_REGEX_G,(m,name,attr,p)=>{
        const lines= buf.substring(prev,p ).split('\n');

        lines.forEach((line,idx)=>{
            const at=line.indexOf(' ',4);
            if (idx) out+='\n'
            if (at>-1) {
                out+=line.substr(0,at)+'+' +(line.length-at).toString()
            } else {
                out+=line;
            }
            
        })
        
        out+='^'+name+(attr?attr:'')
        prev=p+m.length;
    })
    return out;
}
const Steps=[fixCST4, prolog ,translit ,doInlineTag, epilog, offtextgen,trimBodytext ];
const ctx={};
let  processed=0;  

filelist.forEach(fn=>{
    if (!fn.endsWith('.xml'))return;
    const outfn=cst4rename(fn);
    if (!outfn) return;

    ctx.fn=fn;
    if (!existsSync(fn)) fn=srcfolder+fn;
    let buf=readFileSync(fn,'ucs2');
    
    ctx.outfn=outfn;
    ctx.cluster=ClusterStarts[outfn]||0;
    processed++;
    Steps.forEach(step=>buf=step(buf,ctx));
    buf=buf.trim().split('\n').filter(ln=>!!ln).join('\n');
    
    const ofn=outfolder+outfn+'.off';
    const oldbuf=existsSync(ofn) && readFileSync(ofn,'utf8');
    if (oldbuf!==buf) {
        console.log('writen',ofn)
        writeFileSync(ofn,buf,'utf8');
    }
})
process.stdout.write('\n');
console.log('processed',processed,'all',filelist.length);