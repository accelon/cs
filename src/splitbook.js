const TEIFooter=+'</body>\n<back></back>\n</text>\n</TEI.2>';
export const splitBook=(fn,buf)=>{
    if (fn=='abh07t.nrf.xml') {
        const at1=buf.indexOf('<p rend="book">');//second book
        const at2=buf.indexOf('<p rend="book">',at1+1);//second book
        const TEIHeader=buf.slice(0,at1);
        return [    
            ['abh07t.nrf.xml',buf.slice(0,at2)+TEIFooter],
            ['abh07t1.nrf.xml',TEIHeader+buf.slice(at2)]
        ]
    } else if (fn=='vin02t.tik.xml') { //四合一 對齊 vin02m1~4 , vin02a1~4
        const at1=buf.indexOf('<p rend="centre">॥');
        const at2=buf.indexOf('<p rend="centre">॥',at1+1);
        const at3=buf.indexOf('<p rend="centre">॥',at2+1);
        const at4=buf.indexOf('<p rend="centre">॥',at3+1);
        const TEIHeader=buf.slice(0,at1);
        return [
            ['vin02t1.tik.xml', buf.slice(0,at2)+TEIFooter],
            ['vin02t2.tik.xml', TEIHeader+buf.slice(at2,at3)+TEIFooter],
            ['vin02t3.tik.xml', TEIHeader+buf.slice(at3,at4)+TEIFooter],
            ['vin02t4.tik.xml', TEIHeader+buf.slice(at4)],
        ]

    } else {
        return [[fn,buf]];
    }
}