"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/ui/layout/header";
import { Button } from "@/components/ui/button";

type Routine = {
  id: string;
  title: string;
  period: number;
  start_date: string;
  notice_text: string;
};

export default function RoutinePage() {
  const [routines, setRoutines] = useState<Routine[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/routines/")
      .then((res) => res.json())
      .then((data) => setRoutines(data))
      .catch((err) => console.error("API error:", err));
  }, []);

  return (
    <>
      <div className="mx-auto max-w-7xl">
        <Header />
        <h1 className="text-4xl">ルーチン一覧</h1>

        <div className="text-right my-6">
          <Link href="create/">
            <Button>＋ 新規作成</Button>
          </Link>
        </div>

        <ul className="p-3">
          {routines.map((routine) => (
            <li
              key={routine.id}
              className="flex items-center justify-between border p-3"
            >
              <div className="">
                <strong>{routine.title}</strong> ({routine.period}日ごと)
                <br />
                開始日: {routine.start_date} <br />
                内容: {routine.notice_text}
              </div>
              <div className="button_container flex gap-2">
                <Link href={`/update/${routine.id}`}>
                  <Button>更新</Button>
                </Link>
                <Link href={`/update/${routine.id}`}>
                  <Button variant="destructive">削除</Button>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
