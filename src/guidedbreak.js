import {spacify,autoBreak,paragraphSimilarity,
    removeHeader, diffBreak,breakSentence} from "pitaka/align";


const dumpProblematic=(p1,p2)=>{
    const out=[]
    const max=Math.max(p1.length,p2.length);
    for (let i=0;i<max;i++) {
        out.push((p1[i]||'')+'\t'+p2[i]||'');
    }
    return out;
}

export const guidedBreak=(loc,sclines_o,cslines_o,problematic,marker='<>')=>{
    let pass=false, breakpos=null;
    
    if (!cslines_o.length) {
        console.log('empty cs id',loc)
        return;
    }
    const res=autoBreak(cslines_o);
    const sclines=sclines_o.map(removeHeader);
    const cslines=cslines_o.map(removeHeader);


    if (sclines.length===res.sentences.length) {
        const sim=paragraphSimilarity(sclines.map(spacify), res.sentences.map(spacify) );
        if (sim<0.03) {
            pass=true;
            breakpos=res.breakpos;
        }
    } 
    if (!pass && sclines.length && cslines.length){
        const spaced1=cslines.map(spacify);
        const spaced2=sclines.map(spacify);
        const diffbreakpos=diffBreak(spaced1,spaced2 ,loc,marker);
        const sents=breakSentence(cslines_o,diffbreakpos);
        const sim=paragraphSimilarity(sclines.map(spacify), sents.map(removeHeader).map(spacify) );
        if (sim>0.1) {
            problematic.push(`${loc}\t${sim}`);
            problematic.push( ...dumpProblematic(sclines,sents));
        }
        breakpos=diffbreakpos;
    }
    return breakpos;
}