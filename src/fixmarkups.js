/* only found in jataka att, 
//from 1 ~ 10
<p rend="hangnum">  </p>\n<p> 10. sukhavihārijātakavaṇṇanā</p>
==> <p rend="subhead">10. sukhavihārijātakavaṇṇanā</p>

//from 11 and so on
<p rend="hangnum">  </p>\n<p> [11] 1. lakkhaṇamigajātakavaṇṇanā</p>
==> <p rend="subhead"><p>11 1. lakkhaṇamigajātakavaṇṇanā</p> 

//for xmlhandlers/p/subhead to get the jataka number
*/
import {getErrata} from './ro-errata.js'; //errata in romanized
import {getUntease} from './ro-untease.js'; //recover unwanted or wrong tease of compound
import {patchBuf} from 'pitaka/cli';
export const fixJataka=(buf,fn)=>{
    const m=fn.match(/s051[34]a/);
    if (!m) return buf;

    return buf.replace(/<p rend="hangnum">  <\/p>\n<p rend="bodytext"> ?\[?(\d+)\]?/g,(m,m1)=>{
        return '<p rend="subhead">'+m1;
    });

}
export const deleteMN1_120_135=(buf,fn)=>{
    if (fn.match(/s0201m/)) {
        const start=buf.indexOf('<p rend="centre">paṭhamabhāṇavāro niṭṭhito');
        const end=buf.indexOf('<p rend="bodytext" n="136">');
        buf=buf.substr(0,start)+buf.substr(end);
    }
    return buf;
}
export const headchapter=(content,fn)=>{
	if (!fn.match('s0')&&!fn.match('vin')) return content;
	return content.replace(/<head rend="chapter">([^>]+)<\/head>/g,'<p rend="chapter">$1</p>');
}
export const headbook=(content,fn)=>{
	if (!fn.match('s0')&&!fn.match('vin')) return content;
	return content.replace(/<head rend="book">([^>]+)<\/head>/g,'<p rend="book">$1</p>');
}
export const headtitle=(content,fn)=>{
	if (!fn.match('s04')&&!fn.match('vin02m4')) return content;
	return content.replace(/<head rend="title">([^>]+)<\/head>/g,'<p rend="title">$1</p>');
}
export const fixMarkups=(buf,fn)=>{
    buf=deleteMN1_120_135(buf,fn);
    buf=fixJataka(buf,fn);
    const errata=getErrata(fn);
    buf=patchBuf(buf,errata,fn);

    const untease=getUntease(fn);
    buf=patchBuf(buf,untease,fn);

    buf=headchapter(buf,fn);
    buf=headbook(buf,fn);
    buf=headtitle(buf,fn);
    return buf;
}