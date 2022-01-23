import {glob, patchBuf} from 'pitaka/utils' // faster than import from 'pitaka'
import {existsSync,readdirSync, readFileSync, writeFileSync} from 'fs';
import {enumTransliteration, deva2IAST} from 'provident-pali';
import {getErrata} from './cst4-errata.js'
console.log('conv-romn [filepat] [lang=ppl]')
console.log('available transliteration: ro,',enumTransliteration().join(','));
const lang=process.argv[3]||''; //hi,my,th,lo,km,si,tb

const srcfolder='/Cst4/Xml/'; //download Cst4 from tipitaka.org
const desfolder=lang?'../'+lang+'/':'../ppl/'; 

let allfiles=glob(readdirSync(srcfolder),  process.argv[2]);
console.log('processing',allfiles.length,'files')
allfiles.forEach(file=>{
    let buf=readFileSync(srcfolder+file , 'ucs2');
    const errata=getErrata(file);
    buf=patchBuf(buf,errata,file);

    const lines=buf.split('\n');
    let outbuf=lines.map((line,idx)=>{
        return deva2IAST(line ,(from,to)=>{
            console.log(file.replace(/\..+/,':'+(idx+1)),from,to);
        });
    }).join('\n');


    outbuf=outbuf.replace('tipitaka-deva.xsl','tipitaka-'+(lang?lang:'ppl')+'.xsl')
      .replace('encoding="UTF-16"','encoding="UTF-8"');
    const ofn=desfolder+file;
    const oldbuf=existsSync(ofn) && readFileSync(ofn,'utf8');
    if (oldbuf!==outbuf) {
        console.log('written',ofn,'length',buf.length)
        writeFileSync(ofn,outbuf,'utf8');
    } else {
        // console.log(ofn,'is clean')
    }    
})