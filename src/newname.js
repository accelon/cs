const newname={
	vin01m:"pj",vin02m1:"pc",vin02m2:"mv",vin02m3:"cv",vin02m4:"pvr",
    // 計算而得

	s0501m:"kp",s0502m:"dhp",s0503m:"ud",s0504m:"iti",s0505m:"snp",
	s0506m:"vv",s0507m:"pv",s0508m:"thag",s0509m:"thig",s0510m1:"thap",s0510m2:"thip",
	s0511m:"bv",s0512m:"cp",s0513m:"ja1",s0514m:"ja2",s0515m:"mnd",s0516m:"cnd",
	s0517m:"ps",s0518m:"mil",s0519m:"ne",s0520m:"pe",
	abh01m:"ds",abh02m:"vb",abh03m1:"dt",
	abh03m2:"pp",abh03m3:"kv",
	abh03m4:"ya1",abh03m5:"ya2",abh03m6:"ya3",
	abh03m7:"pt1",abh03m8:"pt2",abh03m9:"pt3",abh03m10:"pt4",abh03m11:"pt5",
	e0101n:'vs1',e0102n:'vs2',

	vin01a:"pj0a",vin02a1:"pc0a",vin02a2:"mv0a",vin02a3:"cv0a",vin02a4:"pvr0a",

	s0501a:"kp0a",s0502a:"dhp0a",s0503a:"ud0a",s0504a:"iti0a",s0505a:"snp0a",
	s0506a:"vv0a",s0507a:"pv0a",
	s0508a1:"thag0a1",
	s0508a2:"thig0a2",s0509a:"thig0a",s0510a:"thap0a",
	s0511a:"bv0a",s0512a:"cp0a",
	s0513a4:"ja1a",s0514a3:"ja2a",
	s0515a:"mnd0a",s0516a:"cnd0a",
	s0517a:"ps0a",s0519a:"ne0a",
	abh01a:"ds0a",abh02a:"vb0a",abh03a1:"dt0a",
	abh03a2:"pp0a",abh03a3:"kv0a",abh03a4:"ya0a",
	abh03a:"pt0a",
	e0103n:"vs1a",e0104n:"vs2a",
	// vin01t1:"sd0t",
	vin01t:"pj0t",  //這樣才對得上 pj0m pj0a
	vin02t:"pc0t"/*vin02t2:bhikkhuni vibhanga */,vin02t3:"mv0t",vin02t4:"cv0t",vin02t:"pvr0t",

    // s0101t:"dn1t",s0102t:"dn2t",s0103t:"dn3t",
	s0104t:"dn1u1", //戒蘊品新注1-149
	s0105t:"dn1u2", //戒蘊品新注 150-559  (對應 dn1)
	s0501t:"ne0t",s0519t:"ne0u",
	abh01t:"ds0t",abh02t1:"vb0t",abh02t:"vb0u",
	abh03t1:"dt0t",abh03t2:"pp0t",abh03t3:"kv0t",abh03t4:"ya0t",abh03t:"pt0t",
	abh04t:"ds0u",
	abh05t1:"dt0u",abh05t2:"pp0u",abh05t3:"kv0u",abh05t4:"ya0u",abh05t:"pt0u",
	
	abh06t: 'adv' ,//入阿毘達磨論' abhidhammāvatāro
	//abh07 Abhidhammatthasaṅgaho and Abhidhammatthavibhāvinīṭīkā
	abh07t1:'ads',//攝阿毘達摩義論。 abhidhammatthasaṅgaho
	abh07t: 'ads0a' ,//阿毘達摩廣釋  Abhidhammatthavibhāvinīṭīkā
	abh08t: 'advpt',//入阿毘達磨論古注 abhidhammāvatāra-purāṇaṭīkā
	abh09t: 'adt',//阿毘達摩注  abhidhammamātikāpāḷi

	e0105n:'vsnk',//Visuddhimagga nidānakathā
	e0201n:'ndn',//Niruttidīpanīpāṭha
	e0301n:'pmdp',//Paramatthadīpanī 究竟燈注 ledi sayadaw
	e0401n:'adn',//Anudīpanīpāṭha
	e0501n:'ptdp',//Paṭṭhānuddesa dīpanīpāṭha
	e0601n:'nmkr',//Namakkārapāḷi
	e0602n:'mhmp',//Mahāpaṇāmapāṭha

	e0608n:'bggv',//Buddhaguṇagāthāvalī

	e0701n:'cgv',//Cūḷaganthavaṃsapāḷi
	e0702n:'svpd',//Sāsanavaṃsappadīpikā
	e0703n:'mvp',//Mahāvaṃsapāḷi  大史
	//grammar
	e0801n:'mglsp',//Moggallānasuttapāṭho
	e0802n:'kcybk',//Kaccāyanabyākaraṇaṃ

	e0901n:'stp',//Suttantapiṭake
	//法律
	e1001n:'kvpn',//Kavidappaṇanīti
	e1002n:'nmjr',//Nītimañjarī
	//Pakiṇṇaka-gantha-saṅgaho
	e1101n:'rsvh',//Rasavāhinī

	e1201n:'vtsm',//Vuttisametā
	e1202n:'tpvs',//Thupavaṃso

	vin04t: 'dmtp',//第Dvemātikāpāḷi
	vin05t: 'vinsg',//Vinayasaṅgaha-aṭṭhakathā
	vin06t: 'vbt',//Vajirabuddhi-ṭīkā
	vin07t: 'vvt',//Vimativinodanī-ṭīkā
	vin08t: 'vlkt',//律裝飾 Vinayālaṅkāra-ṭīkā
	vin09t: 'kvpt',//疑感去除 古注 Kaṅkhāvitaraṇīpurāṇa-ṭīkā ，少號
	vin10t: 'vncy',//律辨別 Vinayavinicchayo      1-3183,1-970
	vin11t: 'vncy0a', //   Vinayavinicchayaṭīkā  1-1990,*1091-3183,1-965
	vin12t: 'pcy', //pacitiya 注釋 Pācityādiyojanā
	vin13t: 'ksms',//小學 根本學 Khuddasikkhā-mūlasikkhā

	/* e0603n e1215n 暫未處理*/
}
const checknewname=()=>{
	const keys={};
	for (let n in newname) {
		const k=newname[n];
		if (keys[k]) throw "Repeated new file name "+k+ "for "+n;
		keys[k]=n;
	}
}
checknewname();
export default newname;