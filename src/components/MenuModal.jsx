import React from "react";

export default function MenuModal({ open, onClose }) {

if(!open) return null;

return(

<div style={{
position:"fixed",
top:0,
left:0,
width:"100%",
height:"100%",
background:"rgba(0,0,0,0.4)",
display:"flex",
justifyContent:"center",
alignItems:"center",
zIndex:1000
}}>

<div style={{
width:"340px",
background:"#fff",
borderRadius:"14px",
padding:"20px"
}}>

{/* TITLE */}

<div style={{
fontWeight:"bold",
fontSize:"18px",
marginBottom:"15px"
}}>
≡ メニュー
</div>

{/* POINT */}

<div style={{
marginBottom:"18px"
}}>

<div style={{fontWeight:"bold"}}>
ポイント
</div>

<div style={{fontSize:"13px",color:"#666",marginTop:"6px"}}>
1p = 10円
</div>

<div style={{
marginTop:"10px",
fontSize:"14px",
lineHeight:"1.8"
}}>
100円 = 10p<br/>
500円 = 50p<br/>
1000円 = 100p<br/>
3000円 = 300p<br/>
5000円 = 500p<br/>
10000円 = 1000p
</div>

</div>

{/* SUB */}

<div style={{
marginBottom:"18px"
}}>

<div style={{fontWeight:"bold"}}>
サブスク
</div>

<div style={{
marginTop:"6px",
fontSize:"14px"
}}>
月額 2000円
</div>

</div>

{/* ABOUT */}

<div style={{
marginBottom:"20px"
}}>

<div style={{fontWeight:"bold"}}>
このアプリについて
</div>

<div style={{
fontSize:"13px",
color:"#666",
marginTop:"6px",
lineHeight:"1.6"
}}>
FanChatはキャラクターとチャットを楽しんだり  
ギフトやカードを集めながら  
ランキングを楽しめるアプリです。
</div>

</div>

{/* CLOSE */}

<button
onClick={onClose}
style={{
width:"100%",
height:"38px",
borderRadius:"8px",
border:"none",
background:"#f1f1f1",
cursor:"pointer"
}}
>
閉じる
</button>

</div>

</div>

);

}
