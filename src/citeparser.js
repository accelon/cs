/* from cap/cs0/linkparser.js*/

import CiteHandler from "./citehandler.js";
/*
const linkpatterns=[
	/sārattha\. ṭī\. [āīūḷṁṃñṇṅṭḍa-y\.]+ [\-\d\.]+/gi,
	/sārattha\. ṭī\. [\-\d\.]+/gi,
	/dī. [āīūḷṁṃñṇṅṭḍa-y\.]+ [āīūḷṁṃñṇṅṭḍa-y\.]+ ?ṭī\.? [\-\d\.]+/gi,
	/cūḷani\. [āīūḷṁṃñṇṅṭḍa-y]+[ .][\-\d\.]+/gi,
	/[āīūḷṁṃñṇṅṭḍa-y\.]+ [āīūḷṁṃñṇṅṭḍa-y\.]+ ?ṭī\.? [\-\d\.]+/gi,
	/[āīūḷṁṃñṇṅṭḍa-y\.]+ [āīūḷṁṃñṇṅṭḍa-y\.]+ ?aṭṭha\.? [\-\d\.]+/gi,
	/[āīūḷṁṃñṇṅṭḍa-y\.]+ [a-y][āai]\.? [\-\d\.]+/gi,
	/[āīūḷṁṃñṇṅṭḍa-y\.]+ ?ni\. aṭṭha\.? [\-\d\.]+/gi,
	/[āīūḷṁṃñṇṅṭḍa-y\.]+ ?aṭṭha\.? [\-\d\.]+/gi,
	/[āīūḷṁṃñṇṅṭḍa-y\.]+ ?ni\.? [\-\d\.]+/gi,
	/[āīūḷṁṃñṇṅṭḍa-y\.]+ ?ṭī\.? [\-\d\.]+/gi,
	/[āīūḷṁṃñṇṅṭḍa-y]+\. [āīūḷṁṃñṇṅṭḍa-y\.]+ [\-\d\.]+/gi,
	/[āīūḷṁṃñṇṅṭḍa-y\.]+ [\-\d\.]+/gi,
]
*/

// const hyperlink_regex=/#([sabhvine]+\d+[mat]\d?)_(\d+);/
// const hyperlink_regex_g=/#([sabhvine]+\d+[mat]\d?)_(\d+);/g

const recognise=link=>{
	for (var i=0;i<CiteHandler.length;i++){
		const pat=CiteHandler[i];
		const m=link.match(pat[0]);
		if (m) {
			const translated=pat[1](m[1] , link);
			if (!translated)return link;
			return link.replace(pat[0],'<link target="'+translated+'"/>');
		}
	}
	return link;
}

const parseTextWithLinks=link_with_texts=>{ //text in ( ) or <note>
	const notes=link_with_texts.split(/[,;]/);
	const out=[];
	let prev='';
	notes.forEach((note,idx)=>{
		note=note.trim();
		let parsed=recognise(note);
		
		if (!parsed || parsed==note) {
			const m3=note.match(/^\d+\.\d+\.[\d\-]+$/);
			const m2=note.match(/^\d+\.[\d\-]+$/);
			const m1=note.match(/^[\d\-]+$/);
			if ((m1||m2||m3)&&prev) {
				if (m3) {
					note=prev.replace(/\d+\.\d+\.[\d\-]+$/,m3);
				} else if (m2) {
					note=prev.replace(/\d+\.[\d\-]+$/,m2);
				} else if (m1) {
					note=prev.replace(/[\d\-]+$/,m1);
				}
				parsed=recognise(note);						
			}
		}
		if (!parsed || parsed==note) {
			out.push({raw:note,idx});
		} else {
			let caplink=parsed.match(/<link target="(.+?)"\/>/)[1];
			if (caplink.indexOf(" ")>-1) {
				console.log("link has space",caplink);
				caplink=caplink.replace(/ /g,'');
			}
			out.push({raw:note,idx,parsed,caplink});
			prev=note;
		}				
	})
	return out;
}
const parseCite=(buf,fn)=>{
	return buf.replace(/\(([^\(]+)\)/g,(m,citetext)=>{
		const cites=parseTextWithLinks(citetext);
		let out='';
		cites.forEach(cite=>{
			if (!cite.parsed) {
				out+=cite.raw;
			} else {
				out+=cite.parsed;
			}
 		})
		return '('+out+')';
	})
}

export {recognise, parseTextWithLinks, parseCite}
//linkpatterns,//hyperlink_regex,hyperlink_regex_g,