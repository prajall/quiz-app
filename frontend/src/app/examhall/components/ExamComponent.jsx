import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export default function ExamComponent({ exam }) {
  const discountedPrice = exam.price - (exam.price * exam.discount) / 100;

  return (
    <Card className="w-full bg-white text-sm  rounded-lg overflow-hidden">
      <CardContent className="p-4 flex justify-between items-center">
        <div>
          <div className="mb-3 space-y-1">
            <h2 className="text-xl font-bold ">{exam.title}</h2>
            {exam.subTitle && (
              <h3 className=" text-muted-foreground text-sm ">
                ({exam.subTitle})
              </h3>
            )}
          </div>
          <div className="space-y-1 ">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-green-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>
                Levels:{" "}
                <span className="text-muted-foreground ">
                  {" "}
                  {exam.totalLevels}+
                </span>
              </span>
            </div>
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-blue-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>
                Questions:{" "}
                <span className="text-muted-foreground ">
                  {" "}
                  {exam.totalQuestions}
                </span>
              </span>
            </div>
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-yellow-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
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
        <div className=" flex flex-col justify-between gap-2 ">
          <Button
            variant="outline"
            className="w-32 rounded-xl text-sm border-[#7e9e62] text-[#7e9e62] hover:bg-[#7e9e62]/10 hover:text-[#7e9e62]"
          >
            Play Free
          </Button>
          <Button
            variant="outline"
            className="w-32 rounded-xl text-sm border-[#da674e] text-[#da674e] hover:bg-[#da674e]/10 hover:text-[#da674e]"
          >
            Buy Plan
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
