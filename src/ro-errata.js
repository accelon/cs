/* errata after convert TEI to ro */
/* use single crlf */
const Errata={
    'vin01m.mul.xml':[
        ['[ ]',''], //mess up with off tag
    ],
    'vin02m2.mul.xml':[
        ['<p rend="bodytext" n="199"><hi rend="paranum">199</hi> <hi rend="dot">.</hi>',
        '<p rend="bodytext" n="199"><hi rend="paranum">199</hi><hi rend="dot">.</hi>'],
        ['[ ]',''],

    ],
    'vin02m4.mul.xml':[
        //vri 只標了16 個的前兩個為title，改為與bhikkhu 一致
        ['<p rend="subhead">1\. katthapaññattivāro</p>','<p rend="title">1. katthapaññattivāro</p>'],
        ['<p rend="subhead">2\. katāpattivāro</p>','<p rend="title">2. katāpattivāro</p>'],
        [/<p rend="subhead">3\. vipattivāro<\/p>/g,'<p rend="title">3. vipattivāro</p>',2],
        [/<p rend="subhead">4\. saṅgahavāro<\/p>/g,'<p rend="title">4. saṅgahavāro</p>',2],
        [/<p rend="subhead">5\. samuṭṭhānavāro<\/p>/g,'<p rend="title">5. samuṭṭhānavāro</p>',2],
        [/<p rend="subhead">6\. adhikaraṇavāro<\/p>/g,'<p rend="title">6. adhikaraṇavāro</p>',2],
        [/<p rend="subhead">7\. samathavāro<\/p>/g,'<p rend="title">7. samathavāro</p>',2],
        [/<p rend="subhead">8\. samuccayavāro<\/p>/g,'<p rend="title">8. samuccayavāro</p>',2],

        //vri atthavasapakaraṇaṃ(不是chapter/title) , 改為 chapter ，(應是漏標<div)
            //對應 pli-tv-pvr9_root-pli-ms
        ['<p rend="subhead">atthavasapakaraṇaṃ</p>','<p rend="chapter">atthavasapakaraṇaṃ</p>'],
        //改為chapter 以便與 sc 對應 (pvr 分為 21 chapter, 頭兩個chapter各分為16節)
        ['<p rend="title">samathabhedo</p>','<p rend="chapter">samathabhedo</p>']
    ], 
    's0102m.mul.xml':[
        ['<p rend="centre">‘‘kinti te, ānanda, sutaṃ, ‘vajjī yāni tāni</p>\n<p rend="bodytext">',
        '<p rend="bodytext">‘‘kinti te, ānanda, sutaṃ, ‘vajjī yāni tāni '],//not a title ,
    ],
    's0103m.mul.xml':[
    	['<p rend="bodytext">paccayānuññātakāraṇaṃ</p>','<p rend="subhead">paccayānuññātakāraṇaṃ</p>'],
    ],
    's0201m.mul.xml':[
        //combine 119-135
        
        //delete 120-135 in code 
        ['<p rend="bodytext" n="119"><hi rend="paranum">119',
        '<p rend="bodytext" n="119-135"><hi rend="paranum">119-135'],

        //sc 和an5.194 都沒拆那麼細
        ['</p>\n<p rend="bodytext">‘‘paṇḍito maññe’’ti।</p>',' ‘‘paṇḍito maññe’’ti।</p>']
    ],
    's0201a.att.xml':[
        ['<p rend="bodytext" n="01"><hi rend="paranum">0</hi>','<p rend="bodytext">']
    ],
    's0201t.tik.xml':[
        ['<p rend="bodytext" n="1"><hi rend="paranum">1</hi><hi rend="dot">.</hi> vibhāgavantānaṃ',
        '<p rend="bodytext" n="17"><hi rend="paranum">17</hi><hi rend="dot">.</hi> vibhāgavantānaṃ'],
        //weird, seems redudent
        ['<p rend="bodytext" n="01"><hi rend="paranum">0</hi>','<p rend="bodytext">']
    ],
    's0301m.mul.xml':[
        //align with SC
        ['<trailer rend="centre">bhikkhunīsaṃyuttaṃ samattaṃ।</trailer>\n</div>','<p rend="center">Bhikkhunīvaggo paṭhamo।</p>'],
        //move </div> down to align with SC, samattaṃ cames after uddānaṃ
        ['<div id="sn1_6"','<trailer rend="centre">bhikkhunīsaṃyuttaṃ samattaṃ।</trailer>\n</div>\n<div id="sn1_6"'],

        ['<trailer rend="centre">vaṅgīsasaṃyuttaṃ samattaṃ।</trailer>\n</div>\n',''],
        ['<div id="sn1_9"','<trailer rend="centre">vaṅgīsasaṃyuttaṃ samattaṃ।</trailer>\n</div>\n<div id="sn1_9"'],

        ['<trailer rend="centre">vanasaṃyuttaṃ samattaṃ।</trailer>\n</div>\n',''],
        ['<div id="sn1_10"','<trailer rend="centre">vanasaṃyuttaṃ samattaṃ।</trailer>\n</div>\n<div id="sn1_10"'],

        ['<trailer rend="centre">yakkhasaṃyuttaṃ samattaṃ।</trailer>\n</div>\n',''],
        ['<div id="sn1_11"','<trailer rend="centre">yakkhasaṃyuttaṃ samattaṃ।</trailer>\n</div>\n<div id="sn1_11"'],
    ],
    's0302m.mul.xml':[
        //inconsistent in sn13.11:3.4 , should be moved to the end
        //['<trailer rend="centre">abhisamayasaṃyuttaṃ samattaṃ।</trailer>\n</div>\n',''],
        //['<div id="sn2_3"','<trailer rend="centre">abhisamayasaṃyuttaṃ samattaṃ।</trailer>\n</div>\n<div id="sn2_3"'],


        ['<trailer rend="centre">kassapasaṃyuttaṃ samattaṃ।</trailer>\n</div>\n',''],
        ['<div id="sn2_6"','<trailer rend="centre">kassapasaṃyuttaṃ samattaṃ।</trailer>\n</div>\n<div id="sn2_6"'],
        ['<trailer rend="centre">opammasaṃyuttaṃ samattaṃ।</trailer>\n</div>\n',''],
        ['<div id="sn2_10"','<trailer rend="centre">opammasaṃyuttaṃ samattaṃ।</trailer>\n</div>\n<div id="sn2_10"'],

        ['<trailer rend="centre">bhikkhusaṃyuttaṃ samattaṃ।</trailer>\n</div>\n',''],
        ['<p rend="centre">nidānavaggo dutiyo।</p>',
        '<trailer rend="centre">bhikkhusaṃyuttaṃ samattaṃ।</trailer>\n</div>\n<p rend="centre">nidānavaggo dutiyo।</p>'],
        
        //align with sc
        //['<trailer rend="centre">abhisamayasaṃyuttaṃ samattaṃ।</trailer>\n',''],
        //['mahābhiñño”ti। ekādasamaṃ।</p>','mahābhiñño”ti। ekādasamaṃ।</p>\n<trailer rend="centre">abhisamayasaṃyuttaṃ samattaṃ।</trailer>'],

    ],
    's0303m.mul.xml':[
        ['<trailer rend="centre">okkantasaṃyuttaṃ <note>okkantikasaṃyuttaṃ (pī ka)</note> samattaṃ।</trailer>\n</div>\n',''],
        ['<div id="sn3_5"','<trailer rend="centre">okkantasaṃyuttaṃ <note>okkantikasaṃyuttaṃ (pī ka)</note> samattaṃ।</trailer>\n</div>\n<div id="sn3_5"'],

        ['<trailer rend="centre">uppādasaṃyuttaṃ samattaṃ।</trailer>\n</div>\n',''],
        ['<div id="sn3_6"','<trailer rend="centre">uppādasaṃyuttaṃ samattaṃ।</trailer>\n</div>\n<div id="sn3_6"'],
        
        ['<trailer rend="centre">kilesasaṃyuttaṃ samattaṃ।</trailer>\n</div>\n',''],
        ['<div id="sn3_7"','<trailer rend="centre">kilesasaṃyuttaṃ samattaṃ।</trailer>\n</div>\n<div id="sn3_7"'],
        
        ['<trailer rend="centre">sāriputtasaṃyuttaṃ samattaṃ।</trailer>\n</div>\n',''],
        ['<div id="sn3_8"','<trailer rend="centre"></trailer>\n</div>\n<div id="sn3_8"'],
        
        ['<trailer rend="centre">nāgasaṃyuttaṃ samattaṃ।</trailer>\n</div>\n',''],
        ['<div id="sn3_9"','<trailer rend="centre">nāgasaṃyuttaṃ samattaṃ।</trailer>\n</div>\n<div id="sn3_9"'],
        
        ['<trailer rend="centre">supaṇṇasaṃyuttaṃ samattaṃ।</trailer>\n</div>\n',''],
        ['<div id="sn3_10"','<trailer rend="centre">supaṇṇasaṃyuttaṃ samattaṃ।</trailer>\n</div>\n<div id="sn3_10"'],
        
        ['<trailer rend="centre">gandhabbakāyasaṃyuttaṃ samattaṃ।</trailer>\n</div>\n',''],
        ['<div id="sn3_11"','<trailer rend="centre">gandhabbakāyasaṃyuttaṃ samattaṃ।</trailer>\n</div>\n<div id="sn3_11"'],
        
        ['<trailer rend="centre">valāhakasaṃyuttaṃ samattaṃ।</trailer>\n</div>\n',''],
        ['<div id="sn3_12"','<trailer rend="centre">valāhakasaṃyuttaṃ samattaṃ।</trailer>\n</div>\n<div id="sn3_12"'],
        
        ['<trailer rend="centre">vacchagottasaṃyuttaṃ samattaṃ।</trailer>\n</div>\n',''],
        ['<div id="sn3_13"','<trailer rend="centre">vacchagottasaṃyuttaṃ samattaṃ।</trailer>\n</div>\n<div id="sn313_"'],

        ['<trailer rend="centre">jhānasaṃyuttaṃ <note>samādhisaṃyuttaṃ (syā kaṃ)</note> samattaṃ।</trailer>\n</div>\n',''],
        ['<p rend="gathalast">gocarā abhinīhāro sakkacca, sātacca athopi sappāyanti॥</p>'
        ,'<p rend="gathalast">gocarā abhinīhāro sakkacca, sātacca athopi sappāyanti॥</p>\n<trailer rend="centre">jhānasaṃyuttaṃ <note>samādhisaṃyuttaṃ (syā kaṃ)</note> samattaṃ।</trailer>\n</div>'],

        ['<p rend="centre">khandhavaggo tatiyo।</p>\n',''],
        ['vitthāretabbāni।)</p>','vitthāretabbāni।)</p>\n<p rend="centre">khandhavaggo tatiyo।</p>',],

    ],
    's0304m.mul.xml':[
//        ['<trailer rend="centre">jambukhādakasaṃyuttaṃ samattaṃ।</trailer>\n</div>\n',''],
//        ['<div id="sn4_5"','<trailer rend="centre">jambukhādakasaṃyuttaṃ samattaṃ।</trailer>\n</div>\n<div id="sn4_5"'],

        ['<trailer rend="centre">moggallānasaṃyuttaṃ <pb ed="P" n="4.0281"/> samattaṃ।</trailer>\n</div>\n',''],
        ['<div id="sn4_7"','<trailer rend="centre">moggallānasaṃyuttaṃ <pb ed="P" n="4.0281"/> samattaṃ।</trailer>\n</div>\n<div id="sn4_7"'],

        ['<trailer rend="centre">cittasaṃyuttaṃ samattaṃ।</trailer>\n</div>\n',''],
        ['<div id="sn4_8"','<trailer rend="centre">cittasaṃyuttaṃ samattaṃ।</trailer>\n</div>\n<div id="sn4_8"'],

        ['<trailer rend="centre">gāmaṇisaṃyuttaṃ samattaṃ।</trailer>\n</div>\n',''],
        ['<div id="sn4_9"','<trailer rend="centre">gāmaṇisaṃyuttaṃ samattaṃ।</trailer>\n</div>\n<div id="sn4_9"'],

        ['<trailer rend="centre">abyākatasaṃyuttaṃ <pb ed="P" n="4.0403"/> samattaṃ।</trailer>\n</div>\n',''],

        ['<p rend="centre">saḷāyatanavaggo catuttho।</p>'
         ,'<trailer rend="centre">abyākatasaṃyuttaṃ <pb ed="P" n="4.0403"/> samattaṃ।</trailer>\n</div>'],

        ['<p rend="gathalast">abyākatanti dasadhāti॥</p>','<p rend="gathalast">abyākatanti dasadhāti॥</p>\n<p rend="centre">saḷāyatanavaggo catuttho।</p>']
    ],
    's0305m.mul.xml':[//fill the gap for passing sequencial number check
        ['<p rend="centre">(gaṅgāpeyyālī)।</p>\n<p rend="centre">dutiyagaṅgāpeyyālavaggo dutiyo।</p>'
        ,'<p rend="centre">(gaṅgāpeyyālī)। dutiyagaṅgāpeyyālavaggo dutiyo।</p>'],//missing dutiyo in SC, combined in single line

        ['<trailer rend="centre">mahāvaggasaṃyuttapāḷi niṭṭhitā।</trailer>',
        '<trailer rend="centre">mahāvaggasaṃyuttapāḷi niṭṭhitā।</trailer>\n<trailer rend="centre">saṃyuttanikāyo samatto।</trailer></div></div>'],

    //give Appamādavagga a pseudo paranum
     	['<p rend="centre">(appamādavaggo sammappadhānavasena vitthāretabbo)।</p>', //sn49.13-22:1.1
     	'<p rend="bodytext" n="663-672"><hi rend="paranum">663-672</hi><hi rend="dot">.</hi> (appamādavaggo sammappadhānavasena vitthāretabbo)।</p>'],

		['<p rend="centre">appamādavaggo <pb ed="V" n="3.0323"/> vitthāretabbo।</p>', //sn50.13-22:1.1
		'<p rend="bodytext" n="717-748"><hi rend="paranum">717-748</hi><hi rend="dot">.</hi> appamādavaggo <pb ed="V" n="3.0323"/> vitthāretabbo।</p>'],

        //align with SC, swap
        [' (sammappadhānasaṃyuttassa gaṅgāpeyyālī sammappadhānavasena vitthāretabbā)।</p>\n<p rend="centre">gaṅgāpeyyālavaggo paṭhamo।</p>',
        '</p>\n<p rend="centre">gaṅgāpeyyālavaggo paṭhamo।</p>\n<p rend="centre">(sammappadhānasaṃyuttassa gaṅgāpeyyālī sammappadhānavasena vitthāretabbā)।</p>'],

//多部小經只標了一個經號
        ['<p rend="bodytext" n="270"><hi rend="paranum">270</hi>',
        '<p rend="bodytext" n="270-279"><hi rend="paranum">270-279</hi>'],
        ['<p rend="bodytext" n="280"><hi rend="paranum">280</hi>',
        '<p rend="bodytext" n="280-291"><hi rend="paranum">280-291</hi>'],
        ['<p rend="bodytext" n="292"><hi rend="paranum">292</hi>',
        '<p rend="bodytext" n="292-301"><hi rend="paranum">292-301</hi>'],
        ['<p rend="bodytext" n="302"><hi rend="paranum">302</hi>',
        '<p rend="bodytext" n="302-310"><hi rend="paranum">302-310</hi>'],


        // ['<p rend="bodytext" n="541-552"><hi rend="paranum">541-552</hi>',
        // '<p rend="bodytext" n="541-586"><hi rend="paranum">541-586</hi>'],
        // 不能直接擴充range，改為塞入一個虛擬段
        ['<p rend="title">12. oghavaggo</p>',
        '<p rend="bodytext" n="553-586"><hi rend="paranum">553-586</hi><hi rend="dot">.</hi>…</p>\n<p rend="title">12. oghavaggo</p>'],

        // ['<p rend="bodytext" n="597-608"><hi rend="paranum">597-608</hi>',
        // '<p rend="bodytext" n="597-640"><hi rend="paranum">597-640</hi>'],

        ['<p rend="bodytext">appamādavagga',
        '<p rend="bodytext" n="609-640"><hi rend="paranum">609-640</hi><hi rend="dot">.</hi>…</p>\n<p rend="bodytext">appamādavagga'],


//        ['<p rend="bodytext" n="651-662"><hi rend="paranum">651-662</hi>',   //改為補入663-672
//        '<p rend="bodytext" n="651-672"><hi rend="paranum">651-672</hi>'],
//        ['<p rend="bodytext" n="705-716"><hi rend="paranum">705-716</hi>',  //改為補入717-748
//        '<p rend="bodytext" n="705-748"><hi rend="paranum">705-748</hi>'],

//	        ['<p rend="bodytext" n="759-770"><hi rend="paranum">759-770</hi>',
//        '<p rend="bodytext" n="759-791"><hi rend="paranum">759-791</hi>'],

        ['<p rend="centre">appamāda-balakaraṇīyavaggā',
        '<p rend="bodytext" n="771-791"><hi rend="paranum">771-791</hi><hi rend="dot">.</hi>…</p>\n<p rend="centre">appamāda-balakaraṇīyavaggā'],


        // ['<p rend="bodytext" n="845-856"><hi rend="paranum">845-856</hi>',
        // '<p rend="bodytext" n="845-888"><hi rend="paranum">845-888</hi>'],

        ['<p rend="title">8. oghavaggo</p>\n<p rend="subhead">1-10',
        '<p rend="bodytext" n="857-888"><hi rend="paranum">857-888</hi><hi rend="dot">.</hi>…</p>\n<p rend="title">8. oghavaggo</p>\n<p rend="subhead">1-10'],

    //     ['<p rend="bodytext" n="923-934"><hi rend="paranum">923-934</hi>',
    //     '<p rend="bodytext" n="923-966"><hi rend="paranum">923-966</hi>'],
        ['<p rend="title">5. oghavaggo</p>\n<p rend="subhead">1-10. oghādisuttaṃ</p>',
        '<p rend="bodytext" n="935-966"><hi rend="paranum">935-966</hi><hi rend="dot">.</hi>…</p>\n<p rend="title">5. oghavaggo</p>\n<p rend="subhead">1-10. oghādisuttaṃ</p>'],

        ['dasamaṃ।</p>\n<p rend="centre">oghavaggo pañcamo।</p>\n<p rend="bodytext">tassuddānaṃ –</p>\n<p rend="gatha1">ogho yogo upādānaṃ, ganthā anusayena ca।</p>\n<p rend="gathalast">kāmaguṇā nīvaraṇā, khandhā oruddhambhāgiyāti॥</p>\n<p rend="title">6. gaṅgāpeyyālavaggo</p>'
        ,'</p>\n<p rend="title">6. gaṅgāpeyyālavaggo</p>'] //redundant gatha
    ],
    's0401m.mul.xml':[
        //SC pamadadivagga start from 82, CS starts from 81
        ['<trailer rend="centre">kalyāṇamittādivaggo aṭṭhamo।</trailer>\n</div>\n<div id="an1_9" n="an1_9" type="vagga">\n<head rend="chapter">9. pamādādivaggo</head>\n',''],
        ['<p rend="bodytext" n="82">','<trailer rend="centre">kalyāṇamittādivaggo aṭṭhamo।</trailer>\n</div>\n<div id="an1_9" n="an1_9" type="vagga">\n<head rend="chapter">9. pamādādivaggo</head>\n<p rend="bodytext" n="82">'],

        //SC missing
        ['<trailer rend="centre">ekadhammapāḷi soḷasamo।</trailer>\n',''],
        ['<trailer rend="centre">pasādakaradhammavaggo sattarasamo।</trailer>\n',''],


    ],
    's0402m2.mul.xml':[//an3
        //swap according to SC
        ['<trailer rend="centre">rathakāravaggo dutiyo।</trailer>\n</div>\n<p rend="centre">paṭhamabhāṇavāro niṭṭhito।</p>',
        '<p rend="centre">paṭhamabhāṇavāro niṭṭhito।</p>\n<trailer rend="centre">rathakāravaggo dutiyo।</trailer>\n</div>'],
        ['<p rend="gathalast">samādhimūlakā peyyālesupi vavatthitā cāti॥</p>',
        '<p rend="gathalast">samādhimūlakā peyyā, lesupi vavatthitā cāti॥</p>\n<p rend="centre">tatiyo paṇṇāsako niṭṭhito।</p>'] //SC break the word and extra pannasako nitthito (an3.183-352:8.5) 
    ],
    's0402m3.mul.xml':[ //missing paranum //an4
        ['<p rend="bodytext">(chaṭṭhaṃ uttānatthamevāti','<p rend="bodytext" n="106"><hi rend="paranum">106</hi><hi rend="dot">.</hi>(chaṭṭhaṃ uttānatthamevāti'],
        
        //需要這個
        ['<trailer rend="centre">catukkanipātapāḷi','<p rend="centre">pañcamo paṇṇāsako samatto।</p>\n<trailer rend="centre">catukkanipātapāḷi']
    ],
    's0403m1.mul.xml':[
        ['<p rend="bodytext">‘‘katame pañca? saddhābalaṃ',
        //according to an5.308-1152_reference.json
        '<p rend="bodytext" n="1152"><hi rend="paranum">1152</hi><hi rend="dot">.</hi>‘‘katame pañca? saddhābalaṃ'],

    ],
    's0403m2.mul.xml':[
        ['<p rend="hangnum">  </p>\n',''],
    ],
    's0404m1.mul.xml':[//an8
        ['[ ]',''], // miss up with offtag
        [' ekamantaṃ</p>\n<p rend="bodytext"><pb ed="T" n="4.0233"/> nisinnaṃ',
        '</p>\n<p rend="bodytext"><pb ed="T" n="4.0233"/>ekamantaṃ nisinnaṃ']
    ],
    's0404m4.mul.xml':[ 
        //MS 的 an11.502-981 為cs 所無， cs 的502 對應到sc為 msdiv503 (an11.982:1.1)，
        //att/tik 並沒有解釋 an11 的 17段之後的經文，故修改 cs 的段號無影響。
        ['<p rend="bodytext" n="502"><hi rend="paranum">502','<p rend="bodytext" n="503"><hi rend="paranum">503'],
        ['<p rend="bodytext" n="503-511"><hi rend="paranum">503-511','<p rend="bodytext" n="504-512"><hi rend="paranum">504-512'],
        ['<p rend="bodytext" n="512-671"><hi rend="paranum">512-671','<p rend="bodytext" n="513-672"><hi rend="paranum">513-672'],

        ['</div>\n<div id="an11_4"',
        '<p rend="bodytext" n="502"><hi rend="paranum">502</hi><hi rend="dot">.</hi> …pe…</p>\n</div>\n<div id="an11_4"']

    ],
    's0513a1.att.xml':[  //first 3 subhead is not jataka
        ['<p rend="subhead">1','<p rend="subsubhead">1'],
        ['<p rend="subhead">2','<p rend="subsubhead">2'],
        ['<p rend="subhead">3','<p rend="subsubhead">3'],
        ['<p rend="subhead">[111] ','<p rend="subhead">111 '], //extra []
        ['<p rend="subhead">[112] ','<p rend="subhead">112 '], //extra []
        ['<p rend="subhead">[113] ','<p rend="subhead">113 '], //extra []
    ],
    's0513m.mul.xml':[
        ['<p rend="subhead"> 152<hi rend="dot">.</hi>','<p rend="subhead"> 152.'],
        ['<p rend="hangnum" n="146"><hi rend="paranum">146</hi> ',//extra space
        '<p rend="hangnum" n="146"><hi rend="paranum">146</hi>']
    ],
    's0514m.mul.xml':[
        ['<p rend="hangnum" n="21"><hi rend="paranum">21</hi><hi rend="dot">.</hi></p>\n<p rend="gatha1">‘‘phalā',
		'<p rend="hangnum" n="22"><hi rend="paranum">22</hi><hi rend="dot">.</hi></p>\n<p rend="gatha1">‘‘phalā'],
    ],
    'e0102n.mul.xml':[
        ['<p rend="bodytext" n="561"><hi rend="paranum">561</hi><hi rend="dot">.</hi> ayaṃ',
        '<p rend="bodytext" n="591"><hi rend="paranum">591</hi><hi rend="dot">.</hi> ayaṃ']
    ],
    'e0103n.att.xml':[//清淨道論注缺 157段注釋
        ['<p rend="bodytext" n="156"><hi rend="paranum">156</hi><hi rend="dot">',
        '<p rend="bodytext" n="156-157"><hi rend="paranum">156-157</hi><hi rend="dot">'],
        ['<p rend="bodytext" n="182"><hi rend="paranum">182</hi>',
        '<p rend="bodytext" n="182-183"><hi rend="paranum">182-183</hi>'],
        ['<p rend="bodytext" n="190"><hi rend="paranum">190</hi>',
         '<p rend="bodytext" n="190-191"><hi rend="paranum">190-191</hi>'],
         ['<p rend="bodytext" n="202"><hi rend="paranum">202</hi>',
        '<p rend="bodytext" n="202-203"><hi rend="paranum">202-203</hi>'],
        ['<p rend="bodytext" n="319"><hi rend="paranum">319</hi>',
        '<p rend="bodytext" n="319-320"><hi rend="paranum">319-320</hi>'],
        ['<p rend="bodytext" n="325"><hi rend="paranum">325</hi>',
         '<p rend="bodytext" n="325-326"><hi rend="paranum">325-326</hi>'],

        ['<p rend="bodytext" n="328"><hi rend="paranum">328</hi>',
         '<p rend="bodytext" n="328-330"><hi rend="paranum">328-330</hi>'],

         ['<p rend="bodytext" n="334"><hi rend="paranum">334</hi>',
         '<p rend="bodytext" n="334-335"><hi rend="paranum">334-335</hi>'],
         ['<p rend="bodytext" n="339"><hi rend="paranum">339</hi>',
         '<p rend="bodytext" n="339-342"><hi rend="paranum">339-342</hi>'],
         ['<p rend="bodytext" n="363"><hi rend="paranum">363</hi>',
         '<p rend="bodytext" n="363-364"><hi rend="paranum">363-364</hi>']
    ],
    'e0104n.att.xml':[//清淨道論注缺 157段注釋
        ['<p rend="bodytext" n="417"><hi rend="paranum">417</hi>',
        '<p rend="bodytext" n="417-418"><hi rend="paranum">417-418</hi>'],
        ['<p rend="bodytext" n="476"><hi rend="paranum">476</hi>',
        '<p rend="bodytext" n="476-477"><hi rend="paranum">476-477</hi>'],
        ['<p rend="bodytext" n="483"><hi rend="paranum">483</hi>',
        '<p rend="bodytext" n="483-484"><hi rend="paranum">483-484</hi>'],
        ['<p rend="bodytext" n="488"><hi rend="paranum">488</hi>',
        '<p rend="bodytext" n="488-489"><hi rend="paranum">488-489</hi>'],
        
        ['<p rend="bodytext" n="778"><hi rend="paranum">778</hi>',
        '<p rend="bodytext" n="778-779"><hi rend="paranum">778-779</hi>'],
        ['<p rend="bodytext" n="786"><hi rend="paranum">786</hi>',
        '<p rend="bodytext" n="786-787"><hi rend="paranum">786-787</hi>'],
        ['<p rend="bodytext" n="843"><hi rend="paranum">843</hi>',
        '<p rend="bodytext" n="843-844"><hi rend="paranum">843-844</hi>'],

        ['<p rend="bodytext" n="880"><hi rend="paranum">880</hi>',
        '<p rend="bodytext" n="880-881"><hi rend="paranum">880-881</hi>'],
    ],
    'e1201n.nrf.xml':[
        ['[ ]','',13],
    ]

}
export const getErrata=fn=>{
    if (!Errata[fn] || !Errata[fn].length) return null
    return Errata[fn];
}
