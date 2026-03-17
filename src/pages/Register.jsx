import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function Register(){

const [name,setName] = useState("");
const navigate = useNavigate();

const start = async () => {

if(!name.trim()){
alert("ニックネーム入れて");
return;
}

const userId = crypto.randomUUID();

// ブラウザ保存
localStorage.setItem("name",name);
localStorage.setItem("user_id",userId);

// usersテーブルに保存（なければ作る）
await supabase
.from("users")
.upsert({
id: userId,
nickname: name,
points: 100
});

navigate("/home");

};

return(

<div style={{
height:"100vh",
display:"flex",
justifyContent:"center",
alignItems:"center",
background:"#ffeaf4"
}}>

<div style={{textAlign:"center"}}>

<h1>OSHIPIN</h1>

<p style={{marginBottom:"20px"}}>
推しとDMするアプリ
</p>

<input
placeholder="ニックネーム"
value={name}
onChange={(e)=>setName(e.target.value)}
style={{
padding:"10px",
borderRadius:"10px",
border:"1px solid #ccc",
width:"200px"
}}
/>

<br/>

<button
type="button"
onClick={start}
style={{
marginTop:"20px",
padding:"10px 40px",
background:"#ff4fa3",
border:"none",
color:"#fff",
borderRadius:"10px",
cursor:"pointer"
}}
>
はじめる
</button>

</div>

</div>

);

}