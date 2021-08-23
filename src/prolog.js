export default function(rawlines,ctx){
    console.log('running prolog')
    return rawlines.map(line=>{
        return line.replace(/ rend="bodytext"/g,'')
        .replace(/<hi rend="paranum">[^<]+?<\/hi>/g,'')
        .replace(/<hi rend="dot">\.<\/hi>/g,'')
    });    
}