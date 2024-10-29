import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { GiStairs } from "react-icons/gi";
import { FaCheck } from "react-icons/fa";
import { HiOutlineCash } from "react-icons/hi";
import GreenButton from "./GreenButton";
import OrangeButton from "./OrangeButton";
import Link from "next/link";
import { ExamContext } from "@/contexts/ExamContext";
import { useContext } from "react";

export default function ExamComponent({ exam }) {
  const { examData, setExamData } = useContext(ExamContext);
  const discountedPrice = exam.price - (exam.price * exam.discount) / 100;

  return (
    <Card className="w-full bg-white text-sm  rounded-lg overflow-hidden">
      <CardContent className="p-4 flex justify-between items-center">
        <div>
          <div className="mb-3 space-y-1">
            <h2 className="text-xl font-semibold ">{exam.title}</h2>
            {exam.subTitle && (
              <h3 className=" text-muted-foreground text-sm ">
                ({exam.subTitle})
              </h3>
            )}
          </div>
          <div className="space-y-2 ">
            <div className="flex items-center">
              <GiStairs className="w-5 h-5 text-blue-500 mr-2" />
              <span>
                Levels:{" "}
                <span className="text-muted-foreground ">
                  {" "}
                  {exam.totalLevels}+
                </span>
              </span>
            </div>
            <div className="flex items-center">
              <FaCheck className="w-5 h-5 text-yellow-500 mr-2" />
              <span>
                Questions:{" "}
                <span className="text-muted-foreground ">
                  {" "}
                  {exam.totalQuestions}
                </span>
              </span>
            </div>
            <div className="flex items-center">
              <HiOutlineCash className="w-5 h-5 text-green-500 mr-2" />

              <span>
                Price:{" "}
                <span className="text-muted-foreground ">
                  {" "}
                  NRP {discountedPrice}
                </span>
              </span>
            </div>
          </div>
        </div>
        <div className=" flex flex-col justify-between gap-3 ">
          <Link href={`/examhall/exam/${exam._id}?exam=${exam.title}`}>
            <GreenButton
              text="Play Free"
              onClick={() =>
                setExamData((prev) => ({ ...prev, examTitle: exam.title }))
              }
            />
          </Link>
          <OrangeButton text="Buy Plan" />
        </div>
      </CardContent>
    </Card>
  );
}
