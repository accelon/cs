/*export default function(buf,ctx){
    buf=buf
        // .replace(/ rend="/g,' class="')
        .replace(/<pb .+?\/>/g,'')
        .replace(/‘‘/g,'“')
        .replace(/’’/g,'”')
        .replace(/<p> /g,'<p>')


    return buf;
}
*/
export const epilog=(buf,bkid)=>{
    if (bkid==='vs' || bkid==='vs0a') {
        buf=buf.replace('\n^n1 ','\n^n ');
    }
    return buf;
}