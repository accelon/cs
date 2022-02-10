import {nodefs,glob, writeChanged,readTextLines} from 'pitaka/cli';
import {hookFromParaLines,toParagraphs} from 'pitaka/utils';
await nodefs; //export fs to global
const srcfolder='../break-by-sc/';
const desfolder='../breakhook/';
const pat=process.argv[3]||'dn1'

const dofile=fn=>{
    const paras=toParagraphs(readTextLines(srcfolder+fn),fn);
    const out=[];
    for (let i=0;i<paras.length;i++) {
        const [id,para]=paras[i];
        const hooks=hookFromParaLines(para);
        out.push(...hooks.map(it=>it.join('\t')));
    }
    if (writeChanged(desfolder+fn.replace('.off','.txt'),out.join('\n'))) console.log('written',fn,'length',out.length)
}
const filelist= glob(srcfolder,pat);
filelist.forEach(dofile);