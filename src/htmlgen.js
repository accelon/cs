import { writeFileSync } from 'fs';
import cst4files from './cst4files.js';

import fileanchors from './fileanchors.js';
const outfolder='../';
const htmlheader='<html><head><meta charset="utf-8">'
+'<link rel="stylesheet" href="../cs.css">'
+'<script defer src="../../pryt.js">'
+'</script></head><body><xml>'
const htmlfooter='</xml></body></html>'


const equip=(lines,ctx)=>{
    lines.unshift(htmlheader);
    lines.push(htmlfooter)
    return lines;
}
const htmlSteps=[equip, fileanchors ];

const cutByDiv=(lines,bookname,divtype_seq,ctx)=>{
    let outfn='',start=0, out=[], writecount=0;
    const folder=outfolder+bookname.replace(/\d+$/,'')+'/';

    let divtype=divtype_seq,seq=1;
    const at=divtype_seq.indexOf('@');
    if (at>0) {
        divtype=divtype_seq.substr(0,at);
        seq=parseInt(divtype_seq.substr(at+1));
    }
    const writeHTML=()=>{
        ctx.htmlfn=outfn;
        htmlSteps.forEach(step=>out=step(out,ctx));
        if (writecount<1) writeFileSync(folder+outfn,out.join('\n'),'utf8')
        out.length=0;
        writecount++;
    }
    lines.forEach((line,idx)=>{
        const sub5=line.substr(0,5);
        if (sub5==='<div ') {
            if (start && outfn) writeHTML();
            if ( line.indexOf('type="'+divtype+'"')>-1) {
                outfn=seq+'.'+bookname+'.htm';
                start=idx;
                seq++;
            }
        } else if (sub5==='</div') {

        } else {
            out.push(line);
        }
    })
    writeHTML();
}

const cutByParanum=(lines,bookname,cutpoint,ctx)=>{
    let outfn='',out=[];
    for (let i=0;i<lines.length;i++) {
        const line=lines[i];
        const at=line.indexOf('<a name="');
        if (at>-1 && at<20) {
            console.log(line.substr(0,at+10));
        }
    }
}
export default function(lines,ctx){
    const {fn}=ctx;
    for (let i=0;i<6;i++) lines.shift();
    if (lines[0]!=='<body xml:space="preserve">') throw "not a cst4 xml"+fn;
    lines.shift();
    if (lines[lines.length-1]!=='</TEI.2>') throw "not a cst4 xml"+fn;
    lines.pop();lines.pop();lines.pop();lines.pop();//drop the last 4 lines

    const fileinfo=cst4files[fn];
    if (!fileinfo) {
        console.log("missing file info for",fn);
        return lines;
    }
    let [bookname,cutpoint]=fileinfo;
    if (typeof cutpoint=='string' && cst4files[cutpoint]) {
        cutpoint=cst4files[cutpoint][1] ; //reuse the setting of mula
    }
    // cutpoint can be a div type of object of staring_paranum

    return (typeof cutpoint==='string'?cutByDiv:cutByParanum)(lines,bookname,cutpoint,ctx);
}
