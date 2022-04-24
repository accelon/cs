const Untease={'s0101m.mul.xml':[
 	['dana-parimaddana-bhedana-viddhaṃsana-dhammo','danaparimaddanabhedanaviddhaṃsanadhammo'],
 	['anupubbābhisaññānirodha-sampajāna-samāpatti','anupubbābhisaññānirodhasampajānasamāpatti',3],
 	['vivekajapītisukhasukhuma-saccasaññīyeva','vivekajapītisukhasukhumasaccasaññīyeva'],
 	['aniccucchādanaparimaddanabhedana-viddhaṃsanadhammo','aniccucchādanaparimaddanabhedanaviddhaṃsanadhammo'],
 	['puthusippāyatanāni-','puthusippāyatanāni –'],
 	['saddaṃ suṇātha-','saddaṃ suṇātha –']
 ],
 's0102m.mul.xml':[
 	['kusalākusalasāvajjānavajjasevitabbāsevitabbahīna-','kusalākusalasāvajjānavajjasevitabbāsevitabbahīna – '],
 ]
}

 export const getUntease=fn=>{
    if (!Untease[fn] || !Untease[fn].length) return null
    return Untease[fn];
}
