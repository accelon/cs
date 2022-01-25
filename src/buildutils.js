import {OFFTAG_REGEX_G} from 'pitaka/offtext';
export const shortenBodytext=buf=>{
    let out='',prev=0;
    buf=buf.replace(/\^v\[[^\]]+\]/g,'');
    buf=buf.replace(/\^b\[([^\]]+)\]/g,'$1');
    buf.replace(OFFTAG_REGEX_G,(m,name,attr,p)=>{
        const lines= buf.substring(prev,p ).split('\n');

        lines.forEach((line,idx)=>{
            const at=line.indexOf(' ',4);
            if (idx) out+='\n'
            if (at>-1) {
                const remaining=(line.length-at);
                out+=line.substr(0,at)
                if (remaining==1) out+=' ';
                else  out+='+' +remaining.toString()
            } else {
                out+=line;
            }
            
        })
        
        out+='^'+name+(attr?attr:'')
        prev=p+m.length;
    })
    out+=buf.substr(prev);
    return out;
}