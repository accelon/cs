import {readFileSync,writeFileSync} from 'fs'
import deva2provident from './deva2provident.js';

const filelists=['s0501m.mul','s0201m.mul'];
const srcfolder='../Xml/';
const outfolder='../';
const xmlheader='<?xml version="1.0" encoding="UTF-16"?>\n<?xml-stylesheet type="text/xsl" href="tipitaka-deva.xsl"?>\n<TEI.2>\n<teiHeader></teiHeader>\n<text>\n<front></front>\n<body xml:space="preserve">'
const xmlfooter='</body>\n<back></back>\n</text>\n</TEI.2>'
const htmlheader='<!DOCTYPE html><head><link rel="stylesheet" href="cs.css"><head>\n<body xml:space="preserve" class="provident">'
const htmlfooter='</body></html>'
filelists.forEach(file=>{
    const content=deva2provident(readFileSync(srcfolder+file+'.xml','ucs2')
    .replace(/\r?\n/g,'\n').replace(xmlheader,htmlheader).replace(xmlfooter,htmlfooter));

    // console.log(content.length,content.substr(1,300));
    writeFileSync(outfolder+file+'.htm',content,'utf8');
})