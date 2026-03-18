import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFanData from "../hooks/useFanData";
import CharacterCard from "../components/CharacterCard";

export default function Home() {
  const navigate = useNavigate();
  const { members } = useFanData();

  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  // 課金
  const pay = async () => {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST"
      });

      const data = await res.json();
      console.log(data);
      alert("課金テスト成功");
    } catch (err) {
      alert("課金失敗");
      console.error(err);
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      navigate("/register");
    }
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12,
            position: "relative",
            zIndex: 10000
          }}
        >
          <button onClick={() => navigate(-1)}>◀</button>

          <h2 style={{ margin: 0 }}>HOME</h2>

          <button
            onClick={() => {
              console.log("menu click");
              setMenuOpen(true);
            }}
            style={{
              padding: "6px 10px",
              cursor: "pointer",
              zIndex: 10001,
              position: "relative"
            }}
          >
            ≡
          </button>
        </div>

        {/* ポイント */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: 8,
            fontSize: 14
          }}
        >
          30p
        </div>

        {/* メニュー系 */}
        <div
          style={{
            display: "flex",
            gap: 10,
            marginBottom: 12
          }}
        >
          <button
            style={{ flex: 1, height: 34, borderRadius: 8 }}
            onClick={() => navigate("/pin")}
          >
            📍 ピン購入
          </button>

          <button
            style={{ flex: 1, height: 34, borderRadius: 8 }}
            onClick={() => navigate("/rank")}
          >
            ⭐ ランキング
          </button>

          <button
            style={{ flex: 1, height: 34, borderRadius: 8 }}
            onClick={() => navigate("/cards")}
          >
            🃏 カード
          </button>
        </div>

        {/* 検索 */}
        <input
          placeholder="メンバー検索"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            height: 30,
            borderRadius: 6,
            border: "1px solid #ddd",
            padding: "0 8px",
            marginBottom: 12,
            fontSize: 13
          }}
        />

        {/* 一覧 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10
          }}
        >
          {filtered.map((member) => (
            <CharacterCard
              key={member.id}
              character={member}
              onClick={() => navigate(`/chat/${member.id}`)}
            />
          ))}
        </div>
      </div>

      {/* メニュー */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 99999
          }}
          onClick={() => setMenuOpen(false)}
        >
          <div
            style={{
              width: 300,
              background: "#fff",
              borderRadius: 12,
              padding: 16,
              zIndex: 100000,
              position: "relative"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>メニュー</h3>

            <button
              onClick={pay}
              style={{
                width: "100%",
                height: 40,
                marginTop: 10,
                background: "#ff4da6",
                color: "#fff",
                border: "none",
                borderRadius: 8
              }}
            >
              💰 課金テスト（500円）
            </button>

            <button
              onClick={() => setMenuOpen(false)}
              style={{
                width: "100%",
                height: 40,
                marginTop: 10
              }}
            >
              閉じる
            </button>
          </div>
        </div>
      )}
    </div>
  );
}