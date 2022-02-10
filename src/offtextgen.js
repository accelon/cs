// import cst4files from './cst4files.js';
import {walkDOMOfftext,DOMFromString,xpath } from 'pitaka/xmlparser'
import {handlers,closeHandlers} from './xmlhandlers.js';

export default function(buf,ctx){
    const {fn,outfn,cluster}=ctx;
    const el=DOMFromString(buf);
    const body=xpath(el,'text/body');
    const bkid=outfn;
    const bkpf=bkid.match(/([^\d]+)/)[1];
    const teictx={cluster,bkid,bkpf,started:false,div_id:''};

    const out=walkDOMOfftext(body,teictx,handlers,closeHandlers);

    //^n to mark <p> without paranum 
    return out.split('\n').map(it=>(it.match(/\^n\d+/))?it:'^n '+it).join('\n');
}
