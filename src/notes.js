import {toParagraphs, linePN,  pinPos} from 'ptk/nodebundle.cjs'

const makeLocalAddress=(bkid='',loc='',dy=0)=>{
    return (bkid?bkid+'.':'')+loc+(dy?':'+dy:'')
}
/* before breakline */
export const stepStripNotes=(buf,ctx)=>{
    const paragraphs=toParagraphs(buf.split('\n'));
    const out=[];
    for (let i=0;i<paragraphs.length;i++) {
        let [pn,para]=paragraphs[i];
        for (let i=0;i<para.length;i++) {
            out.push(stripNotes(pn+(i?':'+i:''),para[i],ctx.notes));
        }
    }
    return out.join('\n');
}
/* after  breakline */
export const stepPinNotes=(buf,ctx)=>{
    const lines=buf.split('\n');
    let pn='',subparacount=0,paraoffset=0,vakyacount=0;
    /*
        ctx.notes is keyed with id,
        group it with PN to speed up pinning
    */
    const pn_notes={};
    for (let nid in ctx.notes) {
        const [pnsub]=ctx.notes[nid];
        if (!pn_notes[pnsub]) pn_notes[pnsub]=[];
        pn_notes[pnsub].push(ctx.notes[nid]);
    }

    for (let i=0;i<lines.length;i++) {
        const line=lines[i];
        const m=linePN(line);
        vakyacount++
        if (m) {
            const npn=m[1].trim();
            if (npn) {
                pn=npn; //有號段
                subparacount=0;
            } else subparacount++;
            vakyacount=0;
            paraoffset=0;
        }
        const pnsub=makeLocalAddress('',pn,subparacount);
        pinNotes(i,paraoffset,lines[i], pn_notes[pnsub]);
        paraoffset+=lines[i].length;
    }
    return buf;
}

export const pinNotes=(y,paraoffset,linetext,notes)=>{
    for (let nid in notes) {
        const off=notes[nid][1];
        if (typeof off==='string') continue;//resolved;
       

        if (off-paraoffset>linetext.length) continue;
        if (paraoffset>off) continue;
        const pin=pinPos(linetext,off-paraoffset,{backward:true,wholeword:true});
        if (pin) {
            notes[nid][0]=y;
            notes[nid][1]=pin;
        } else {
            console.log('cannot pin',off,paraoffset)
        }
    }
}
export const addNote=(notetext,ctx)=>{
    const nnote=ctx.notecount++;
    if (ctx.notes[nnote]) {
        console.log('repeated note',nnote);
    }
    ctx.notes[nnote]=[0,0,notetext];
    return (ctx.offnote?'⚓':'^f')+nnote; //paramode will not remove the note 
}
//strip the notes and save the offset in ctx.notes
export const stripNotes=(pn,paraline,notes)=>{ //should not be call in paramode
    let offset=0,accwidth=0;

    paraline=paraline.replace(/⚓(\d+)/g,(m,m1,off)=>{
        offset=off-accwidth;
        notes[m1][0]=pn;
        notes[m1][1]=offset;
        accwidth+=m.length
        return '';
    })
    return paraline;
}

export const serializeNotes=notes=>{
    const out=[];
    for (let key in notes) {
        const [y,pin,val]=notes[key];
        out.push({y,pin,val});
    }
    const s='['+out.map( item=>JSON.stringify(item)).join(',').replace(/\},\{/g,'},\n{')+']';
    return s;
}