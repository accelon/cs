import {fromIAST} from 'provident-pali';

export default function(buf,ctx){
    const lines=buf.split('\n').map(line=>fromIAST(line,{format:'xml'}));
    return lines.join('\n');
}