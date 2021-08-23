export default function(lines,ctx){
    if (!ctx.fileAnchors)ctx.fileAnchors={};

    lines.forEach(line=>{
        const m=line.match(/a name="(.+?)"/);
        if (!m)return;
        
        if (!ctx.fileAnchors[ctx.htmlfn]) ctx.fileAnchors[ctx.htmlfn]=[];
        ctx.fileAnchors[ctx.htmlfn].push(m[1]);
    })
    return lines;
}

