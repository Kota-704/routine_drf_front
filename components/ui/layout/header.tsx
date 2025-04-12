import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <nav>
      <ul>
        <li className="flex gap-3 justify-end text-xl">
          <Link href="/">TOP</Link>
          <Link href="/routines">ルーチン一覧</Link>
        </li>
      </ul>
    </nav>
  );
}
