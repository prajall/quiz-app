import hero from "@/assets/hero.png";
import leaderboard from "@/assets/leaderboard.png";
import { cn } from "@/lib/utils";
import { Activity, Brain, SquareStack } from "lucide-react";
import { Roboto_Slab } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const HeaderFont = Roboto_Slab({ subsets: ["latin"] });
export default function Home() {
  return (
    <>
      <section className="min-h-[600px] xl:min-h-[700px] flex items-center flex-col-reverse md:flex-row gap-3 justify-between px-4 md:px-0">
        <div className=" flex flex-col justify-center md:max-w-[60%]">
          <h1
            className={cn(
              HeaderFont.className,
              "text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold lg:tracking-wider mt-2 md:mt-0 text-black"
            )}
          >
            LEARN AND <br /> PLAY<span className="text-primary"> QUIZ</span>
          </h1>
          <p className="text-muted-foreground mt-8 text-lg">
            Challenge your knowledge with our interactive quizzes.
            <br />
            Track your scores and compete with others on the leaderboard.
          </p>
          <Link
            href={"/quiz"}
            className="mt-8 px-6 py-3 w-fit bg-primary text-white rounded-lg shadow-lg hover:bg-opacity-90 transition duration-300"
          >
            Play Now
          </Link>
        </div>
        <div className="mt-10 md:mt-0 md:p-6 lg:p-10 xl:p-14 flex justify-end items-center md:pr-10 md:w-1/2">
          <Image
            src={hero}
            alt="Quiz Illustration"
            priority={true}
            className="w-full h-auto md:m-0 "
          />
        </div>
      </section>

      <section className="features mt-20 md:mt-10 mx-auto w-full flex flex-wrap gap-6 justify-center">
        <div className="max-w-96 md:max-w-96 shadow-md border border-black border-opacity-50 rounded-xl p-4 lg:p-6">
          <div className="flex gap-2 justify-center text-primary items-center">
            <SquareStack size={24} />
            <h2 className="text-xl text-primary font-bold text-center">
              Various Topics
            </h2>
          </div>
          <p className="text-sm md:text-md text-justify mt-4 md:mt-6 leading-relaxed">
            Explore quizzes from a wide range of topics and categories. Discover
            new interests and test your knowledge.
          </p>
        </div>
        <div className="max-w-96 md:max-w-96 shadow-md border border-black border-opacity-50 rounded-xl p-4 lg:p-6">
          <div className="flex gap-2 justify-center text-primary items-center">
            <Brain size={24} />
            <h2 className="text-xl text-primary font-bold text-center">
              Expand your Knowledge
            </h2>
          </div>
          <p className="text-sm md:text-md text-justify mt-4 md:mt-6 leading-relaxed">
            Learn while you play the quiz and uncover new information with every
            answer. Have fun broadening your understanding.
          </p>
        </div>
        <div className="max-w-96 md:max-w-96 shadow-md border border-black border-opacity-50 rounded-xl p-4 lg:p-6 md:mx-auto lg:m-0">
          <div className="flex gap-2 justify-center text-primary items-center">
            <Activity size={24} />
            <h2 className="text-xl text-primary font-bold text-center">
              Track Your Activity
            </h2>
          </div>
          <p className="text-sm md:text-md text-justify mt-4 md:mt-6 leading-relaxed">
            See your performance after each round and compare it with others on
            the leaderboard. Track and improve your performance.
          </p>
        </div>
      </section>

      <section className=" flex flex-col md:flex-row mt-10 border md:border-0 rounded-lg md:rounded-none  gap-8 p-8 ">
        <div className="w-full md:w-1/2 h-auto md:h-[400px] mx-auto aspect-square rounded-md flex items-center justify-center p-4 ">
          <Image
            src={leaderboard}
            alt="leaderboard"
            className="m-auto h-full w-full md:w-auto"
          />
        </div>
        <div className="md:w-1/2 lg:px-10 flex flex-col justify-center">
          <h2 className="text-2xl text-primary md:text-4xl font-bold mb-2 md:mb-4 lg:mb-6">
            Introducing Leaderboards
          </h2>
          <p className=" text-sm md:text-md leading-relaxed">
            Do you have what it takes to be on top and hold the crown? Compete
            with others, climb the leaderboard, and prove your knowledge. Join
            the challenge and see how high you can go!
          </p>
        </div>
      </section>

      {/* <section className=" bg-primary text-white  flex flex-col mt-10 rounded-lg md:rounded-none md:flex-row gap-8 p-8 ">
        <div className="w-full md:w-1/2 h-auto md:h-[300px] mx-auto aspect-square rounded-md flex items-center justify-center  p-4 ">
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
      </section> */}
    </>
  );
}
