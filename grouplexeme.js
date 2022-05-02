/* take output of pitaka lexeme */
import {nodefs, readTextLines, writeChanged} from 'pitaka/cli';
import {enumBases} from 'pitaka/pali';
import {bsearch,fromObj,alphabetically, alphabetically0} from 'pitaka/utils';
await nodefs; //export fs to global

const srcfile=process.argv[2]||'lexeme.txt'
const lines=readTextLines(srcfile);
const Base={};
const lexemes={};
for (let i=0;i<lines.length;i++) {
	const lexeme=lines[i].split(',')[0];
	const bases=enumBases(lexeme);
	lexemes[lexeme]=true;
	//if (!Base[lexeme]) Base[lexeme]=[lexeme];
	// if (!bases.length) console.log(lexeme)
	bases.forEach(b=>{
		if (!b||b.length<2) return;
		if (!Base[b]) Base[b]=[];
		if (Base[b].indexOf(lexeme)==-1) Base[b].push(lexeme);
	})
}
const arr=fromObj(Base,1).filter(it=>it[1].length>1).map(( [stem , derive]) => lexemes[stem]?[stem+'*',derive]:[stem,derive]  )
// console.log(arr)
arr.sort(alphabetically0);
const outfn='group-lexeme.txt';
if (writeChanged(outfn,arr.join('\n'))) {
	console.log('written',outfn,arr.length)
}


/*
todo
sUKvEd,sUKvEdnIyM,sUKvEdnIyYVc          <-- remove
sUKvEdn,sUKvEdnIyM,sUKvEdnA,sUKvEdnIyYVc


smADInVdVrI,smADInVdVrIysVs,smADInVdVrIyEn  <-- remove
smADInVdVrIy,smADInVdVrIyM,smADInVdVrIysVs,smADInVdVrIymVpI,smADInVdVrIyEn


aAnApAnsVstIsmAD  ,aAnApAnsVstIsmADI,aAnApAnsVstIsmADIM,aAnApAnsVstIsmADImVhI,aAnApAnsVstIsmADIsVs <--remove
aAnApAnsVstIsmADI*,                  aAnApAnsVstIsmADIM,aAnApAnsVstIsmADImVhI,aAnApAnsVstIsmADIsVs

*/

/* build inverted table lexemes */

const lexeme_base={};
for (let b in Base) {
	const lexemes=Base[b];
	if (lexemes.length<2) continue;

	lexemes.forEach(lexeme=>{
		if (!lexeme_base[lexeme])lexeme_base[lexeme]=[];
		if (lexeme_base[lexeme].indexOf(b)==-1) lexeme_base[lexeme].push(b);
	})
}

for (let lexeme in lexeme_base) {
	const possible_base=lexeme_base[lexeme];
	if (possible_base.length<2) continue; //to keep it
	for (let i=0;i<possible_base.length;i++) {
		const b=possible_base[i];
		const l=Base[b];
		const at=l.indexOf(lexeme);
		if (at>-1) {
			l[at]='~'+l[at]; //mark delete
		}
	}
}
let deletable=[];
for (let b in Base) {
	const lexeme_only_base=Base[b].filter(it=>it[0]!=='~');
	if (!lexeme_only_base.length && !lexemes[b]) { //
		// console.log('deletable',b)
		deletable.push(b)
	}
}
deletable.sort(alphabetically);

for (let i=0;i<deletable.length;i++) {
	const del=deletable[i];
	const at=bsearch(deletable,del+'n');
	if (at>-1 ) {
		console.log(del)
	}
}
console.log(deletable)
console.log('deletable',deletable.length)