# Chaṭṭha Saṅgāyana Tipitaka in htm format based on VRI cst 2020

## prerequisite

Download cst4-2020 (tested on cst4-2020-05-07-4.0.0.15.msi) from tipitaka.org, install it and make a junction or symbolic link Xml to /Cst4/Xml

copy ProvidentPaliSegoe.otf from github.com/dhamma/provident-pali/www/

## Build steps
    cd src
    
### Create various indic script from cst4 devanagari TEI, see ro/README.md
    node conv [filepat]
    // filepat support DOS style wildcard , ? for single char, * for one or more char(except . )
    // regular expression [charset] and $ (match end of string) are also supported

### Fix markup and typo of romanized TEI, output to ./books
    node tidy [filepat]

### Generate offtext from ./books
    node gen


### 分句
  先在 sc 用 gen-pli 建立 pli 的off 檔
  
  node gen dn1 p                                //產生一段一行的off (不依 pinpos/dn1.txt 分句)
  node align-sent dn1 folder                    //預設以 sc\pli\ 下同名檔案分句
  pitaka compare off\dn1.off ..\sc\pli\dn1.off  //比較 sc 版和 cs 版之差異，可能需要手工修正直到滿意
  node pinpos dn1                               //產生 dn1.txt 的分句檔，須git 。
  node gen dn1                                  //重新產生分句檔 (依pinpos/dn1.txt分句)

  往後如果與 sc 脫勾，手動修改 off\dn1 之後，
  node poinpos dn1
  保存改動過的 dn1.txt (約原文的4%~5%)

### 經文修改
   MN1.120~135 刪除，MN1.119 改為MN1.119-135

## 定址方式



### 精準定位 (locator)

    cs:冊.段號:行 ，例  cs:mn1.272:2   中部第一冊第272段，往下兩行，0可省略。
    冊的標記是 ^bk ，段號是 ^n ，行不必標記，以文字檔的換行。
    標題與首行本文合並一行，這樣標題就不會歸入上一段。(sc 的解法是設置第0號)
    "dn11:0.1": "Dīgha Nikāya 11 " (第11經) , "dn11:0.2": "Kevaṭṭasutta " (經題),  "dn11:1.1": "Evaṁ me sutaṁ—",(首行本文)
    
    我們的標記方式是
    ^c#d11[Kevaṭṭasutta]^n272 Evaṁ me sutaṁ—

    
### 瀏閱分卷 (cluster)

    ^c 定義分卷，即網頁捲動的的範圍，長部及中部一經一卷，相經部及增支部一個vagga一卷，約十經左右。
    清淨道論一章一卷。

### 標題列表 (header)
    標題清單可以各種方式過濾，如文字內容、關鍵字、限定全文檢索範圍。
    對cs 而言，一個cluster 即為一標題，
    對大正藏而言，每經為一標題，因為卷只有數字，出現在清單無意義。
    
### 跨卷結構
    複雜的內容相關結構，如大智度論，以 ^mulu 標記。
    
## 書名代碼    
    pj, pc,  mv, cv, pvr,
    dn, mn, sn, an, kv, pt
    
## cluster 代碼
    以 [數字,26進位,數字...] 表達多增結構
    
    d, 一層  m 長部經, 中部經
    s  兩層  第n相應   s56a  第56相應第一品
    a  兩層  第n支
    j  一層  第n本生
