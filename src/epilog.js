export default function(rawlines,ctx){
    return rawlines.filter(line=>!!line).map(line=>{
        return line
        .replace(/ rend="/g,' class="')
        .replace(/<pb .+?\/>/g,'')
        .replace(/‘‘/g,'“')
        .replace(/’’/g,'”')
        .replace(/<p> /g,'<p>')
    });    
}