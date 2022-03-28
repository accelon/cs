import {nodefs,glob, writeChanged} from 'pitaka/cli';
await nodefs; //export fs to global
import {changequotepunc, removeparanum  } from './src/replaces.js';
import {fixMarkups} from './src/fixmarkups.js'
import {backmovepb} from './src/backmovepb.js'
import {cst4rename} from './src/cst4rename.js';
import {parseCite} from './src/citeparser.js'
const srcfolder='./ro/'; 
const desfolder='./books/';
const testfn='s0101m.mul.xml';
if (!fs.existsSync(desfolder)) fs.mkdirSync(desfolder);

let pat=process.argv[2]||testfn;
// const files=readdirSync(srcfolder);
const filelist= glob(srcfolder,pat);

const Steps=[fixMarkups, changequotepunc, removeparanum, backmovepb, parseCite ]
const removetail=buf=>{
  // console.log('remove tail',buf.length)
  return buf.replace('</body>\n<back></back>\n</text>\n</TEI.2>',''); //remove the tail
}
const removehead=buf=>{
  // console.log('removehead',buf.length)
  let at=buf.indexOf('<p rend="book">');
  if (at==-1) {
    throw "not a book";
  }
  at=buf.indexOf('</p>',at+1);

  return buf.slice(at+5);
}

filelist.forEach((file,idx)=>{
  const newname=cst4rename(file);

  let buf=fs.readFileSync(srcfolder+file,'utf8');
  buf=buf.replace(/\r?\n/g,'\n').replace(/>\n\n/g,'>\n'); //normalize crlf
  Steps.forEach(step=>buf=step(buf,file));
  if ( cst4rename(filelist[idx+1])===newname) { //same name
    buf=removetail(buf);
  }
  if (cst4rename(filelist[idx-1])===newname) { 
    buf=removehead(buf);
    fs.appendFileSync(desfolder+newname+'.xml',buf);
  } else {
    if (writeChanged(desfolder+newname+'.xml',buf)){
        console.log('written',newname,buf.length);
    }
  }
})