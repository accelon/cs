import {PALIWORD_REG_G} from 'provident-pali'
import {bsearch} from 'pitaka/utils'
export const factorizeOfftext=(buf,ctx)=>{
	return buf.replace(PALIWORD_REG_G,(m,m1)=>{
		let newword=false;
		if (!ctx.orth[m1]) {
			ctx.orth[m1]=ctx.formula.factorize(m1);
		}
	})
	return buf;
}

export const printFactorizeStat=ctx=>{
	console.log('factorize stat')
}