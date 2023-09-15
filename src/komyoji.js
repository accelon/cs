const kmjfolder='../kmj/'
import { TokenType, toParagraphs,tokenizeOfftext } from "ptk/nodebundle.cjs"
import {loadGrammar} from '../../kmj/src/grammar-format.js'
import { lexify,formulate } from "provident-pali"
const formatgrammar=(gcodes)=>{
    const parts=[];
    const out=gcodes.map(it=>{
        const codes=it.split(',');
        const part=codes.shift();
        
        const grammar=codes.join(',');
        parts.push(part)
        return grammar;
    })
    const serialized=out.join(',2,')
    return [parts,serialized];
}
export const connectGrammar=(buf,ctx)=>{
    
    const grammars=loadGrammar(kmjfolder+'grammar/'+ctx.bkid,kmjfolder);
    const lines=buf.split('\n');
    const paragraphs=toParagraphs(lines);
    const out2=[];
    for (let i=0;i<paragraphs.length;i++) {
        const [pn,palilines]=paragraphs[i];
        const tokens=[];
        for (let i=0;i<palilines.length;i++) {
            const paliline=palilines[i];
            const rawtokens=tokenizeOfftext(paliline);
            
            tokens.push(...rawtokens)
            tokens.push('\n');//換行
        }
        
        let now=0;
        if (!grammars[pn]) { //kmj has no correspondance
            console.log('missing grammar',ctx.fn,'no pn',pn);
            for (let j=0;j<palilines.length;j++) {
                ctx.grammars.push('');
            }
//            continue;
        }

        const gtokens=(grammars[pn]||[]).map(it=>it[0]);
        const gcodes=(grammars[pn]||[]).map(it=>it[1]);
        let out=[];
        for (let j=0;j<tokens.length;j++) {
            if (tokens[j]=='\n') {
                ctx.grammars.push(out.join(',1,'));
                out=[];
            } else {
                const tk=tokens[j];
                const at=gtokens.indexOf( tk.text , now);
                if (~at && gcodes[at]) {
                    const [parts,codes]=formatgrammar(gcodes[at]||[]);
                    //if (parts.length>1) console.log(tokens[j],parts)
                    const lex =lexify(tk.text,parts);
                    const lexstr=formulate(lex);
                    if (lexstr) {
                        //put back tailing space
                        const m=tokens[j].text.match(/([^A-Z]*)$/);
                        tokens[j].text=lexstr+(m?m[1]:'')
                    }
                    out.push(codes);
                } else {
                    if (tk.type>=TokenType.SEARCHABLE ) {                        
                        out.push('3');//no grammar, add a placeholder
                    }
                }
            }
        }
        const newline=tokens.map(tk=>tk.text?tk.text:'\n').join('');
        out2.push(newline)
    }
    return out2.join('')
}