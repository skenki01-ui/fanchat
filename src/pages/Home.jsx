import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFanData from "../hooks/useFanData";
import CharacterCard from "../components/CharacterCard";

export default function Home() {
  const navigate = useNavigate();
  const { members } = useFanData();

  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [points, setPoints] = useState(0);

  // 初回ポイントセット
  useEffect(() => {
    let p = localStorage.getItem("points");

    if (!p) {
      localStorage.setItem("points", "30");
      setPoints(30);
    } else {
      setPoints(Number(p));
    }
  }, []);

  // 課金（仮：+50p）
  const pay = () => {
    let current = Number(localStorage.getItem("points") || 0);
    let newPoint = current + 50;

    localStorage.setItem("points", String(newPoint));
    setPoints(newPoint);

    alert("50p追加！");
  };

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
      <div style={{ width: "100%", maxWidth: 420, padding: 16 }}>
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
            onClick={() => setMenuOpen(true)}
            style={{ padding: "6px 10px" }}
          >
            ≡
          </button>
        </div>

        {/* ポイント表示 */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: 8
          }}
        >
          {points}p
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
                padding: 16
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
                💰 50pチャージ
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

        {/* 検索 */}
        <input
          placeholder="メンバー検索"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            height: 30,
            marginBottom: 12
          }}
        />

        {/* 一覧 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {filtered.map((member) => (
            <CharacterCard
              key={member.id}
              character={member}
              onClick={() => navigate(`/chat/${member.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}