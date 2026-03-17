import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import characters from "../data/characters";
import { supabase } from "../lib/supabase";

export default function Cards() {
  const navigate = useNavigate();

  const [cards, setCards] = useState([]);
  const [pinsRaw, setPinsRaw] = useState(null);

  useEffect(() => {
    loadCards();

    const saved = localStorage.getItem("pins");
    try {
      setPinsRaw(saved ? JSON.parse(saved) : []);
    } catch (e) {
      setPinsRaw([]);
    }
  }, []);

  async function loadCards() {
    const userId = localStorage.getItem("user_id");

    const { data } = await supabase
      .from("cards")
      .select("*")
      .eq("user_id", userId);

    if (data) {
      setCards(data);
    }
  }

  function normalizeId(value) {
    return String(value || "").trim().toLowerCase();
  }

  function getPinnedIds(raw) {
    if (!raw) return [];

    // pins が ["mio","akina"] の配列パターン
    if (Array.isArray(raw)) {
      return raw.map(normalizeId).filter(Boolean);
    }

    // pins が { mio: 1740000000000, akina: 1740000000000 } のオブジェクトパターン
    if (typeof raw === "object") {
      return Object.keys(raw)
        .filter((key) => raw[key])
        .map(normalizeId)
        .filter(Boolean);
    }

    return [];
  }

  const pinnedIds = useMemo(() => getPinnedIds(pinsRaw), [pinsRaw]);

  const pinnedCharacters = useMemo(() => {
    return characters.filter((c) => pinnedIds.includes(normalizeId(c.id)));
  }, [pinnedIds]);

  function renderCards(characterId) {
    const targetId = normalizeId(characterId);

    const owned = cards
      .filter((c) => normalizeId(c.character_id) === targetId)
      .map((c) => Number(c.card_no));

    const list = [];

    for (let i = 1; i <= 12; i++) {
      const has = owned.includes(i);

      list.push(
        <div
          key={i}
          style={{
            width: "60px",
            height: "60px",
            margin: "5px",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: has ? "#ff69b4" : "#ddd",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          {has ? i : "?"}
        </div>
      );
    }

    return list;
  }

  return (
    <div
      style={{
        width: "375px",
        margin: "0 auto",
        padding: "20px",
        background: "#ffeaf4",
        minHeight: "100vh",
      }}
    >
      <button onClick={() => navigate("/home")}>戻る</button>

      <h2 style={{ marginTop: "20px" }}>カードコレクション</h2>

      {pinsRaw === null && <div style={{ marginTop: "20px" }}>読み込み中...</div>}

      {pinsRaw !== null && pinnedCharacters.length === 0 && (
        <div style={{ marginTop: "20px" }}>ピンしたキャラがいません</div>
      )}

      {pinnedCharacters.map((c) => {
        const owned = cards.filter(
          (card) => normalizeId(card.character_id) === normalizeId(c.id)
        );

        return (
          <div
            key={c.id}
            style={{
              marginTop: "20px",
              border: "1px solid #eee",
              padding: "10px",
              borderRadius: "10px",
              background: "#fff",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <img
                src={c.img}
                alt={c.name}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  marginRight: "10px",
                }}
              />

              <div>
                <div>{c.name}</div>
                <div style={{ fontSize: "12px", color: "#777" }}>
                  {owned.length} / 12
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              {renderCards(c.id)}
            </div>
          </div>
        );
      })}
    </div>
  );
}