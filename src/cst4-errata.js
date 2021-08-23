const invalidPaliCharacters={ // ः
    'abh01m.mul.xml':[/\u0903/g,';',11],
    's0203m.mul.xml':[/\u0903/g,';',2],
    's0504m.mul.xml':[/\u0903/g,';',3],
    's0519m.mul.xml':[/\u0903/g,';',1],    
}
const combinedErrata=()=>{
    const Errata={};
    for (let fn in invalidPaliCharacters) {
        if (!Errata[fn]) Errata[fn]=[];
        let arr=invalidPaliCharacters[fn];
        if (!Array.isArray(arr[0])) arr=[arr];
        Errata[fn]=Errata[fn].concat(arr);
    }
    return Errata;
}

let Errata;
export default function(devalines,fn){
    Errata=Errata?Errata:combinedErrata();
    const errs=Errata[fn];
    if (!Errata[fn]) return devalines;
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

    return devalines;
}
