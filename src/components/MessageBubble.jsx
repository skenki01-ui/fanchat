import React from "react";

export default function MessageBubble({ role, text }) {

  const isUser = role === "user";

  return (

    <div style={{
      display:"flex",
      justifyContent:isUser ? "flex-end" : "flex-start",
      marginBottom:"10px"
    }}>

      <div style={{
        background:isUser ? "#7db7ff" : "#ff8fb3",
        padding:"10px 14px",
        borderRadius:"14px",
        maxWidth:"70%",
        color:"#fff"
      }}>
        {text}
      </div>

    </div>

  );

}