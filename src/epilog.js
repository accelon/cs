export default function(buf,ctx){
    buf=buf
        // .replace(/ rend="/g,' class="')
        .replace(/<pb .+?\/>/g,'')
        .replace(/‘‘/g,'“')
        .replace(/’’/g,'”')
        .replace(/<p> /g,'<p>')


    return buf;
}