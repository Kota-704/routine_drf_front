"use client";

import React, { useEffect, useState } from "react";

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
      <h1>ルーチン一覧</h1>
      <ul>
        {routines.map((routine) => (
          <li key={routine.id}>
            <strong>{routine.title}</strong> ({routine.period}日ごと)
            <br />
            開始日: {routine.start_date} <br />
            内容: {routine.notice_text}
          </li>
        ))}
      </ul>
    </>
  );
}
