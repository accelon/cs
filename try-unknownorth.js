import {Formula,enumBases} from 'pitaka/pali'
import {writeChanged,nodefs,readTextLines} from 'pitaka/cli'
await nodefs;

const formula=new Formula('./formula.json');
const lines=readTextLines('unknownorth-4n.txt');
let count=0;
const tryOtherBases=orth=>{
	const bases=enumBases(orth);
	const possible=[];

	bases.forEach(base=>{
		const f=formula.factorize(base);
		if (f&&f!==base) {
			possible.push([base,f]);
		}
	})

	if (possible.length) {
		possible.sort((a,b)=>b[0].length-a[0].length);//pick the longer
		if (possible.length>1) {
			// console.log('more than one, take the longer',orth,possible)
			possible.length=1;
			
		}
		count++;
		const [bestorth, bestlex] = possible[0];
		let tail=orth.slice(bestorth.length);

		if (tail=='mVpI'||tail=='pI' ||tail=='tI') tail='0'+tail;
		// console.log(orth,  bestlex+tail);
		return bestlex+tail;
	}
}
let guess=0;
const fullmatch=[],remaining=[],partialmatch=[];
lines.forEach(orth=>{
	const lex=formula.guess(orth);
	if (lex) {
		if (typeof lex=='string') {
			console.log(orth+'='+lex)
			fullmatch.push(orth+'='+lex);	
		} else {
			partialmatch.push(orth+'='+ lex.join('-'));
		}
		guess++;
	} else {
		remaining.push(orth);
	}
})
writeChanged('unk-fullmatch.txt',fullmatch.join('\n'))
writeChanged('unk-partialmatch.txt',partialmatch.join('\n'))
writeChanged('unk-remaining.txt',remaining.join('\n'))