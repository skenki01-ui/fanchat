import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFanData from "../hooks/useFanData";
import CharacterCard from "../components/CharacterCard";

export default function Home() {
  const navigate = useNavigate();
  const { members } = useFanData();

  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const pay = async () => {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST"
      });
      const data = await res.json();
      alert("課金テスト成功");
    } catch {
      alert("課金失敗");
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (!userId) navigate("/register");
  }, [navigate]);

  const filtered = members.filter((m) =>
    m.name.includes(search)
  );

  return (
    <div
      style={{
        minHeight: "100svh",
        background: "#f6e9f2",
        display: "flex",
        justifyContent: "center",
        paddingTop: 20
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          padding: 16
        }}
      >
        {/* ヘッダー */}
        <div style={{ position: "relative", height: 40 }}>
          <div
            onClick={() => navigate(-1)}
            style={{
              position: "absolute",
              left: 0,
              width: 40,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer"
            }}
          >
            ◀
          </div>

          <div style={{ textAlign: "center", lineHeight: "40px" }}>
            HOME
          </div>

          {/* 🔥ここが本体 */}
          <div
            onClick={() => {
              console.log("押された");
              setMenuOpen(true);
            }}
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              width: 40,
              height: 40,
              background: "red", // ←見えるように
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 999999,
              pointerEvents: "auto", // ←これ重要
              cursor: "pointer"
            }}
          >
            ≡
          </div>
        </div>

        <div style={{ textAlign: "right", marginBottom: 8 }}>
          30p
        </div>

        <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
          <button onClick={() => navigate("/pin")}>📍</button>
          <button onClick={() => navigate("/rank")}>⭐</button>
          <button onClick={() => navigate("/cards")}>🃏</button>
        </div>

        <input
          placeholder="検索"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div>
          {filtered.map((m) => (
            <CharacterCard
              key={m.id}
              character={m}
              onClick={() => navigate(`/chat/${m.id}`)}
            />
          ))}
        </div>
      </div>

      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)"
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              padding: 20,
              margin: "100px auto",
              width: 300
            }}
          >
            <button onClick={pay}>課金</button>
          </div>
        </div>
      )}
    </div>
  );
}