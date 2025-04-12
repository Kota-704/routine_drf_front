"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/ui/layout/header";

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

        <ul className="mt-6">
          {routines.map((routine, index) => (
            <div key={index}>
              <li key={routine.id}>
                <hr />
                <strong>{routine.title}</strong> ({routine.period}日ごと)
                <br />
                開始日: {routine.start_date} <br />
                内容: {routine.notice_text}
                <Link href="/update/{routine.id}">更新</Link>
              </li>
            </div>
          ))}
        </ul>
        <hr />
      </div>
    </>
  );
}
