/* errata after convert TEI to ro */
/* use single crlf */
const Errata={
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
        ['<p rend="bodytext" n="270"><hi rend="paranum">270</hi>','<p rend="bodytext" n="270-279"><hi rend="paranum">270-279</hi>'],
        ['<p rend="bodytext" n="280"><hi rend="paranum">280</hi>','<p rend="bodytext" n="280-291"><hi rend="paranum">280-291</hi>'],
        ['<p rend="bodytext" n="292"><hi rend="paranum">292</hi>','<p rend="bodytext" n="292-301"><hi rend="paranum">292-301</hi>'],
        ['<p rend="bodytext" n="302"><hi rend="paranum">302</hi>','<p rend="bodytext" n="302-310"><hi rend="paranum">302-310</hi>'],
        ['<p rend="bodytext" n="541-552"><hi rend="paranum">541-552</hi>','<p rend="bodytext" n="541-586"><hi rend="paranum">541-586</hi>'],
        ['<p rend="bodytext" n="597-608"><hi rend="paranum">597-608</hi>','<p rend="bodytext" n="597-640"><hi rend="paranum">597-640</hi>'],
        ['<p rend="bodytext" n="651-662"><hi rend="paranum">651-662</hi>','<p rend="bodytext" n="651-672"><hi rend="paranum">651-672</hi>'],
        ['<p rend="bodytext" n="705-716"><hi rend="paranum">705-716</hi>','<p rend="bodytext" n="705-748"><hi rend="paranum">705-748</hi>'],
        ['<p rend="bodytext" n="759-770"><hi rend="paranum">759-770</hi>','<p rend="bodytext" n="759-791"><hi rend="paranum">759-791</hi>'],
        ['<p rend="bodytext" n="845-856"><hi rend="paranum">845-856</hi>','<p rend="bodytext" n="845-888"><hi rend="paranum">845-888</hi>'],
        ['<p rend="bodytext" n="923-934"><hi rend="paranum">923-934</hi>','<p rend="bodytext" n="923-966"><hi rend="paranum">923-966</hi>'],
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

}
export const getErrata=fn=>{
    if (!Errata[fn] || !Errata[fn].length) return null
    return Errata[fn];
}
