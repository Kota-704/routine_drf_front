"use client";

import React from "react";
import Link from "next/link";
import { useState } from "react";

export default function Create() {
  const [title, setTitle] = useState<string>("");
  const [period, setPeriod] = useState<number | "">("");
  const [noticeText, setNoticeText] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("http://127.0.0.1:8000/api/routines/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        period: period,
        start_date: new Date().toISOString().split("T")[0],
        notice_text: noticeText,
      }),
    });

    if (res.ok) {
      setMessage("ルーチンを登録しました！");
      setTitle("");
      setPeriod("");
      setNoticeText("");
    } else {
      setMessage("登録に失敗しました。");
    }
  };

  return (
    <div>
      <h1>ルーチン登録ページ</h1>
      <Link href="/routines">ルーチン一覧</Link>
      <form onSubmit={handleSubmit}>
        <div>
          <label>タイトル：</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label>周期（日）：</label>
          <input
            type="number"
            value={period}
            onChange={(e) => {
              const val = e.target.value;
              setPeriod(val === "" ? "" : Number(val));
            }}
            required
          />
        </div>

        <div>
          <label>通知内容：</label>
          <input
            value={noticeText}
            onChange={(e) => setNoticeText(e.target.value)}
            required
          />
        </div>

        <button type="submit">登録</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}
