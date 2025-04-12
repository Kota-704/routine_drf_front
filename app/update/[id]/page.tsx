"use client";

import Header from "@/components/ui/layout/header";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";

type Routine = {
  id: string;
  title: string;
  period: number;
  start_date: string;
  notice_text: string;
};

export default function Update() {
  const [message, setMessage] = useState<string>("");
  const [routine, setRoutine] = useState<Routine | null>(null);
  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:8000/api/routines/${id}/`)
      .then((res) => res.json())
      .then((data) => setRoutine(data))
      .catch((err) => console.error("API error", err));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!routine) return;

    const res = await fetch(`http://localhost:8000/api/routines/${id}/`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(routine),
    });

    if (res.ok) {
      setMessage("ルーチンを更新しました！");
    } else {
      setMessage("更新に失敗しました。");
    }
  };

  return (
    <div className="mx-auto max-w-7xl">
      <Header />
      <h1 className="text-3xl mt-4">ルーチンを編集する</h1>

      {routine && (
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label className="block mb-1">タイトル：</label>
            <Input
              value={routine.title}
              onChange={(e) =>
                setRoutine({ ...routine, title: e.target.value })
              }
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">周期（日）：</label>
            <Input
              type="number"
              value={routine.period}
              onChange={(e) =>
                setRoutine({ ...routine, period: Number(e.target.value) })
              }
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">通知内容：</label>
            <Input
              value={routine.notice_text}
              onChange={(e) =>
                setRoutine({ ...routine, notice_text: e.target.value })
              }
              required
            />
          </div>

          <div className="text-right">
            <Button type="submit">更新</Button>
          </div>
        </form>
      )}

      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
