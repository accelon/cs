export const getMAT=bkid=>{
    const m=bkid.match(/\d([atu])\d?/);
    return m?({a:1,t:2,u:3}[m[1]]||0):0;
}