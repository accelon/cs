// import cst4files from './cst4files.js';
import {walkDOMOfftext,DOMFromString,xpath } from 'pitaka/xmlparser'
import {handlers,closeHandlers} from './xmlhandlers.js';
import { pinNotes,addNote } from './notes.js';

import { linePN, makeLocalAddress } from 'pitaka/offtext';
const doInlineTag=(buf,ctx)=>{

    buf=buf.replace(/<pb [^>]+>/g,'');//note 可能夾有pb ，先去掉 pc.xml Thai 5.1080
    buf=buf.replace(/ ?<note>([^>]+)<\/note>/g,(m,notetext,offset,str)=>addNote(notetext,ctx));

    /*
    buf=buf.replace(/<note>([^>]+)<\/note>/g,(m,notetext)=>{
        ctx.notes.push(notetext)
        return '^f'+ctx.notes.length;
    });
    */

    if (buf.indexOf('<hi rend="bold">')>-1) {
        buf=buf.replace(/<hi rend="bold">([^>]+)<\/hi>/g,(m,boldtext)=>{
            return '^b['+boldtext+']';
        });
    }


    return buf;
}

export default function(buf,ctx){
    const {fn,outfn,chunk}=ctx;
    buf=doInlineTag(buf,ctx);
    const el=DOMFromString(buf);
    const body=xpath(el,'text/body');
    const bkid=outfn;
    const bkpf=bkid.match(/([^\d]+)/)[1];
    const teictx={chunk,bkid,bkpf,started:false,div_id:''};

    let out=walkDOMOfftext(body,teictx,handlers,closeHandlers);
    const lines=out.trim().split('\n');
    let pn='',subparacount=0;
    if (ctx.offnote) {
        for (let i=0;i<lines.length;i++) {
            const line=lines[i];
            const m=linePN(line);
            if (m) {
                pn=m[1].trim();
                subparacount=0;
            } else {
                subparacount++
                lines[i]='^n '+line;
            }
            if (ctx.offnote) {
                const newline=pinNotes(makeLocalAddress(bkid,pn,subparacount),lines[i],ctx.notes);
                if (newline!==lines[i]) {
                    lines[i]=newline;
                }    
            }
        }
    }
    return lines.join('\n');
    //^n to mark <p> without paranum 
}
