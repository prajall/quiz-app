import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="w-full">
        <Link href={"/quiz"} className="text-3xl mx-auto mt-20">
          Play {">"}
        </Link>
      </div>
    </div>
  );
}
