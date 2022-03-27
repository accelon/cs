# Chaṭṭha Saṅgāyana Tipitaka in offtext format

## prerequisite

Download cst4-2020 (tested on cst4-2020-05-07-4.0.0.15.msi) from tipitaka.org, install it and make a junction or symbolic link Xml to /Cst4/Xml

copy ProvidentPaliSegoe.otf from github.com/dhamma/provident-pali/www/

install pitaka CLI https://github.com/accelon/pitaka

## Build steps
    
### Romanized cst4 devanagari TEI, output to ./ro see ro/README.md 
將 cst4 天城體改為羅馬轉寫，修正天城體明顯錯字不合理的拼字組合 (見 src/cst4-errata.js )。

    node conv-ro [cst_filepat]
    // filepat support DOS style wildcard , ? for single char, * for one or more char(except . )
    // regular expression [charset] and $ (match end of string) are also supported


### Fix markup and typo of romanized TEI, create ./books/*.xml with new name
修正標記錯誤 (見  src/ro-errata.js) ，或配合 sc 版做一些修改。去除多餘空行，並改檔名。

    node tidy [cst_filepat]

    原則上一個CST4/*.xml 產生一個 books/*.xml ，
    如 s0101m.mul.xml 產生 books/dn1.xml ，s0101a.att.xml 產生 books/dn1a.xml (義注)
    目前有以下例外：

    攝阿毘達磨義論，abh07t.xml 會產生 aas.xml及 aas0a.xml(注釋) 兩個檔。因為abh07t.xml是兩本書合輯。
    e0101n.nrf.xml e0102n.nrf.xml  合併為 vs.xml   (清淨道論)
    e0103n.nrf.xml e0104n.nrf.xml  合併為 vs0a.xml (清淨道論注)


### Generate offtext from ./books, sentence break guided by ./brk output to ./off
從books/*.xml 產生 offtext 格式，讀取 books/ 及 brk/ 相應文件，產生分句文件。
將異讀（內嵌注釋）從正文剝離

    node gen [filepat]

    node gen dn1                   // 從 books/dn1.xml brk/dn1.txt 產生 off/dn1.cs.txt

filepat 必須是新的檔名，vri 檔名轉書名代碼 見 src/newname.js (原則上與 suttacentral 一致，除了發趣論pt)

巴利文編碼方式 Pali transliternation scheme : https://github.com/dhamma/provident-pali

### steps
    
    node conv-ro         //convert all cst file
    node conv-ro s010?m  //convert s0101m s0102m s0103m (DN1,DN2,DN3)

    node tidy s0101?m    // output books/dn1.xml books/dn2.xml books/dn3.xml

    node gen dn          // output off/dn1.cs.off , off/dn2.cs.off off/dn3.cs.off
    node gen dn1         // output off/dn1.cs.off only

### 不分句

    node gen dn1 p       // output par/dn1.cs.off , no sentence break

### 轉為 IAST 格式 (覆蓋原檔)

    pitaka provident off\dn1.cs.txt    

### 分句 (進階操作)
  先在 sc 用 gen-pli 建立 pli 的off 檔
  
  node gen dn1 p                               //產生一段一行的off, 輸出到 ./par (不依 brk /dn1.txt 分句)
  node align-sent dn1 folder                   //以 ../sc/pli 下同名檔案分句
  pitaka compare off\dn1.off ..\sc\pli\dn1.off //比較 sc 版和 cs 版之差異，可能需要手工修正直到滿意
  pitaka pin dn1                               //產生 dn1.txt 的分句檔，須git 。
  node gen dn1                                 //重新產生分句檔 (依pinpos/dn1.txt分句)

  往後如果與 sc 脫勾，手動修改 off/dn1 之後，
  pitaka pin dn1
  保存改動過的 dn1.txt (約原文的4%~5%)

### 經文修改
   MN1.120~135 刪除，MN1.119 改為MN1.119-135


### 定位方式 (locator)

    cs:冊.段號:行 ，例  cs:mn1.272:2   中部第一冊第272段，往下兩行，0可省略。
    冊的標記是 ^bk ，段號是 ^n ，行不必標記，以文字檔的換行。
    標題與首行本文合並一行，這樣標題就不會歸入上一段。(sc 的解法是設置第0號)
    "dn11:0.1": "Dīgha Nikāya 11 " (第11經) , "dn11:0.2": "Kevaṭṭasutta " (經題),  "dn11:1.1": "Evaṁ me sutaṁ—",(首行本文)
    
    我們的標記方式是
    ^ck#d11[Kevaṭṭasutta]^n272 Evaṁ me sutaṁ—
    
    標記格式見 https://github.com/accelon/pitaka/ 


### 標記說明

標記樣版定義在 accelon/pitaka/format/cs.js

bk 所在行必須有 ck，ck 所在行必須有帶號 n，每一行 ^n 之前的文字為視為標題。

例：off/dn1.cs.off

    The Great Discourse on the Harvest of Deeds1. On Past Lives ^bk#dn2^ck#d14^n1 So I have heard. 
    
dn2 表示長部第二冊，^n1 後是經文正文，之前是標題，ck d14 表示長部第14經，

off/dn2.cs.off

    The Longer Discourse on Mindfulness Meditation ^ck#d22^n372 So I have heard. 

大念住經 長部22經，緬甸版段號 372

## 經文對齊
   以下數據庫將會與 cs 逐句對齊

* sc [Sutta Central，已完成](https://github.com/accelon/sc)
* hz [杭州佛學院及北大譯文，長部完成逐句](https://github.com/accelon/sutta-mobi)
* ccc [莊春江，段對齊](https://github.com/accelon/ccc)
* cb-n [元亨寺漢譯，段對齊](https://github.com/accelon/cb-n)
* bb [菩提比丘，部份段對齊](https://github.com/accelon/bb)
* cl [志蓮淨苑蕭式球，未對齊](https://github.com/accelon/cl)
* cs-zh [其他作者之巴利藏漢譯，逐句對齊](https://github.com/accelon/cs-zh)
* cs-en [其他作者之巴利藏英譯，逐句對齊](https://github.com/accelon/cs-en)
* cs-mm [緬譯巴利藏，段對齊](https://github.com/accelon/cs-mm)
   

## 前端程式
   
   https://github.com/accelon/accelon2021



## 工作目錄說明
   
   pitaka.json 設置文件，定義pitaka的名稱，格式等metadata

   doc/paranum  mula , att, tik 的對應關係

###  cs/cs    (不git)
    
    accelon2021 讀取的數據庫文件 (pitaka 格式)
    json 格式, 001.js , 002.js 。
    
    mklink/j 到 accelon2021/public
    
    輸出路徑由pitaka.json 的name欄位決定。

###  cs/off   (不git)

    pitaka 數據庫的源文字檔。使用 offtext 標記格式。

###  cs/brk   (要git)
    
    記錄引導斷句的位息，一經段一行，pin 以tab隔開。
    未來 vri 如果修改經文，重新node gen 即可。

