/* take output of pitaka lexeme */
import {nodefs, readTextLines, writeChanged} from 'pitaka/cli';
import {enumBases} from 'pitaka/pali';
import {fromObj,alphabetically0} from 'pitaka/utils';
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