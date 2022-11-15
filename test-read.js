import {nodefs} from 'pitaka/cli';
await nodefs;
import {openBasket} from 'pitaka'
const ptk= await openBasket('cs');
// const ranges=ptk.getPageRange('dn2.372');
// let hlines=await ptk.readLines(ranges[0],ranges[1]-ranges[0]);
// console.log(hlines,ptk.locOf(ranges[0]+6))
// console.log(ptk.chunkOf(ranges[0]+6))
await ptk.prepareToken('a')
console.log(ptk.inverted.tokens.length)