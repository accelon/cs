const quotepuncs=[
    [/‘‘‘/g,"“‘"], //changepun in gen.js
    [/’’’/g,"’”"],
    [/‘‘/g,"“"],
    [/’’/g,"”"],
    [/<p rend="bodytext">/g,"<p>"],
];
export const changequotepunc=(content,fn)=>{
    quotepuncs.forEach( ([from,to])=>{
        content=content.replace(from,to);
    })
    return content;
}

export const removeparanum=(content,fn)=>{
	content=content.replace(/<\/hi><hi rend="dot">.<\/hi>/g,'</hi>');
	// range hangnum no dot , remove it 
	// s0305m.mul.xml <p rend="hangnum" n="357-366"><hi rend="paranum">357-366</hi></p>

	content=content.replace(/<p rend="bodytext" n="([\-\d]+)"><hi rend="paranum">([\d\-]+)<\/hi> ?/g,
		(m,m1,m2)=>{
			if (m1!=m2) throw "paranum unmatch "+m1+"<>"+m2+" ,"+fn;
			return '<p pn="'+m1+'">';
	});
	content=content.replace(/<p rend="hangnum" n="([\-\d]+)"><hi rend="paranum">([\-\d]+)<\/hi> ?/g,
		(m,m1,m2)=>{
			if (m1!=m2) throw "hanganum unmatch "+m1+"<>"+m2+" ,"+fn;
			return '<p hn="'+m1+'">';
	});
	content=content.replace(/<p rend="gatha\d?" n="([\-\d]+)"><hi rend="paranum">([\-\d]+)<\/hi> ?/g,
	(m,m1,m2)=>{
		if (m1!=m2) throw "hanganum unmatch "+m1+"<>"+m2+" ,"+fn;
		return '<p class="gatha" hn="'+m1+'">';
});
	return content;
}
