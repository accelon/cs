 
const doInlineTag=(buf)=>{
    buf=buf.replace(/<note>([^>]+)<\/note>/g,(m,notetext)=>{
        return '^v[t="'+notetext+'"]';
    })
    if (buf.indexOf('<hi rend="bold">')>-1) {
        buf=buf.replace(/<hi rend="bold">([^>]+)<\/hi>/g,(m,boldtext)=>{
            return '^b['+boldtext+']';
        });
    }
    return buf;
}
export default doInlineTag; 