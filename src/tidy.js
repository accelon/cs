import {nodefs,glob, writeChanged} from 'pitaka/cli';
await nodefs; //export fs to global
import {changequotepunc, removeparanum  } from './replaces.js';
import {fixMarkups} from './fixmarkups.js'
import {backmovepb} from './backmovepb.js'
import {cst4rename} from './cst4rename.js';

const srcfolder='../ro/'; 
const desfolder='../books/';
const testfn='s0101m.mul.xml';
if (!fs.existsSync(desfolder)) fs.mkdirSync(desfolder);

let pat=process.argv[2]||testfn;
// const files=readdirSync(srcfolder);
const filelist= glob(srcfolder,pat);

const Steps=[fixMarkups, changequotepunc, removeparanum, backmovepb ]

filelist.forEach(file=>{
  const nn=cst4rename(file);
  let buf=fs.readFileSync(srcfolder+file,'utf8');
  buf=buf.replace(/\r?\n/g,'\n').replace(/>\n\n/g,'>\n'); //normalize crlf
  Steps.forEach(step=>{
    //   console.log(step,buf.length)
      buf=step(buf,file);
  })
  if (writeChanged(desfolder+nn+'.xml',buf)){
      console.log('written',nn,buf.length);
  }
})