import Link from "next/link";
import Header from "@/components/ui/layout/header";

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl">
      <Header />
      <h1 className="text-4xl">ルーチン登録アプリ</h1>
      <div className="flex flex-col items-center gap-3 mt-6">
        <Link href="/routines">ルーチン一覧を見る</Link>
        <Link href="/create">ルーチンを登録する</Link>
      </div>
    </div>
  );
}
