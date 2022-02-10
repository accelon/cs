/* errata after convert TEI to ro */
/* use single crlf */
const Errata={
    'vin02m2.mul.xml':[
        ['<p rend="bodytext" n="199"><hi rend="paranum">199</hi> <hi rend="dot">.</hi>',
        '<p rend="bodytext" n="199"><hi rend="paranum">199</hi><hi rend="dot">.</hi>']
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
    's0103m.mul.xml':[
    	['<p rend="bodytext">paccayānuññātakāraṇaṃ</p>','<p rend="subhead">paccayānuññātakāraṇaṃ</p>'],
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
    's0305m.mul.xml':[//fill the gap for passing sequencial number check
        ['<p rend="bodytext" n="270"><hi rend="paranum">270</hi>',
        '<p rend="bodytext" n="270-279"><hi rend="paranum">270-279</hi>'],
        ['<p rend="bodytext" n="280"><hi rend="paranum">280</hi>',
        '<p rend="bodytext" n="280-291"><hi rend="paranum">280-291</hi>'],
        ['<p rend="bodytext" n="292"><hi rend="paranum">292</hi>',
        '<p rend="bodytext" n="292-301"><hi rend="paranum">292-301</hi>'],
        ['<p rend="bodytext" n="302"><hi rend="paranum">302</hi>',
        '<p rend="bodytext" n="302-310"><hi rend="paranum">302-310</hi>'],
        ['<p rend="bodytext" n="541-552"><hi rend="paranum">541-552</hi>',
        '<p rend="bodytext" n="541-586"><hi rend="paranum">541-586</hi>'],
        ['<p rend="bodytext" n="597-608"><hi rend="paranum">597-608</hi>',
        '<p rend="bodytext" n="597-640"><hi rend="paranum">597-640</hi>'],
        ['<p rend="bodytext" n="651-662"><hi rend="paranum">651-662</hi>',
        '<p rend="bodytext" n="651-672"><hi rend="paranum">651-672</hi>'],
        ['<p rend="bodytext" n="705-716"><hi rend="paranum">705-716</hi>',
        '<p rend="bodytext" n="705-748"><hi rend="paranum">705-748</hi>'],
        ['<p rend="bodytext" n="759-770"><hi rend="paranum">759-770</hi>',
        '<p rend="bodytext" n="759-791"><hi rend="paranum">759-791</hi>'],
        ['<p rend="bodytext" n="845-856"><hi rend="paranum">845-856</hi>',
        '<p rend="bodytext" n="845-888"><hi rend="paranum">845-888</hi>'],
        ['<p rend="bodytext" n="923-934"><hi rend="paranum">923-934</hi>',
        '<p rend="bodytext" n="923-966"><hi rend="paranum">923-966</hi>'],
    ],
    's0402m3.mul.xml':[ //missing paranum
        ['<p rend="bodytext">(chaṭṭhaṃ uttānatthamevāti','<p rend="bodytext" n="106"><hi rend="paranum">106</hi><hi rend="dot">.</hi>(chaṭṭhaṃ uttānatthamevāti']
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
    ]

}
export const getErrata=fn=>{
    if (!Errata[fn] || !Errata[fn].length) return null
    return Errata[fn];
}
