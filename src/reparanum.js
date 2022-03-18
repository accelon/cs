const reparanum_aas=(buf,ctx)=>{
    const lines=buf.split('\n');
    let chapter='';
    for (let i=0;i<lines.length;i++) {
        const line=lines[i];
        let nline=line;
        if (line.indexOf('rend="chapter"')>0) {
            const m=line.match(/rend="chapter">(\d+)/);
            chapter=parseInt(m[1]);
        } else if (line.indexOf(' pn="')>0) {
            nline=line.replace(/ pn="(\d+)"/,(m,m1)=>{
                let pn=m1;
                if (chapter==1 && (pn==='1' || pn==='2')) {
                    if (pn==='2') pn='2-102';
                } else {
                    pn=chapter+''+m1.padStart(2,'0');
                    if (pn==='143') pn+='-200';
                    else if (pn==='260') pn+='-300';
                    else if (pn==='374') pn+='-400';
                    else if (pn==='455') pn+='-500';
                    else if (pn==='599') pn+='-600';
                    else if (pn==='665') pn+='-700';
                    else if (pn==='753') pn+='-800';
                    else if (pn==='843') pn+='-900';
                }
                return ' pn="'+pn+'"';
            });
        }
        if (nline!==line) lines[i]=nline;
    }

    return lines.join('\n');
}
export const reparanum=(buf,ctx)=>{
    if (ctx.bkid=='aas' || ctx.bkid==='aas0a') {
        return reparanum_aas(buf,ctx);
    } else {
        return buf;
    }
}

