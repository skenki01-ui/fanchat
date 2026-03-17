import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import characters from "../data/characters";
import MenuModal from "../components/MenuModal";

export default function Rank(){

const navigate = useNavigate();
const [menuOpen,setMenuOpen] = useState(false);

/* 仮ランキング */
const ranking = characters.map((m,i)=>({
...m,
rank:i+1,
move:i%3===0?"up":i%3===1?"down":"stay"
}));

return(

<div style={{
width:"375px",
margin:"0 auto",
background:"#ffeaf4",
minHeight:"100vh",
padding:"15px"
}}>

{/* HEADER */}

<div style={{
display:"flex",
alignItems:"center",
justifyContent:"space-between",
marginBottom:"15px"
}}>

<div
onClick={()=>navigate(-1)}
style={{cursor:"pointer"}}
>
←
</div>

<div style={{
fontSize:"20px",
fontWeight:"bold"
}}>
今週のメンバーランキング
</div>

<div
onClick={()=>setMenuOpen(true)}
style={{cursor:"pointer"}}
>
≡
</div>

</div>

{/* LIST */}

{ranking.map(m=>{

let medal="";
let bg="#fff";
let border="";

if(m.rank===1){
medal="👑";
bg="#fff5cc";
border="2px solid gold";
}

if(m.rank===2){
medal="🥈";
bg="#f0f0f0";
border="2px solid silver";
}

if(m.rank===3){
medal="🥉";
bg="#ffe8d6";
border="2px solid #cd7f32";
}

return(

<div
key={m.id}
onClick={()=>navigate(`/chat/${m.id}`)}
style={{
display:"flex",
alignItems:"center",
background:bg,
padding:"12px",
borderRadius:"12px",
marginBottom:"10px",
cursor:"pointer",
border:border,
boxShadow:"0 2px 4px rgba(0,0,0,0.08)"
}}
>

{/* RANK */}

<div style={{
width:"55px",
fontWeight:"bold",
fontSize:"18px"
}}>
{medal} {m.rank}
</div>

{/* IMAGE */}

<img
src={m.img}
style={{
width:"42px",
height:"42px",
borderRadius:"50%",
marginRight:"10px",
objectFit:"cover"
}}
/>

{/* INFO */}

<div style={{flex:1}}>

<div style={{fontWeight:"bold"}}>
{m.name}
</div>

<div style={{
fontSize:"12px",
color:"#777"
}}>
{m.line}
</div>

</div>

{/* MOVE */}

<div style={{
fontSize:"18px",
width:"30px",
textAlign:"right"
}}>

{m.move==="up" && "↑"}
{m.move==="down" && "↓"}
{m.move==="stay" && "→"}

</div>

</div>

)

})}

<MenuModal open={menuOpen} onClose={()=>setMenuOpen(false)} />

</div>

)

}