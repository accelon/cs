import {nodefs,writeChanged} from 'pitaka/cli';
await nodefs;
import {openBasket} from 'pitaka'
import {OFFTAG_REGEX_SPLIT} from 'pitaka/offtext'
import { toIAST } from 'provident-pali'; //convert offtext provident to IAST

const ptk= await openBasket('cs');

const ranges=ptk.getPageRange('an11'); //fetch digha nikaya book 1
//dn1,dn2,dn3, mn1,mn2,mn3, sn1,sn2,sn3,sn4,sn5, an1~an11
//ptk.getPageRange('dn1.272') ;//fetch a single paragaph of dn sutta 26

let rawlines=(await ptk.readLines(ranges[0],ranges[1]-ranges[0]));
 //split lines by offtag
rawlines=rawlines.map(it=>it[1].split(OFFTAG_REGEX_SPLIT));

//convert to IAST
let lines = rawlines.map(toIAST); //toIAST skip text snippet leading with '^' or '<'

console.log('first 5 lines',lines.slice(0,5)) ;//dump first 5 lines
if (writeChanged('dump.txt',lines.join('\n'))) {
    console.log('written',lines.length,'lines')
}
