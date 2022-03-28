// import cst4files from './cst4files.js';
import {walkDOMOfftext,DOMFromString,xpath } from 'pitaka/xmlparser'
import {handlers,closeHandlers} from './xmlhandlers.js';
import { addNote } from './notes.js';

const doInlineTag=(buf,ctx)=>{
    buf=buf.replace(/<pb [^>]+>/g,'');//note 可能夾有pb ，先去掉 pc.xml Thai 5.1080
    buf=buf.replace(/ ?<note>([^>]+)<\/note>/g,(m,notetext,offset,str)=>addNote(notetext,ctx));

    if (buf.indexOf('<hi rend="bold">')>-1) {
        buf=buf.replace(/<hi rend="bold">([^>]+)<\/hi>/g,(m,boldtext)=>{
            return '^b['+boldtext+']';
        });
    }

    buf=buf.replace(/<link target="([^>\"]+)"\/>/g,'^t@$1')
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

    let out=walkDOMOfftext(body,teictx,handlers,closeHandlers).trim();
    // const lines=out.trim().split('\n');

    //return out;
    return out.trim().split('\n').map(it=>(it.match(/\^n\d+/))?it:'^n '+it).join('\n');
    //^n to mark <p> without paranum 
}
