import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFanData from "../hooks/useFanData";
import CharacterCard from "../components/CharacterCard";

export default function Home(){

const navigate = useNavigate();
const { members } = useFanData();

const [search,setSearch] = useState("");

useEffect(()=>{

const userId = localStorage.getItem("user_id");

if(!userId){
navigate("/register");
}

},[]);

const filtered = members.filter(m =>
m.name.includes(search)
);

return(

<div style={{
minHeight:"100svh",
background:"#f6e9f2",
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
justifyContent:"space-between",
alignItems:"center",
marginBottom:12
}}>

<button onClick={()=>navigate(-1)}>
◀
</button>

<h2 style={{margin:0}}>
HOME
</h2>

<button>
≡
</button>

</div>

<div style={{
display:"flex",
justifyContent:"flex-end",
marginBottom:8,
fontSize:14
}}>
30p
</div>

<div style={{
display:"flex",
gap:10,
marginBottom:12
}}>

<button
style={{
flex:1,
height:34,
borderRadius:8
}}
onClick={()=>navigate("/pin")}
>
📍 ピン購入
</button>

<button
style={{
flex:1,
height:34,
borderRadius:8
}}
onClick={()=>navigate("/rank")}
>
⭐ ランキング
</button>

<button
style={{
flex:1,
height:34,
borderRadius:8
}}
onClick={()=>navigate("/cards")}
>
🃏 カード
</button>

</div>

<input
placeholder="メンバー検索"
value={search}
onChange={(e)=>setSearch(e.target.value)}
style={{
width:"100%",
height:30,
borderRadius:6,
border:"1px solid #ddd",
padding:"0 8px",
marginBottom:12,
fontSize:13
}}
/>

<div style={{
display:"flex",
flexDirection:"column",
gap:10
}}>

{filtered.map(member=>(
<CharacterCard
key={member.id}
character={member}
onClick={()=>navigate(`/chat/${member.id}`)}
/>
))}

</div>

</div>

</div>

);

}