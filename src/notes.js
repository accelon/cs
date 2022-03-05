import { pinTailNote } from "pitaka/align";
export const addNote=(notetext,ctx)=>{
    const nnote=ctx.notecount++;
    if (ctx.notes[nnote]) {
        console.log('repeated note',nnote);
    }
    ctx.notes[nnote]=[0,0,notetext];
    return (ctx.offnote?'⚓':'^f')+nnote; //paramode will not remove the note 
}
export const pinNotes=(pn,paraline,notes)=>{ //should not be call in paramode
    let offset=0,accwidth=0;
    const noteid=[];
    paraline=paraline.replace(/⚓(\d+)/g,(m,m1,off)=>{
        offset=off-accwidth;
        noteid.push(m1);
        notes[m1][0]=pn;
        notes[m1][1]=offset;
        accwidth+=m.length
        return '';
    })

    noteid.forEach(nid=>{
        const off=notes[nid][1]
        const pin=pinTailNote(paraline,off);
        notes[nid][1]=pin;
    })
    return paraline;
}

export const serializeNotes=notes=>{
    const out=[];
    for (let key in notes) {
        out.push([...notes[key] ]);
    }
    return out.map(it=>it.join('\t')).join('\n')
}