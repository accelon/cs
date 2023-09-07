import {glob,nodefs,writeChanged,readTextContent, readTextLines
, guidedBreakLines //ptk/align
,Formula } from 'ptk/nodebundle.cjs'; //ptk/pali
await nodefs; //export fs to global
import offtextgen from './src/offtextgen.js';
import {serializeNotes,stepStripNotes,stepPinNotes} from './src/notes.js';
import transliterate from './src/transliterate.js';
import {reparanum,removePureN} from './src/reparanum.js'
import {epilog} from './src/epilog.js'
import {factorizeOfftext,printFactorizeStat} from './src/factorization.js'
import {connectGrammar} from './src/komyoji.js'
const scfolder='../sc/pli/'
const bbfolder='../bb/off/' 
const srcfolder='./books/'; 
const brkfolder='./brk/'

const testfn='dn1.xml';
console.log('node gen filepat [p]');
let pat=process.argv[2]||testfn;
let paramode=process.argv[3]==='p';
const desfolder=paramode?'par/':'off/';
const filelist= glob(srcfolder,pat);
const breaklines=(buf,ctx)=>guidedBreakLines(buf,ctx.pins,ctx.fn);
//todo , offtext gen transclusion link
const Steps=[transliterate,reparanum , offtextgen, stepStripNotes,breaklines,removePureN,connectGrammar];//factorizeOfftext

const formula=new Formula('./formula.json');
const ctx={formula, orth:{},unknownOrth:[] ,orthCount:0, tokenCount:0,grammars:[]};
let  processed=0;  

const getSameParaFilename=bkid=>{
    if (bkid==='aas') { //abhidhammattha-sangaha
        return bbfolder+bkid+'.bb.off'
    }
    return scfolder+bkid+'.ms.off'
}
const writeoutput=true;

filelist.forEach(fn=>{
    ctx.fn=fn;
    ctx.notes={};
    ctx.notecount=0;
    ctx.offnote=!paramode;
    const bkid=fn.replace('.xml','');
    ctx.bkid=bkid;
    let buf=readTextContent(srcfolder+fn);
    const pinfn=brkfolder+fn.replace('.xml','.cs.txt');
    if (!paramode&&fs.existsSync(pinfn) ) {
        ctx.pins=readTextLines(pinfn);
    } else ctx.pins=null;
    if (ctx.offnote) {
        Steps.push(stepPinNotes);
    }
    ctx.outfn=bkid;
    ctx.grammars=[];
    // ctx.cluster=ClusterStarts[outfn]||0;
    // ctx.validateClusterNum= !fn.match(/^mn/)

    processed++;
    Steps.forEach(step=>{
	buf=step(buf,ctx);
    });

    buf=buf.trim();
    buf=epilog(buf,bkid)

    if (writeoutput){
        const ofn=desfolder+bkid+'.cs.off';

        const notefn=desfolder+bkid+'.notes.json';
        const notesout=serializeNotes(ctx.notes);
        writeChanged(notefn,notesout,true);

        const checkfn=getSameParaFilename(bkid);
        let linecountwarning='';

        if (fs.existsSync(checkfn)) {//make sure cs and sc has same para
            const sccontent=readTextLines(checkfn);
            const lines=buf.split('\n');
            linecountwarning=!paramode && lines.length!==sccontent.length?lines.length+"!="+sccontent.length:'';
        }

        writeChanged(ofn, buf,true);
        if (ctx.grammars.length) {
            writeChanged(desfolder+bkid+'.cs.num',ctx.grammars.join('\n'),true);
        }
        if (linecountwarning) console.log(linecountwarning);
    }

})
// printFactorizeStat(ctx);
process.stdout.write('\n');
console.log('processed',processed,'all',filelist.length);