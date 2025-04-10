import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>ルーチン登録アプリ</h1>
      <Link href="/create">
        <button>ルーチンを登録する</button>
      </Link>
    </>
  );
}
