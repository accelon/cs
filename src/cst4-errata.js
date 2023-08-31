import Typo from './cst4-typo.js'

// fix devanagari which cannot be convert to IAST
const InvalidTransliteration={ // ः
    'abh01m.mul.xml':[/\u0903/g,';',11], 
    'abh03m3.mul.xml':[
        ['क्ण्टको','कण्टको',1], //Kṇṭako==>Kaṇṭako , invalid combi in note
    ],
    'abh03m8.mul.xml':[
        ['चेतोपरियञाणंठ्चेतोपरियञाणं','चेतोपरियञाणं',1], //cetopariyañāṇaṃṭhcetopariyañāṇaṃ ==> cetopariyañāṇaṃ 他心通
    ],
    's0102m.mul.xml':[  //fixed in cst4 2022
        //['सीलवन्त्त','सीलवन्त',1], // Sīlavantta =>Sīlavanta   "dn16:1.24.0": "6. Sīlavantaānisaṁsa ",
    ],
    's0201m.mul.xml':[
        //fixed in version cst4 2022
        //['दियढ्डसतं','दियड्ढसतं',1], //diyaḍhḍasataṃ ==> diyaḍḍhasataṃ
        //['नत्थ्त्थ्थि','नत्थि',1] ,//Natthtththi==>natthi
    ],
    's0202m.mul.xml':[
        ['मालुङ्क्यपुत्तस्स','मालुन्क्यपुत्तस्स',1],// Māluṅkyaputtassa==>Mālunkyaputtassa
    ],
    's0203m.mul.xml':[
        [/\u0903/g,';',3], //據 bilara-data mn107_root-pli-ms.json 修正
        
        //fixed in version cst4 2022
        //['ज्ठितो','ठितो',1], //jṭhito==>ṭhito "mn143:17.2": Ekamantaṁ ṭhito kho anāthapiṇḍiko
    ],
    's0301m.mul.xml':[      //fixed in version cst4 2022
        //['अत्थ्त्थ्थि','अत्थि',1], //Atthtththi ==> Atthi ,
        //['अत्थ्त्थि','अत्थि',1], //Atthtthi ==> atthi
    ],
    's0304m.mul.xml':[
        ['मालुङ्क्यपुत्तो','मालुन्क्यपुत्तो',1], // 'māluṅkyaputto ==> mālunkyaputto'

        //fixed in version cst4 2022
        //[ 'अट्ठसतम्प्म्प्पि','अट्ठसतम्पि',1], // aṭṭhasatampmppi==>aṭṭhasatampi
        //[' तम्प्म्प्पि',' तम्पि',1],//Tampmppi==>tampi
    ],
    's0305m.mul.xml':[
        ['सकुणग्धि','सकुणग्घि',1]      //sakuṇagdhi ==> sakuṇagghi , typo see context
    ],
    's0402m2.mul.xml':[
        //fixed in version cst4 2022
        //['नेसोहमस्म्स्म्मि','नेसोहमस्मि',1],// Nesohamasmsmmi==> nesohamasmi //"an4.177:3.2": "‘Taṁ netaṁ mama, nesohamasmi, na meso attā’ti,
    ],
    's0402m3.mul.xml':[
        ['मालुङ्क्यपुत्तो','मालुन्क्यपुत्तो',1], // 'māluṅkyaputto ==> mālunkyaputto'
    ],
    's0403m3.mul.xml':[
        //fixed in version cst4 2022
        //['जब्मुदीपस्स','जम्बुदीपस्स',1], //Jabmudīpassa ==> Jambudīpassa in <note> , invalid combi , probably typo
    ],
    's0404m3.mul.xml':[
        //fixed in version cst4 2022
        //['ड्तण्हासुत्तं','तण्हासुत्तं',1], //ḍtaṇhāsuttaṃ , extra ḍ, "an10.62:0.3": "62. Taṇhāsutta ",
    ],
    's0504m.mul.xml':[/\u0903/g,';',6],
    's0508m.mul.xml':[
        ['मालुङ्क्यपुत्तो','मालुन्क्यपुत्तो',1], // māluṅkyaputto ==> mālunkyaputto'
        ['मालुङ्क्यो','मालुन्क्यो ',1], //     māluṅkyo ==> Mālunkyo
    ],
    's0510m1.mul.xml':[
        ['सिध्दिपत्ता','सिद्धिपत्ता',1],//Sidhdipattā==> Siddhipattā obvious typo
        ['परिवारेट्ति','परिवारेन्ति',1],//typo parivāreṭti  , "tha-ap401:7.4": "parivārenti maṁ sadā.",
    ],
    's0513m.mul.xml':[//jataka 
        ['अहम्सि','अहंसि',1], //ahamsi ==>ahaṃsi    'ms' rare combi
        ['रमस्स्वज्‍ज','रमस्सवज्ज',1]// Ramassvajja ==> Ramassavajja  , //  "ja519:9.4": "ramassvajja mayā saha.", did not fix

    ],
    's0515m.mul.xml':[//mnd
        [' प्वा',' वा',1],// pvā==>vā "mnd1:43.2"
    ],
    's0516m.mul.xml':[//cnd
        ['द्पणिधि','पणिधि',1] ,//dpaṇidhi==>paṇidhi "cnd5:13.2":
    ],
    's0517m.mul.xml':[//ps
        ['चक्खुव्त्त्ञ्‍ञाणं','चक्खुविञ्ञाणं',1],//Cakkhuvttññāṇaṃ "ps1.1:31.13": "Cakkhuviññāṇaṁ abhiññeyyaṁ;",
        ['पलाससन्ठरो','पलाससन्थरो',1],//palāsasanṭharo==>palāsasantharo
        ['पटिप्पस्स्द्धी','पटिप्पस्सद्धी',1],//paṭippassddhī==>paṭippassaddhī
    ],
    's0519m.mul.xml':[
        [/\u0903/g,';',1],
        ['भिक्खवेऋ','भिक्खवे',1],//extra R at the end
    ],
    'e0104n.att.xml':[ //att of vism vol2
        ['अचक्‍कबण्धोपि','अचक्कबन्धोपि',1],//Acakkabaṇdhopi==>Acakkabandhopi
        ['अनुगच्‍च्छन्तो','अनुगच्छन्तो',1], // anugaccchanto ==> anugacchanto
        ['सीलसमाधिपञ्मासङ्खातं','सीलसमाधिपञ्ञासङ्खातं',1],// sīlasamādhipañmāsaṅkhātaṃ==>Sīlasamādhipaññāsaṅkhātaṃ

    ],
/*
    's0513a1.att.xml':[
        [/<p rend="bodytext"> ([१२३४५६७८९१०]+)\./g,'<p rend="subhead">$1.',10], //錯誤的 rend
        [/<p rend="subhead">\[([१२३४५६७८९१०]+)\]/g,'<p rend="subhead">$1.',3], //多餘的 []
        [/<p rend="bodytext"> \[([१२३४५६७८९१०]+)\]/g,'<p rend="subhead">$1.',137], //多餘的 []

        //避免錯判為 vannana
        ['<p rend="subhead">१. दूरेनिदानकथा</p>','<p rend="subhead">(१) दूरेनिदानकथा</p>',1],
        ['<p rend="subhead">२. अविदूरेनिदानकथा</p>','<p rend="subhead">(२) अविदूरेनिदानकथा</p>',1],
        ['<p rend="subhead">३. सन्तिकेनिदानकथा</p>','<p rend="subhead">(३) सन्तिकेनिदानकथा</p>',1],
    ], 
*/
    'vin02m1.mul.xml':[
        // ['ण्वादिमोग्गल्‍लाने','वादिमोग्गल्‍लाने',1], //Ṇvādimoggallāne , extra  Ṇ at the begining 
    ],
    'vin02m2.mul.xml':[
        ['उत्तरज्तू','उत्तरतू',1], //uttarajtū => uttaratū , checked suttacentral, 出現兩次，第二次打錯
        ['जिनोब्र्वि','जिनोब्रवि',1],//Jinobrvi==>Jinobravi , bilara-data "pli-tv-kd9:7.20.235": "“adhamman”ti jinobravi.",
    ],
    'vin02m3.mul.xml':[
        ['इदमब्र्वि','इदमब्रवि',1], //Idamabrvi Idamabravi
        ['नच्सादेसि','नच्छादेसि',1],// Nacsādesi==>Nacchādesi,  typo , 6 occurence
    ],
    'vin02m4.mul.xml':[
        ['पप्णत्तियो ','पण्णत्तियो',1], //Papṇattiyo  ==> Paṇṇattiyo  , typo , 2 occurrence, see above sentence
    ]

}
const Errata={};
for (let fn in InvalidTransliteration) {
    if (!Errata[fn]) Errata[fn]=[];
    let arr=InvalidTransliteration[fn]||[];
    if (arr.length&&!Array.isArray(arr[0])) arr=[arr];
    Errata[fn]=Errata[fn].concat(arr);
}

export const getErrata=fn=>{
    if (!Errata[fn] || !Errata[fn].length) return null
    return Errata[fn];
}
