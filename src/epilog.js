/*export default function(buf,ctx){
    buf=buf
        // .replace(/ rend="/g,' class="')
        .replace(/<pb .+?\/>/g,'')
        .replace(/‘‘/g,'“')
        .replace(/’’/g,'”')
        .replace(/<p> /g,'<p>')


    return buf;
}
*/
const AK={
//    'pj':'^ak#sv(suttavibhaṅga)',
//    'mv':'^ak#mv(khandhaka)',
//    'pvr':'^ak#pvr(parivara)',
   'dn1':'^ak#dn(dIIG)',
   'mn1':'^ak#mn(mjVJIm)',
   'sn1':'^ak#sn(sMyUtVt)',
   'an1':'^ak#an(aNVGUtVtr)',
//    'kd':'^ak#kn(khuddaka)',
//    'ds':'^ak#abh(abhidhamma)',
//    'pt':'^ak#pt(paṭṭhāna)',
}
const prependAK=(buf,bkid)=>{
    const ak=AK[bkid]||'';
    return ak+buf;
}

export const addEpilog=(buf,ctx)=>{
    if (ctx.bkid==='vs' || ctx.bkid==='vs0a') {
        buf=buf.replace('\n^n1 ','\n').replace('^bk#vs','^ak#vs(vIsUdVDImgVg)^bk#vs');//redundent
    }
    return prependAK(buf,ctx.bkid);
}