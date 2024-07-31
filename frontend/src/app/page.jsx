import Link from "next/link";
import hero from "@/assets/hero.png";
import rising from "@/assets/rising.png";
import friends from "@/assets/friends.png";
import stars from "@/assets/stars.png";
import Image from "next/image";
import { Nunito, Roboto_Slab } from "next/font/google";
import { cn } from "@/lib/utils";

const HeaderFont = Roboto_Slab({ subsets: ["latin"] });
export default function Home() {
  return (
    <>
      <section className="min-h-[600px] flex items-center flex-col-reverse md:flex-row gap-3 justify-between px-4 md:px-0">
        <div className=" flex flex-col justify-center md:max-w-[60%]">
          <h1
            className={cn(
              HeaderFont.className,
              "text-6xl lg:text-7xl  font-bold lg:tracking-wider mb-4 mt-24 md:mt-0 text-black"
            )}
          >
            LEARN AND <br /> PLAY<span className="text-primary"> QUIZ</span>
          </h1>
          <p className="text-muted-foreground text-lg mb-6">
            Challenge your knowledge with our interactive quizzes.
            <br />
            Track your scores and compete with others on the leaderboard.
          </p>
          <Link
            href={"/quiz"}
            className="mt-4 px-6 py-3 w-fit bg-primary text-white rounded-lg shadow-lg hover:bg-opacity-90 transition duration-300"
          >
            Play Now
          </Link>
        </div>
        <div className="mt-10 ">
          <Image
            src={hero}
            alt="Quiz Illustration"
            className="w-full h-auto max-w-[500px] mx-auto md:m-0 "
          />
        </div>
      </section>

      <section className=" bg-primary text-white  flex flex-col mt-20 rounded-lg md:rounded-none md:flex-row gap-8 p-8 ">
        <div className="w-full md:w-1/2 h-[350px] mx-auto aspect-square rounded-md flex items-center justify-center  p-4 ">
          <Image src={rising} width="200" height="200" className="m-auto" />
        </div>
        <div className="md:w-1/2 lg:px-10 flex flex-col justify-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4 lg:mb-6">
            Track Progress
          </h2>
          <p className=" text-sm md:text-md leading-relaxed">
            Monitor your quiz performance and see how you improve over time. Get
            insights into your strengths and weaknesses, and track your progress
            with personalized charts and statistics.
          </p>
        </div>
      </section>
      <section className=" flex flex-col mt-6 border rounded-lg md:rounded-none  md:flex-row-reverse gap-8 p-8 ">
        <div className="w-full md:w-1/2 h-[350px] mx-auto aspect-square rounded-md flex items-center justify-center  p-4 ">
          <Image src={stars} width="200" height="200" className="m-auto" />
        </div>
        <div className="md:w-1/2 lg:px-10 flex flex-col justify-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4 lg:mb-6">
            Various Topics
          </h2>
          <p className=" text-sm md:text-md leading-relaxed">
            Explore quizzes from a wide range of topics and categories. Whether
            you're into science, history, or pop culture, there's something for
            everyone to enjoy and learn from.
          </p>
        </div>
      </section>
      <section className=" bg-primary text-white  flex flex-col mt-6 rounded-lg md:rounded-none md:flex-row gap-8 p-8 ">
        <div className="w-full md:w-1/2 h-[350px] mx-auto aspect-square rounded-md flex items-center justify-center  p-4 ">
          <Image src={friends} width="200" height="200" className="m-auto" />
        </div>
        <div className="md:w-1/2 lg:px-10 flex flex-col justify-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4 lg:mb-6">
            Compete with Friends
          </h2>
          <p className=" text-sm md:text-md leading-relaxed">
            Invite your friends to compete and see who tops the leaderboard.
            Compare scores, challenge each other, and enjoy a fun and engaging
            learning experience together.
          </p>
        </div>
      </section>
    </>
  );
}
