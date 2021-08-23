//add <a name>
export default function(lines,ctx){
    if (!ctx.fileAnchors) ctx.fileAnchors={};

    for (let i=0;i<lines.length;i++) {
        const line=lines[i];
        const at=line.indexOf('n="');
        let at2=at-1,at3=at+1;
        while (at2>0 && line[at2]!=='<') at2--;
        while (at3<line.length && line[at3]!=='>') at3++;

        let tag=line.substr(at2,at3+1);

        if (tag.substr(1,2)!=='p ') continue;
        let aname='';
        tag=tag.replace(/ n="([\d\.\-]+?)"/,(m,m1)=>{
            aname='<a name="'+m1+'"></a>';
            return "";
        })

        lines[i]=aname+tag+line.substr(at3+1);
    }
    return lines;
}