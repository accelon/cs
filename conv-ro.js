import {glob,nodefs,patchBuf, writeChanged} from 'pitaka/cli';
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
const splitBook=(fn,buf)=>{
    if (fn!=='abh07t.nrf.xml') {
        return [[fn,buf]];
    } else {
        const at1=buf.indexOf('<p rend="book">');//second book
        const at2=buf.indexOf('<p rend="book">',at1+1);//second book
        const header=buf.slice(0,at1);
        return [    
            ['abh07t.nrf.xml',buf.slice(0,at2)+'</body>\n<back></back>\n</text>\n</TEI.2>'],
            ['abh07t1.nrf.xml',header+buf.slice(at2)]
        ]
    }
}
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

    const buffers=splitBook(file,outbuf);
    buffers.forEach(([fn,buf])=>{
        const ofn=desfolder+fn;
        if (writeChanged(ofn,buf)) {
            console.log('written',ofn,'length',buf.length)
        }
    })
})