import {kluer,glob,nodefs,writeChanged,readTextContent, readTextLines} from 'pitaka/cli';

const {yellow,red} =kluer;
await nodefs; //export fs to global
import offtextgen from './src/offtextgen.js';
import {serializeNotes,stepStripNotes,stepPinNotes} from './src/notes.js';
import {guidedBreakLines} from 'pitaka/align'
import transliterate from './src/transliterate.js';
import {reparanum} from './src/reparanum.js'
import {epilog} from './src/epilog.js'
// import { shortenBodytext } from './buildutils.js';
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

const Steps=[transliterate,reparanum , offtextgen, stepStripNotes,breaklines];

const ctx={};
let  processed=0;  

const getSameParaFilename=bkid=>{
    if (bkid==='aas') { //abhidhammattha-sangaha
        return bbfolder+bkid+'.bb.off'
    }
    return scfolder+bkid+'.ms.off'
}

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
    // ctx.cluster=ClusterStarts[outfn]||0;
    // ctx.validateClusterNum= !fn.match(/^mn/)


    processed++;
    Steps.forEach(step=>buf=step(buf,ctx));
    buf=buf.trim();
    buf=epilog(buf,bkid)
    const ofn=desfolder+bkid+'.cs.off';

    const notefn=desfolder+bkid+'.notes.json';
    const notesout=serializeNotes(ctx.notes);
    if (writeChanged(notefn,notesout)){
        console.log('written notes',notefn)
    }
    const checkfn=getSameParaFilename(bkid);
    let linecountwarning='';
    if (fs.existsSync(checkfn)) {
        const sccontent=readTextLines(checkfn);
        const lines=buf.split('\n');
        linecountwarning=!paramode && lines.length!==sccontent.length?red("!="+sccontent.length):'';
    }

    if (writeChanged(ofn, buf)) {
        console.log('written',ofn,buf.length,linecountwarning);
    } else {
        console.log('same',ofn,buf.length,linecountwarning);
    }
})
process.stdout.write('\n');
console.log('processed',processed,'all',filelist.length);