import {Formula,enumBases} from 'pitaka/pali'
import {writeChanged,nodefs,readTextLines} from 'pitaka/cli'
import {sortObj} from 'pitaka/utils';
import {lexify,formulate,orthOf,toIAST} from 'provident-pali'
await nodefs;
const formulajson=process.argv[2]?{decomposes:[process.argv[2]]}:{};
const formula=new Formula('./formula.json',formulajson);
let pass=0,fail=0;
const commonsandhi={};
const formulatefail=[];
formula.forEach((orth,parts,raw)=>{
	const lex=lexify(orth,parts);
	if (!lex) {
		console.log('cannot lex',orth)
	} else {
		const lexstr=formulate(lex);
		if (orthOf(lexstr)!==orth) {
			// console.log('formulate error',lex)
			formulatefail.push( toIAST(raw));
			for (let i=1;i<lex.length;i+=2) {
				if (lex[i]) {
					if (lex[i]=='tVty') console.log(toIAST(orth),orth,lex, lexstr,parts)
					if (!commonsandhi[lex[i]]) commonsandhi[lex[i]]=0;
					commonsandhi[lex[i]]++;
				}
			}
			fail++;
		} else {
			pass++;
		}
	}	
},0)
const arr=sortObj(commonsandhi);
console.log(arr.slice(0,30))
console.log('sandhi ok',pass,'failed',fail)
writeChanged('formulatefail.txt',formulatefail.join('\n'))