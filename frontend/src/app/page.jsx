import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="bg-emerald-600 text-white p-2 ">
        <h1>LETS PLAY QUIZ</h1>
      </div>
      <div className="w-full">
        <Link href={"/game"} className="text-3xl mx-auto mt-20">
          Play {">"}
        </Link>
      </div>
    </div>
  );
}
