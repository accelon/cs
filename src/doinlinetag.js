 
const doInlineTag=(buf,ctx)=>{
    const addnote=notetext=>{
        const nnote=ctx.notes.length+1;
        ctx.notes.push('^fn'+nnote+' '+notetext);
        return '^f'+nnote;
    }
    buf=buf.replace(/<pb [^>]+>/g,'');//note 可能夾有pb ，先去掉 pc.xml Thai 5.1080
    buf=buf.replace(/<note>([^>]+)<\/note>/g,(m,notetext)=>addnote(notetext));

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
export default doInlineTag; 