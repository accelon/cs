export default function(buf,ctx){
    buf=buf.replace(/ rend="bodytext"/g,'')
        .replace(/<hi rend="paranum">[^<]+?<\/hi>/g,'')
        .replace(/<hi rend="dot">\.<\/hi>/g,'')
        // .replace(/<hi rend="bold">([^<]+)<\/hi>/g,'{$1}')
    return buf;
}