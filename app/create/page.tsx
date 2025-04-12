"use client";

import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/ui/layout/header";
import Link from "next/link";

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
    <>
      <div className="mx-auto max-w-7xl">
        <Header />
        <h1 className="text-3xl">ルーチン登録ページ</h1>
        <form onSubmit={handleSubmit}>
          <div className="mt-6">
            <label>タイトル：</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="mt-4">
            <label>周期（日）：</label>
            <Input
              type="number"
              value={period}
              onChange={(e) => {
                const val = e.target.value;
                setPeriod(val === "" ? "" : Number(val));
              }}
              required
            />
          </div>

          <div className="mt-4">
            <label>通知内容：</label>
            <Input
              value={noticeText}
              onChange={(e) => setNoticeText(e.target.value)}
              required
            />
          </div>
          <div className="flex gap-2 mt-4 justify-end">
            <Link href="routines/">
              <Button variant="destructive">戻る</Button>
            </Link>
            <Button type="submit" className="">
              登録
            </Button>
          </div>
        </form>

        {message && <p>{message}</p>}
      </div>
    </>
  );
}
