/* find out common ngram of lexeme in decompose*/
import {Formula,enumBases} from 'pitaka/pali'
import {writeChanged,nodefs,readTextLines} from 'pitaka/cli'
import {sortObj} from 'pitaka/utils'
await nodefs;

const bigram={};
const formula=new Formula('./formula.json');
formula.forEach(w=>{
	const at=w.indexOf('=');
	const lex=w.slice(at+1);
	const lexeme=lex.split(/\d+/);
	let p=lexeme[0];
	for (let i=1;i<lexeme.length;i++) {
		const bi=p+'+'+lexeme[i];
		if (! bigram[bi]) bigram[bi]=0;
		bigram[bi]++
		p=lexeme[i]
	}

})
let arr=sortObj(bigram);
arr=arr.filter(it=>it[1]>2);
writeChanged('bigram.txt',arr.join('\n'))