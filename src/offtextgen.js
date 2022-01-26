// import cst4files from './cst4files.js';
import {XML2OffText,DOMFromString,xpath } from 'pitaka/xmlparser'
import {handlers,closeHandlers} from './xmlhandlers.js';
export default function(buf,ctx){
    const {fn,outfn,cluster}=ctx;
    const el=DOMFromString(buf);
    const body=xpath(el,'text/body');
    const bkid=outfn;
    const bkpf=bkid.match(/([^\d]+)/)[1];
    const teictx={cluster,bkid,bkpf};

    // console.log(buf)
    const out=XML2OffText(body,teictx,handlers,closeHandlers);
    return out;
}
