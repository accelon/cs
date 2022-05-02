const Untease={'s0101m.mul.xml':[
   ['puthusippāyatanāni- te','puthusippāyatanāni, te'],
 	['dana-parimaddana-bhedana-viddhaṃsana-dhammo','danaparimaddanabhedanaviddhaṃsanadhammo'],
 	['anupubbābhisaññānirodha-sampajāna-samāpatti','anupubbābhisaññānirodhasampajānasamāpatti',3],
 	['vivekajapītisukhasukhuma-saccasaññīyeva','vivekajapītisukhasukhumasaccasaññīyeva'],
 	['aniccucchādanaparimaddanabhedana-viddhaṃsanadhammo','aniccucchādanaparimaddanabhedanaviddhaṃsanadhammo'],
 	['puthusippāyatanāni-','puthusippāyatanāni –'],
 	['saddaṃ suṇātha-','saddaṃ suṇātha –'],
   ['nirodha-sampajāna-samāpatti','nirodhasampajānasamāpatti'],


 ],
 's0102m.mul.xml':[
 	['kusalākusalasāvajjānavajjasevitabbāsevitabbahīna-','kusalākusalasāvajjānavajjasevitabbāsevitabbahīna – '],
 ],
 's0201m.mul.xml':[
 ['jighacchādubbalya-','jighacchādubbalya – '],
 ['sandiṭṭhiparāmāsi-ādhānaggāhi-duppaṭinissaggissa','sandiṭṭhiparāmāsiādhānaggāhiduppaṭinissaggissa',3],
 ['asandiṭṭhiparāmāsianādhānaggāhi-suppaṭinissaggitā','asandiṭṭhiparāmāsianādhānaggāhisuppaṭinissaggitā',2],
 ['daṇḍādāna-satthādāna-kalaha-viggaha-vivāda-tuvaṃtuvaṃ-pesuñña-musāvādānaṃ','daṇḍādānasatthādānakalahaviggahavivādatuvaṃtuvaṃpesuññamusāvādānaṃ',2],
 ['aniccucchādana-parimaddanabhedana-viddhaṃsana-dhammassa','aniccucchādanaparimaddanabhedanaviddhaṃsanadhammassa'],
 ['ukkoṭanavañcana-nikati-sāciyogā','ukkoṭanavañcananikatisāciyogā'],
 ['chedana-vadhabandhanaviparāmosa-ālopa-sahasākārā','chedanavadhabandhanaviparāmosaālopasahasākārā'],
 ],
  's0202m.mul.xml':[
['daṇḍādāna-satthādāna-kalaha-viggaha-vivāda-tuvaṃtuvaṃ-pesuñña-musāvādā','daṇḍādānasatthādānakalahaviggahavivādatuvaṃtuvaṃpesuññamusāvādā'],
['kuñjara-rāhula-sassataloko','kuñjararāhulasassataloko'],
['bhaddāli-nāmo','bhaddālināmo'],
['khudda-dijātha-sahampatiyācaṃ','khuddadijāthasahampatiyācaṃ'],
['nāḷaka-raññikiṭāgirināmo','nāḷakaraññikiṭāgirināmo'],
['puṇḍarī-aggisaha-kathināmo','puṇḍarīaggisahakathināmo'],
 ]

//search pattern  [^\d<>’]-[^<>\d] for all s*.mul.xml not done
 ],
 's0203m.mul.xml':[
     ['cīvarapiṇḍapātasenāsanagilā- nappaccayabhesajjaparikkhārānuppadānena','cīvarapiṇḍapātasenāsanagilānappaccayabhesajjaparikkhārānuppadānena',4]
 ],
}

 export const getUntease=fn=>{
    if (!Untease[fn] || !Untease[fn].length) return null
    return Untease[fn];
}