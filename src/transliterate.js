import {fromDevanagari,toIAST} from 'provident-pali';

export default function(buf,ctx){
    return toIAST(fromDevanagari(buf),{format:'xml'});
    // return fromDevanagari(line);
}