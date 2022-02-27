import {glob,nodefs,patchBuf} from 'pitaka/cli';
await nodefs; //export fs to global
import {enumTransliteration, deva2IAST} from 'provident-pali';

import {getErrata} from './src/cst4-errata.js'
console.log('conv-romn [filepat]')
// console.log('available transliteration: ro,',enumTransliteration().join(','));
const srcfolder='./Cst4/Xml/'; //download Cst4 from tipitaka.org
const desfolder='./ro/';

if (!fs.existsSync(srcfolder)) throw 'cst4 xml not found '+srcfolder;
if (!fs.existsSync(desfolder)) fs.mkdirSync(desfolder);

let allfiles=glob(fs.readdirSync(srcfolder),  process.argv[2]);
console.log('processing',allfiles.length,'files')
allfiles.forEach(file=>{
    let buf=fs.readFileSync(srcfolder+file , 'ucs2');
    const errata=getErrata(file);
    buf=patchBuf(buf,errata,file);

    const lines=buf.split('\n');
    let outbuf=lines.map((line,idx)=>{
        return deva2IAST(line ,(from,to)=>{
            console.log(file.replace(/\..+/,':'+(idx+1)),from,to);
        });
    }).join('\n');

    //remove style sheet and change encoding
    outbuf=outbuf.replace('<?xml-stylesheet type="text/xsl" href="tipitaka-deva.xsl"?>','')
      .replace('encoding="UTF-16"','encoding="UTF-8"');
    const ofn=desfolder+file;
    const oldbuf=fs.existsSync(ofn) && fs.readFileSync(ofn,'utf8');
    if (oldbuf!==outbuf) {
        console.log('written',ofn,'length',buf.length)
        fs.writeFileSync(ofn,outbuf,'utf8');
    } else {
        // console.log(ofn,'is clean')
    }    
})