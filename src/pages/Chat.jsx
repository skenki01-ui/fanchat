import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import characters from "../data/characters";
import { drawCard } from "../logic/cardLogic.jsx";
import MenuModal from "../components/MenuModal";
import { supabase } from "../lib/supabase";

export default function Chat(){

const { id } = useParams();
const navigate = useNavigate();

const character = characters.find(c => c.id === id?.toLowerCase());

const [menuOpen,setMenuOpen] = useState(false);
const [messages,setMessages] = useState([]);
const [input,setInput] = useState("");
const [turn,setTurn] = useState(3);
const [points,setPoints] = useState(0);
const [isPinned,setIsPinned] = useState(false);

const bottomRef = useRef(null);

const userId = localStorage.getItem("user_id");
const userName = localStorage.getItem("name") || "ねえ";

if(!character){
return <div style={{padding:"20px"}}>キャラが見つかりません</div>;
}

useEffect(()=>{
loadMessages();
loadPoints();
checkPin();
},[]);


// ⭐ピン判定
function checkPin(){

const pins = JSON.parse(localStorage.getItem("pins") || "{}");

const now = Date.now();

const expire = pins[character.id];

if(expire && expire > now){
setIsPinned(true);
}else{
setIsPinned(false);
}

}


// ⭐ピン購入（←追加済み）
function buyPin(){

const pins = JSON.parse(localStorage.getItem("pins") || "{}");

const expire = Date.now() + (24 * 60 * 60 * 1000);

pins[character.id] = expire;

localStorage.setItem("pins", JSON.stringify(pins));

setIsPinned(true);

alert("ピン設定完了！");
}


// ⭐ポイント取得
async function loadPoints(){

const { data } = await supabase
.from("users")
.select("points")
.eq("id",userId)
.single();

if(data){
setPoints(data.points);
}

}


// ⭐ポイント更新
async function updatePoints(newPoints){

setPoints(newPoints);

await supabase
.from("users")
.update({points:newPoints})
.eq("id",userId);

}


// ⭐メッセージ取得
async function loadMessages(){

const { data } = await supabase
.from("messages")
.select("*")
.eq("character_id",character.id)
.eq("user_id",userId)
.order("created_at",{ascending:true});

if(data){

const formatted = data.map(m=>({
role:m.role === "user" ? "user" : "ai",
text:m.content
}));

setMessages(formatted);

}

}


// ⭐自動スクロール
useEffect(()=>{
bottomRef.current?.scrollIntoView({behavior:"smooth"});
},[messages]);


// ⭐送信
async function send(){

if(!input.trim()) return;

if(!isPinned){
alert("ピンが必要です");
return;
}

if(turn === 0){
alert("ターンがありません");
return;
}

if(points < 5){
alert("ポイントが足りません");
return;
}

const newPoints = points - 5;
await updatePoints(newPoints);

const currentInput = input;

const userMsg = {role:"user",text:currentInput};

setMessages(prev => [...prev,userMsg]);

setInput("");

setTurn(t => t - 1);

await supabase
.from("messages")
.insert({
user_id:userId,
character_id:character.id,
role:"user",
content:currentInput
});

setTimeout(async ()=>{

let aiText;

if(isPinned){
aiText = `${userName}と話せて嬉しい`;
}else{
aiText = "そうなんだ。";
}

setMessages(prev => [
...prev,
{role:"ai",text:aiText}
]);

await supabase
.from("messages")
.insert({
user_id:userId,
character_id:character.id,
role:"ai",
content:aiText
});

},1200);

}


// ⭐ターン購入
function addTurn(){

if(points < 5){
alert("ポイント不足");
return;
}

const newPoints = points - 5;

updatePoints(newPoints);

setTurn(t => t + 1);

}


// ⭐ギフト
async function gift(price){

if(points < price){
alert("ポイント不足");
return;
}

const newPoints = points - price;

await updatePoints(newPoints);

const card = drawCard(character.id);

await supabase
.from("cards")
.insert({
user_id:userId,
character_id:character.id,
card_no:card
});

setMessages(prev => [
...prev,
{role:"ai",text:"ありがとう♡"},
{role:"ai",text:`${character.name}カード ${card} を獲得！`}
]);

}


function vip(){
alert("VIPメッセージ送信");
}


return(

<div style={{
width:"375px",
margin:"0 auto",
height:"100vh",
display:"flex",
flexDirection:"column",
background:"#ffeaf4"
}}>

{/* HEADER */}

<div style={{
display:"flex",
alignItems:"center",
justifyContent:"space-between",
padding:"10px",
background:"#fff",
borderBottom:"1px solid #eee"
}}>

<div onClick={()=>navigate("/home")} style={{cursor:"pointer"}}>
◀︎
</div>

<div style={{display:"flex",alignItems:"center"}}>

<img src={character.img} style={{
width:"30px",
height:"30px",
borderRadius:"50%",
marginRight:"8px"
}}/>

<div>{character.name}</div>

</div>

<div style={{display:"flex",alignItems:"center",gap:"8px"}}>

<div onClick={()=>setMenuOpen(true)} style={{cursor:"pointer"}}>
残{turn}｜{points}p ☰
</div>

{!isPinned && (
<button
onClick={buyPin}
style={{
padding:"4px 10px",
background:"#ff4da6",
color:"#fff",
border:"none",
borderRadius:"8px"
}}
>
📍ピン
</button>
)}

</div>

</div>


{/* MESSAGE */}

<div style={{
flex:1,
overflow:"auto",
padding:"10px"
}}>

{messages.map((m,i)=>(

<div key={i} style={{
display:"flex",
marginBottom:"10px",
justifyContent:m.role==="user"?"flex-end":"flex-start"
}}>

{m.role==="ai" && (
<img src={character.img} style={{
width:"28px",
height:"28px",
borderRadius:"50%",
marginRight:"8px"
}}/>
)}

<div style={{
background:m.role==="user"?"#0066ff":"#fff",
color:m.role==="user"?"#fff":"#000",
padding:"10px",
borderRadius:"10px",
maxWidth:"70%"
}}>
{m.text}
</div>

</div>

))}

<div ref={bottomRef}></div>

</div>


{/* TURN購入 */}

{turn === 0 && (

<div style={{
padding:"10px",
textAlign:"center",
background:"#fff"
}}>

<button onClick={addTurn} style={{
padding:"8px 20px",
background:"#ffa64d",
border:"none",
borderRadius:"10px",
color:"#fff"
}}>
+1ターン 5p
</button>

</div>

)}


{/* INPUT */}

<div style={{
display:"flex",
padding:"10px",
background:"#fff"
}}>

<input
value={input}
onChange={e=>setInput(e.target.value)}
style={{
flex:1,
padding:"10px",
borderRadius:"10px",
border:"1px solid #ccc"
}}
/>

<button onClick={send} style={{marginLeft:"10px"}}>
送信
</button>

</div>


{/* GIFT */}

<div style={{
display:"flex",
justifyContent:"space-around",
padding:"10px",
background:"#fff",
borderTop:"1px solid #eee"
}}>

<button onClick={()=>gift(100)}>🌸100</button>
<button onClick={()=>gift(500)}>🎁500</button>
<button onClick={()=>gift(1000)}>💎1000</button>
<button onClick={vip}>⭐VIP</button>

</div>

<MenuModal open={menuOpen} onClose={()=>setMenuOpen(false)} />

</div>

);

}