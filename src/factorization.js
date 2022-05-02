import {PALIWORD_REG_G} from 'provident-pali'
import {bsearch} from 'pitaka/utils'
export const factorizeOfftext=(buf,ctx)=>{
	return buf.replace(PALIWORD_REG_G,(m,m1,idx)=>{
		if (m1.length<4 || buf[idx-1]==='^'||buf[idx-1]==='#') return m1;
		let newword=false;
		if (!ctx.orth[m1]) {
			const o=ctx.formula.factorize(m1);
			if (o) {
				ctx.orth[m1]=o;
			} else {
				ctx.unknownOrth.push(m1);
				ctx.orth[m1]=m1;
			}
			return o||m1;
		}
		return m1;
	})
	return buf;
}

export const printFactorizeStat=ctx=>{
	console.log('unknownOrth ',ctx.unknownOrth.length,ctx.unknownOrth.slice(0,10))
}