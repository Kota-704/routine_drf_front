"use client";

import Header from "@/components/ui/layout/header";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Routine = {
  id: string;
  title: string;
  period: number;
  start_date: string;
  notice_text: string;
};

export default function Update() {
  const [message, setMessage] = useState<string>("");
  const [routines, setRoutines] = useState<Routine[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/routines/")
      .then((res) => res.json())
      .then((data) => setRoutines(data))
      .catch((err) => console.error("API error", err));
  }, []);

  const handleChange = (
    index: number,
    key: keyof Routine,
    value: string | number
  ) => {
    setRoutines((prev) =>
      prev.map((routine, i) =>
        i === index ? { ...routine, [key]: value } : routine
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    for (const routine of routines) {
      await fetch(`http://localhost:8000/api/routines/${routine.id}/`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(routine),
      });
    }
    setMessage("全てのルーチンを更新しました！");
  };

  return (
    <>
      <div className="mx-auto max-w-7xl">
        <Header />
        <h1>ルーチンを編集する</h1>
        <form onSubmit={handleSubmit}>
          {routines.map((routine, index) => (
            <div key={routine.id}>
              <div className="mt-6">
                <label>タイトル：</label>
                <Input
                  value={routine.title}
                  onChange={(e) => handleChange(index, "title", e.target.value)}
                  required
                />
              </div>

              <div className="mt-4">
                <label>周期（日）：</label>
                <Input
                  type="number"
                  value={routine.period}
                  onChange={(e) => {
                    handleChange(index, "period", e.target.value);
                  }}
                  required
                />
              </div>

              <div className="mt-4">
                <label>通知内容：</label>
                <Input
                  value={routine.notice_text}
                  onChange={(e) =>
                    handleChange(index, "notice_text", e.target.value)
                  }
                  required
                />
              </div>

              <div className="text-right">
                <Button type="submit" className="mt-4">
                  登録
                </Button>
              </div>
            </div>
          ))}
        </form>

        {message && <p>{message}</p>}
      </div>
    </>
  );
}
