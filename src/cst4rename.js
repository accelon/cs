import Newname from './newname.js';
const Nikaya={ '01':'dn','02':'mn','03':'sn','04':'an'};
const AN={ '2-1':2,'2-2':3,'2-3':4,'3-1':5,'3-2':6,'3-3':7,'4-1':8,'4-2':9,'4-3':10,'4-4':11}
export const ClusterStarts={ // starting cluaster of newname 
    dn2:13,dn3:23,
    mn2:50,mn3:100,
    ja2:520,
    ja1a2:150, ja1a3:300, ja1a4:438
    // ja1a3:
    // ja1a4:
}
export const cst4rename=fn=>{
    const ch0=fn.substr(0,1);
    if (fn=='sample.xml') return 'sample';
    if (ch0=='s') {
        const m=fn.match(/^s(\d\d)(\d\d)([mat])/);
        const nikaya= Nikaya[  m[1] ] ;
        const vol=m[2];
        const mat=m[3];
        if (nikaya && fn.substr(6,1)=='.') {
            return nikaya+parseInt(vol)+ (mat=='m'?'':mat);
        }
        else if (nikaya=='an') { //an mula break into several files
            const m=fn.match(/^s04(\d\d)m(\d)/);
            return 'an'+AN[m[1][1]+'-'+m[2]];
        } else if (m[1]=='05' && (vol=='13' ||vol=='14')){ //jataka att has multiple volumn
            return 'ja'+ (parseInt(vol)-12)  +mat+fn.substr(6,1);
        }
    }
    return Newname[fn.substr(0,6)]
}
