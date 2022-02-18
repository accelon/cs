/* generate pin information from off */
import {glob,nodefs,writeChanged,readTextContent, readTextLines,LOCATORSEP} from 'pitaka/cli';
import {pinPos, toParagraphs,spacify} from 'pitaka/utils';
await nodefs; //export fs to global
const srcfolder='off/';     //不git
const desfolder='brk/';  //須git
let pat=process.argv[2]||"dn1.off";

const filelist= glob(srcfolder,pat);

const makePin=(paralines,id)=>{
    //每一段第一行必有有號段，之後可能有^n 必定在行首。
    const out=[];
    const paras=[]; //每個<p>  一行
    let line='';
    for (let i=0;i<paralines.length;i++) {
        if (paralines[i].substr(0,3)=='^n ') {//新的一行
            paras.push(line);
            line='';
        }
        line+=paralines[i];
    } 
    paras.push(line);
    let lidx=0, pins=[];
    let offset=paralines[0].length;
    for (let i=1;i<paralines.length;i++) {
        const l=paralines[i];
        if (!l) { //空白行
            //console.log('empty line in ',id)
            pins.push('');
            continue;
        }
        const pureline=spacify(paras[lidx]);
        if (l.substr(0,3)=='^n ') {//新的一行
            out.push(pins.join('\t'));
            pins=[];
            lidx++;
            offset=0;
        } else { //被折之文字
            const pin=pinPos(pureline,offset);
            if (!pin) {
                console.log(pureline.length,offset)
                throw 'cannot get pin at sentence '+i+'of '+pureline+'offset:'+offset;
            }
            pins.push(pin);
        }
        offset+=l.length;
    }
    out.push(pins.join('\t'));
    return out.join('\n');
}

filelist.forEach(fn=>{
    const out=[];
    let buf=readTextLines(srcfolder+fn);
    const paras=toParagraphs(buf);  //返回 [ id, paralines ] , paralines 是分好句的字串陣列
    out.push(... paras.map(para=>makePin(para[1],para[0])));
    //dn1有559個段號(^n\d+)，927個p(368個^n )
    //按 sc 分為4104 句。
    //輸出的文字檔只有 927 行，每行的pin 以tab 隔開
    //gen-pli.js 會讀取 pinpos/ 的txt 檔做為分句標準
    
    let outfn=desfolder+fn.replace('.off','.txt');
    let renamed=false;
    if (fs.existsSync(outfn)) {
        renamed=true;
        outfn=desfolder+fn.replace('.off','.off.gen');
    }
    if (writeChanged(outfn, out.join('\n'))) {
        if (renamed) console.log('file exists, renamed.');
        console.log('written',outfn,'lines',out.length);
    }
});