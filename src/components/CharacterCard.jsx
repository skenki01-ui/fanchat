import React from "react";

export default function CharacterCard({ character, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        background: "#fff",
        borderRadius: 12,
        padding: 12,
        cursor: "pointer",
        position: "relative",
        zIndex: 0   // ←これ追加
      }}
    >
      <img
        src={character.img}
        alt={character.name}
        style={{
          width: 46,
          height: 46,
          borderRadius: 10,
          objectFit: "cover"
        }}
      />

      <div>
        <div
          style={{
            fontWeight: "bold",
            fontSize: 15
          }}
        >
          {character.name}
        </div>

        <div
          style={{
            fontSize: 13,
            opacity: 0.7
          }}
        >
          {character.line}
        </div>
      </div>
    </div>
  );
}