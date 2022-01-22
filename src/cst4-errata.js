const xmlErrata={ // ः
    'abh01m.mul.xml':[/\u0903/g,';',11],
    's0203m.mul.xml':[/\u0903/g,';',2],
    's0504m.mul.xml':[/\u0903/g,';',3],
    's0519m.mul.xml':[/\u0903/g,';',1], 
    's0513a1.att.xml':[
        [/<p rend="bodytext"> ([१२३४५६७८९१०]+)\./g,'<p rend="subhead">$1.',10], //錯誤的 rend
        [/<p rend="subhead">\[([१२३४५६७८९१०]+)\]/g,'<p rend="subhead">$1.',3], //多餘的 []
        [/<p rend="bodytext"> \[([१२३४५६७८९१०]+)\]/g,'<p rend="subhead">$1.',137], //多餘的 []

        //避免錯判為 vannana
        ['<p rend="subhead">१. दूरेनिदानकथा</p>','<p rend="subhead">(१) दूरेनिदानकथा</p>',1],
        ['<p rend="subhead">२. अविदूरेनिदानकथा</p>','<p rend="subhead">(२) अविदूरेनिदानकथा</p>',1],
        ['<p rend="subhead">३. सन्तिकेनिदानकथा</p>','<p rend="subhead">(३) सन्तिकेनिदानकथा</p>',1],
    ], 
}
const combinedErrata=()=>{
    const Errata={};
    for (let fn in xmlErrata) {
        if (!Errata[fn]) Errata[fn]=[];
        let arr=xmlErrata[fn];
        if (!Array.isArray(arr[0])) arr=[arr];
        Errata[fn]=Errata[fn].concat(arr);
    }
    return Errata;
}

let Errata;
export default function(buf,ctx){
    const {fn}=ctx;
    Errata=Errata?Errata:combinedErrata();
    const errs=Errata[fn];

    if (!Errata[fn]) return buf;
    const devalines=buf.split(/\r?\n/);
    for (let i=0;i<devalines.length;i++) {
        let line=devalines[i];

        errs.forEach(err=>{
            const [from,to]=err;
            const rline=line.replace(from,to);
            if (rline!==line) {
                err[2]--;
                devalines[i]=rline;
                line=rline;
            }
        })
    }
    const residue=Errata[fn].filter(err=>err[2]);
    if (residue.length) console.log("Errata of",fn,'is not cleared!',residue);

    return devalines.join('\n');
}
