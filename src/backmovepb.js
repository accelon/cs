import { RO_CHARS } from "provident-pali";
export const backmovepb=content=>{
	const pb='<pb ed="(.)" n="([^\"]+?)" ?/>';
	const ch=RO_CHARS+'a-zA-Z{}…‘’“,';
	const pat4=new RegExp('({?['+ch+']+) ?'+pb+pb+pb+pb,'gi');
	const pat3=new RegExp('({?['+ch+']+) ?'+pb+pb+pb,'gi');
	const pat2=new RegExp('({?['+ch+']+) ?'+pb+pb,'gi');
	const pat1=new RegExp('({?['+ch+']+) ?'+pb,'gi');

	content=content.replace(pat4,(m,w,ed1,n1,ed2,n2,ed3,n3,ed4,n4)=>{
		n1=n1.replace(/\.0+/,".");n2=n2.replace(/\.0+/,".");
		n3=n3.replace(/\.0+/,".");n4=n4.replace(/\.0+/,".");
		ed1=ed1.toLowerCase();ed2=ed2.toLowerCase();ed3=ed3.toLowerCase();ed4=ed4.toLowerCase();
		return '<pb t="'+ed1+n1+';'+ed2+n2+';'+ed3+n3+';'+ed4+n4+'"/>'+w;
	})
	content=content.replace(pat3,(m,w,ed1,n1,ed2,n2,ed3,n3)=>{
		n1=n1.replace(/\.0+/,".");n2=n2.replace(/\.0+/,".");n3=n3.replace(/\.0+/,".");
		ed1=ed1.toLowerCase();ed2=ed2.toLowerCase();ed3=ed3.toLowerCase();
		return '<pb t="'+ed1+n1+';'+ed2+n2+';'+ed3+n3+'"/>'+w;
	})
	content=content.replace(pat2,(m,w,ed1,n1,ed2,n2)=>{
		n1=n1.replace(/\.0+/,".");n2=n2.replace(/\.0+/,".");
		ed1=ed1.toLowerCase();ed2=ed2.toLowerCase();
		return '<pb t="'+ed1+n1+';'+ed2+n2+'"/>'+w;
	})
	content=content.replace(pat1,(m,w,ed1,n1)=>{
		n1=n1.replace(/\.0+/,".");
		ed1=ed1.toLowerCase();
		// if (ed1=='v' &&n1=='1.14')debugger
		return '<pb t="'+ed1+n1+'"/>'+w;
	});

	//無法往前移一個字的，大寫t屬性區分. 可能被bold擋住，finalfixes再試著往前移
	const upat4=new RegExp(pb+pb+pb+pb,'g');
	const upat3=new RegExp(pb+pb+pb,'g');
	const upat2=new RegExp(pb+pb,'g');
	const upat1=new RegExp(pb,'g');

	content=content.replace(upat4,(m,ed1,n1,ed2,n2,ed3,n3,ed4,n4)=>{
		n1=n1.replace(/\.0+/,".");n2=n2.replace(/\.0+/,".");
		n3=n3.replace(/\.0+/,".");n4=n4.replace(/\.0+/,".");
		ed2=ed2.toLowerCase();ed2=ed2.toLowerCase();ed3=ed3.toLowerCase();ed4=ed4.toLowerCase();
		return '<pb T="'+ed1+n1+';'+ed2+n2+';'+ed3+n3+';'+ed4+n4+'"/>';
	});
	content=content.replace(upat3,(m,ed1,n1,ed2,n2,ed3,n3)=>{
		n1=n1.replace(/\.0+/,".");n2=n2.replace(/\.0+/,".");n3=n3.replace(/\.0+/,".");
		ed2=ed2.toLowerCase();ed2=ed2.toLowerCase();ed3=ed3.toLowerCase();
		return '<pb T="'+ed1+n1+';'+ed2+n2+';'+ed3+n3+'"/>';
	});
	content=content.replace(upat2,(m,ed1,n1,ed2,n2)=>{
		n1=n1.replace(/\.0+/,".");n2=n2.replace(/\.0+/,".");
		ed2=ed2.toLowerCase();ed2=ed2.toLowerCase();
		return '<pb T="'+ed1+n1+';'+ed2+n2+'"/>';
	});
	content=content.replace(upat1,(m,ed1,n1)=>{
		n1=n1.replace(/\.0+/,".");
		ed1=ed1.toLowerCase();
		return '<pb T="'+ed1+n1+'"/>';
	});
	return content;
}