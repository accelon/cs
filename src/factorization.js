import {PALIWORD_REG_G} from 'provident-pali'
import {bsearch,alphabetically} from 'pitaka/utils'
import {writeChanged} from 'pitaka/cli'
export const factorizeOfftext=(buf,ctx)=>{
	if (!buf) return buf;
	return buf.replace(PALIWORD_REG_G,(m,m1,idx)=>{
		if (m1.length<4 || buf[idx-1]==='^'||buf[idx-1]==='#') return m1;
		let newword=false;
		ctx.tokenCount++;
		if (!ctx.orth[m1]) {
			ctx.orthCount++;
			const o=ctx.formula.factorize(m1);
			if (o) {
				ctx.orth[m1]=o;
			} else {
				// console.log('unknown',m1)
				ctx.unknownOrth.push(m1);
				ctx.orth[m1]=m1;
			}
			return o||m1;
		}		
		return ctx.orth[m1];
	})
	return buf;
}

export const printFactorizeStat=ctx=>{
	console.log('orth count ',ctx.orthCount);
	console.log('unknownOrth',ctx.unknownOrth.length)
	console.log('known rate ', (100-100*(ctx.unknownOrth.length/ctx.orthCount)).toFixed(2) )
	console.log('token count ',ctx.tokenCount)
	ctx.unknownOrth.sort(alphabetically)
	if (writeChanged('unknownorth.txt',ctx.unknownOrth.join('\n'))) {
		console.log('written unkwownorth.txt',ctx.unknownOrth.length)
	}
}