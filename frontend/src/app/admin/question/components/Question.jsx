import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { cn } from "@/lib/utils";

const Question = ({ question }) => {
  const truncateText = (text, lines) => {
    const words = text.split(" ");
    const truncated = words.slice(0, lines * 10).join(" ");
    return truncated.length < text.length ? `${truncated}...` : truncated;
  };
  return (
    <div>
      <Card key={question._id} className="mb-4">
        <CardContent className="p-4">
          <Link href={`/admin/question/edit/${question._id}`}>
            <h2 className="font-semibold mb-2">
              {truncateText(question.question.name, 3)}
            </h2>
            {question.question.description && (
              <p className="text-sm text-gray-600 mb-2">
                {truncateText(question.question.description, 1)}
              </p>
            )}
            {question.question.image && (
              <img
                src={question.question.image}
                alt="Question"
                className="w-full h-40 object-cover mb-2 rounded"
              />
            )}
            <ol type="A">
              {["opt_A", "opt_B", "opt_C", "opt_D"].map((option, index) => {
                return (
                  // <li className={`flex gap-1 ${question.opt_correct===  }`}>
                  <li
                    className={cn(
                      "flex gap-1",
                      question.opt_correct == String.fromCharCode(65 + index)
                        ? "text-green-500"
                        : ""
                    )}
                  >
                    <p
                      className={cn(
                        "",
                        question.opt_correct == String.fromCharCode(65 + index)
                          ? "text-green-400"
                          : ""
                      )}
                    >
                      {String.fromCharCode(65 + index)}.{" "}
                    </p>
                    <p>{truncateText(question[option].name, 1)}</p>
                  </li>
                );
              })}

              {/* <li className="flex gap-1">
                <p>B. </p>
                <p>{truncateText(question.opt_B.name, 1)}</p>
              </li>
              <li className="flex gap-1">
                <p>C. </p>
                <p>{truncateText(question.opt_C.name, 1)}</p>
              </li>
              <li className="flex gap-1">
                <p>D. </p>
                <p>{truncateText(question.opt_D.name, 1)}</p>
              </li> */}
            </ol>
            <p className="text-sm text-gray-600">
              {truncateText(question.description, 1)}
            </p>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default Question;
