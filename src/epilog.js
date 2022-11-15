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
   'pj':'^ak#sv(suttavibhaṅga)',
   'mv':'^ak#mv(khandhaka)',
   'pvr':'^ak#pvr(parivara)',
   'dn1':'^ak#dn(dīgha)',
   'mn1':'^ak#mn(majjhima)',
   'sn1':'^ak#sn(saṃyutta)',
   'an1':'^ak#an(aṅguttara)',
   'kd':'^ak#kn(khuddaka)',
   'ds':'^ak#abh(abhidhamma)',
   'pt':'^ak#pt(paṭṭhāna)',
}
const prependAK=(buf,bkid)=>{
    const ak=AK[bkid]||'';
    return ak+buf;
}

export const epilog=(buf,bkid)=>{
    if (bkid==='vs' || bkid==='vs0a') {
        buf=buf.replace('\n^n1 ','\n^n ');
    }
    return prependAK(buf,bkid);
}