import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import characters from "../data/characters";

export default function Pin(){

const navigate = useNavigate();
const [search,setSearch] = useState("");

const filtered = characters.filter(c =>
c.name.includes(search)
);

function addPin(id){

// 配列で統一
const pins = JSON.parse(localStorage.getItem("pins") || "[]");

if(!pins.includes(id)){
pins.push(id);
localStorage.setItem("pins", JSON.stringify(pins));
}

navigate(`/chat/${id}`);

}

return(

<div style={{
minHeight:"100vh",
background:"#ffeaf4",
display:"flex",
justifyContent:"center",
paddingTop:20
}}>

<div style={{
width:"100%",
maxWidth:420,
padding:16
}}>

<div style={{
display:"flex",
alignItems:"center",
marginBottom:"20px"
}}>

<button onClick={()=>navigate("/home")}>◀</button>
<h2 style={{marginLeft:"10px"}}>ピン購入</h2>

</div>

<input
placeholder="キャラ検索"
value={search}
onChange={(e)=>setSearch(e.target.value)}
style={{
width:"100%",
padding:"10px",
borderRadius:"10px",
border:"1px solid #ccc",
marginBottom:"20px"
}}
/>

<div style={{
display:"flex",
flexDirection:"column",
gap:"10px"
}}>

{filtered.map(c=>(

<div key={c.id} style={{
display:"flex",
alignItems:"center",
justifyContent:"space-between",
border:"1px solid #eee",
borderRadius:"10px",
padding:"10px",
background:"#fff"
}}>

<div style={{display:"flex",alignItems:"center"}}>

<img src={c.img} style={{
width:"40px",
height:"40px",
borderRadius:"50%",
marginRight:"10px"
}}/>

<div>
<div>{c.name}</div>
<div style={{fontSize:"12px",color:"#666"}}>
{c.line}
</div>
</div>

</div>

<button onClick={()=>addPin(c.id)} style={{
padding:"6px 12px",
borderRadius:"8px",
border:"none",
background:"#ff69b4",
color:"#fff"
}}>
ピン
</button>

</div>

))}

</div>

</div>

</div>

);
}