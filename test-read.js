import {nodefs} from 'pitaka/cli';
await nodefs;
import {openBasket} from 'pitaka'
const ptk= await openBasket('cs');
const ranges=ptk.getPageRange('c=0m26');
let hlines=await ptk.readLines(ranges[0],ranges[1]-ranges[0]);
console.log(hlines,ptk.locOf(ranges[0]+6))
console.log(ptk.clusterOf(ranges[0]+6))