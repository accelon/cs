//mul bookname

const parseBookPara=link=>{
	const m=link.match(/(\d+)\.(\d+)/);
	if (!m)return null;
	const book=parseInt(m[1]),para=parseInt(m[2]);
	return [book,para]	
}

const generic=n=>{return 0}
const mat=function(para,fulllink){ //mul , att, tik with multivol
	para=para.trim();

	let bk=this,a_t='',extra='';
	if (Array.isArray(this)) {
		bk=this[0];
		a_t=this[1]||"";
		extra=this[2]||"";
	}
	let volpg='';
	if (para.indexOf(".")>-1) { //multi volumn
		volpg=para.replace(".",a_t+".");
		const lastch=parseInt(volpg[volpg.length-1]);
		if (isNaN(lastch)) {
			console.error("mat:invalid para",fulllink);
			return;			
		}
	} else {
		if (!para) {
			console.error("mat:invalid para",fulllink);
			return;
		}
		volpg="."+para;
		bk+= a_t?("0"+a_t):"";
	}

	return bk+volpg+extra;
}

const matg=function(para,fulllink){ //mul , att, tik with multi page unit
	para=para.trim();
	let bk=this,a_t='',extra='';

	if (Array.isArray(this)) {
		bk=this[0];
		a_t=this[1]||"";
		extra=this[2]||"";
	}
	if (para.indexOf(".")==-1) {
		console.error("should have page unit separator '.' ",fulllink);	
		return ;
	} 
	const p=para.split(".");
	if (p[1]=='') {
		console.log("missing para",bk,para)
		return ;
	}

	let volpg="_"+p[1]+"g"+p[0];
	bk+= a_t?("0"+a_t):"";
		
	return bk+volpg+extra;
}
const CiteHandler=[
	[/pāci\.? ([\d, \-]+)/i 						,mat.bind("pc")],
	[/pāci\.? aṭṭha\.? 2?\.?([\d\., \-]+)/i 		,mat.bind("pc")],
	[/pārā\.? ([\d\., \-]+)/i 					,mat.bind("pj")],
	[/pārā\.? aṭṭha\.? [12]?\.?([\d\., \-]+)/i 	,mat.bind(["pj","a"])],
	[/pari\.? ([\d\., \-]+)/i 					,mat.bind("pvr")],
	[/pari\.? aṭṭha\.? ([\d\., \-]+)/i 			,mat.bind(["pvr","a"])],
	[/parivāra\.? ([\d\.\-, ]+)/i				,mat.bind("pvr")],

///	[/dī\. ?ni\. abhi\. ṭī\. ([\d\., \-]+)/i, generic],

	[/dī\.? ?ni.? ?aṭṭha\.? ([\d\., \-]+)/i	,mat.bind(["dn","a"])],
	[/dī\.? ?ni.? ?ṭī\.? ([\d\., \-]+)/i		,mat.bind(["dn","t"])],
	[/dī\.? ?ni.? ?([\d\., \-]+)/i			,mat.bind("dn")],
	[/ma\.? ?ni.? ?aṭṭha\.? ([\d\.\-, ]+)/i	,mat.bind(["mn","a"])],
	[/ma\.? ?ni.? ?ṭī\.? ([\d\.\-, ]+)/i		,mat.bind(["mn","t"])],
	[/ma\.? ?ni.? ?([\d\.\- ,]+)/i			,mat.bind("mn")],
	[/saṃ\.? ?ni.? ?aṭṭha\.? ([\d\.\-, ]+)/i ,mat.bind(["sn","a"])],
	[/saṃ\.? ?ni.? ?ṭī\.? ([\d\.\-, ]+)/i	,mat.bind(["sn","t"])],
	[/saṃ\.? ?ni.? ?([\d\.\-, ]+)/i			,mat.bind("sn")],
	[/\ba\.? ?ni.? ?aṭṭha\.? ([\d\.\-, ]+)/i	,mat.bind(["an","a"])],
	[/\ba\.? ?ni.? ?ṭī\.? ([\d\.\-, ]+)/i		,mat.bind(["an","t"])],
	[/\ba\.? ?ni.? ?([\d\.\-, ]+)/i				,mat.bind("an")],

	[/bu.? vaṃ.? ([\d\.\-, ]+)/				,matg.bind("bv")],
	[/bu.? vaṃ.? ?aṭṭha\.? ([\d\.\-, ]+)/		,matg.bind(["bv","a"])],
///	[/abhidha\. (\d+)/,generic],
	[/apa.? thera\.? [12]\.([\d\.\-, ]+)/i	,matg.bind("thap")],
	[/apa.? therī\.? [12]\.([\d\.\-, ]+)/i	,matg.bind("thip")],

//	[/apa\. aṭṭha. [12]\.([\d\.\-, ]+)/i		,matg.bind(["thap","a"])]
//	[/apa\. aṭṭha\. ([\d\.\-, ]+)/,generic],


//	[/avapucchāniddesa /,generic],
	[/cariyā\.? ([\d\.\-, ]+)/i		,matg.bind("cp")],
	[/cariyā\.? aṭṭha\.? ([\d\.\-, ]+)/i,matg.bind(["cp","a"])],
///	[/visuddhi\. aṭṭha\. ([\d\.\-, ]+)/i,mat.bind(["vism","a"])],
	[/visuddhi\.? mahāṭī\.? [12]?\.?([\d\.\-, ]+)/i,mat.bind(["vism","a"])],
//	[/visuddhi\. ṭī\. [12]?\.([\d\.\-, ]+)/i,mat.bind(["vism","a"])],
	[/visuddh[iī]\.? [12]?\.?([\d\.\-, ]+)/i	,mat.bind("vism")],

	[/jā\.? 1\.([\d\.\-, ]+)/i			,matg.bind("ja1")],
	[/jā\.? 2\.([\d\.\-, ]+)/i			,matg.bind("ja2")],
	[/jā\.? aṭṭha\.? [12345]\.([\d\.\-, ]+)/i,matg.bind("ja1a")],

	[/jā. aṭṭha. 1.dūrenidānakathā/i,		()=>"ja1a_1"],
	[/jā. aṭṭha. 1.avidūrenidānakathā/i,	()=>"ja1a_2"],
	
	[/jā\.? aṭṭha\.? 6\.([\d\.\-, ]+)/i 		,matg.bind("ja2a")],

	[/dha\.? pa\.? ([\d\.\-, ]+)/i				,mat.bind("dhp")],
	[/dha\.? pa\.? aṭṭha. [12]?\.?([\d\.\-, ]+)/i	,mat.bind(["dhp","a"])],

//	[/dha\. sa\. 1\.(+)/i					,mat.bind(["ds","","g1"])],
	[/dha\.? sa\.? ([\d\-, ]+)/i				,mat.bind(["ds","","g3"])],
	[/dha\.? sa\.? aṭṭha\.? ([\d\-, ]+)/i		,mat.bind(["ds","a","g3"])],
	[/dha\.? sa\.? mūlaṭī. ([\d+\-, ]+)/i		,mat.bind(["ds","t","g3"])],

	[/dha\.? sa\. dukamātikā ([\d\.\-, ]+)/	,mat.bind(["ds","","g2"])],
	[/dha\.? sa\. tikamātikā ([\d\.\-, ]+)/	,mat.bind(["ds","","g1"])],

	[/mahāvagg[ao] ([\d\.\-, ]+)/	,mat.bind("mv")],
	[/[Mm]ahāva\.? ([\d\.\-, ]+)/	,mat.bind("mv")],

	[/mahāva\.? aṭṭha\.? ([\d\.\-, ]+)/,mat.bind(["mv","a"])],
	[/cūḷavagga ([\d\.\-, ]+)/i	,mat.bind("cv")],
	[/c[uū]ḷava\.? ([\d\.\-, ]+)/	,mat.bind("cv")],
	[/cūḷava\.? aṭṭha\.? ([\d\.\-, ]+)/	,mat.bind(["cv","a"])],


	[/cūḷani\.? \S+niddes[oa][ .]([\d\.\-, ]+)/i,mat.bind(["cnd"])],
	[/cūḷani\.? \S+pucchā ([\d\.\-, ]+)/i		,mat.bind(["cnd","","g1"])],
	[/cūḷani\.? ([\d\.\-, ]+)/i 		,mat.bind("cnd")],

	[/cūḷani.? aṭṭha.? ([\d\.\-, ]+)/i,mat.bind(["cnd","a"])],
	[/dhātu\.? ([\d\.\-, ]+)/i		,mat.bind("dt")],

	[/kathā\.? ([\d\.\-, ]+)/i		,mat.bind("kv")],
	[/khu\.? pā\.? ([\d\.\-, ]+)/i	,matg.bind("kp")],
	[/khu\.? pā\.? aṭṭha\.? ([\d\.\-, ]+)/i,matg.bind(["kp","a"])],
	[/udā\.? (\d+)/i					,mat.bind("ud")],
	[/udā\.? aṭṭha\.? ([\d\.\-, ]+)/i ,mat.bind(["ud","a"])],


	[/itivu\.? ([\d\.\-, ]+)/i			,mat.bind("iti")],
	[/itivu\.? aṭṭha\.? ([\d\.\-, ]+)/i 	,mat.bind(["iti","a"])],

	[/mahāni\.? ([\d\.\-, ]+)/i 			,mat.bind("mnd")],
	[/mahāni\.? aṭṭha\.? ([\d\.\-, ]+)/i 	,mat.bind(["mnd","a"])],

///	[/mātikā/,generic],
///	[/mi. pa./,generic],

	[/netti\.? ([\d\.\-, ]+)/i 			,mat.bind("ne")],
	[/netti\.? aṭṭha\.? ([\d\.\-, ]+)/i  ,mat.bind(["ne","a"])],

	[/paṭi\.? ([\d]+)/i						,mat.bind(["ps","","g1"])],
	[/paṭi\.? ma\.? ([\d\.\-, ]+)/			,matg.bind("ps")],
	[/paṭi\.? ma\.? aṭṭha\.? [12]\.?([\d\.\-, ]+)/i	,matg.bind(["ps","a"])],


	[/paṭṭh[aā]\.? ([\d\.\-, ]+)/,mat.bind(["pt"])],
///	[/paṭṭhāna\.? ([\d\.\-, ]+)/,generic],
///	[/paṭṭhā\. aṭṭha\. ([\d\.\-, ]+)/,generic],

	[/peṭako\.? ([\d\.\-, ]+)/i			,mat.bind("pe")],

	[/vi\.? va\.? ([\d\.\-, ]+)/i 		,mat.bind("vv")],
	[/pe\.? va\.? ([\d\.\-, ]+)/i 			,mat.bind("pv")],
	[/pu\.? pa\.? ([\d\.\-, ]+)/i 			,mat.bind("pp")],
	[/pu\.? pa\.? aṭṭha\.? ([\d\.\-, ]+)/i 	,mat.bind(["pp","a"])],
//	[/sa\. sa\. ([\d\-, ]+)/i 			,generic],
//	[/sa\. mūlaṭī\.? ([\d\-, ]+)/ 		,generic],

//	[/pāṇin[īi]\.? ([\d\.\-, ]+)/,generic],

//	[/sārattha\. ṭī\./,generic],

	[/su\.? ni\.? ([\d\.\-, ]+)/i 				,mat.bind("snp")],
	[/su\.? ni\.? aṭṭha\.? [12]\.([\d\.\-, ]+)/i  ,mat.bind(["snp","a"])],
	[/therīgā\.? ([\d\.\-, ]+)/i 				,mat.bind("thig")],
	[/therīgā\.? aṭṭha\.? ([\d\.\-, ]+)/i 		,mat.bind(["thig","a"])],
	[/theragā\.? ([\d\.\-, ]+)/i					,mat.bind("thag")],

//might have pali words at the end
	[/theragā\. aṭṭha\.? [12]\.([\d\.\-, ]+)$/i ,mat.bind(["thag","a"])],


//	[/u\. vi\. /,generic],
//	[/vaṃ\. /,generic],

//	[/vi\. ([\d\-, ]+)/,generic],
//	[/vi\. aṭṭha\. ([\d\-, ]+)/,generic],
//	[/vi\. vi\./,generic],
//	[/vi\. vi\. ṭī\. /,generic],
//	

	[/vibha\.? ([\d\-, ]+)/i 		,mat.bind("vb")],
	[/vibha\.? aṭṭha\. ([\d\-, ]+)/i ,mat.bind(["vb","a"])],
//	[/vi\. saṅga\.? ?aṭṭha\./,generic],
//	[/yama\. ([\d\-, ]+)/i,generic],
//	[/yathā (\d+)/i,generic]
]

/* rare case */
export default CiteHandler;