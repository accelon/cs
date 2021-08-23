import {fromDevanagari} from 'provident-pali';

export default function(rawlines,ctx){
    return rawlines.map(line=>fromDevanagari(line));
}