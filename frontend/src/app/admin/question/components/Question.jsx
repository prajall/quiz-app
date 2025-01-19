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
              <p className="text-sm text-muted-foreground mb-2">
                {truncateText(question.question.description, 1)}
              </p>
            )}
            {question.question.image && (
              <img
                src={question.question.image}
                alt="Question"
                className="mx-auto h-40 object-contain mb-2 rounded"
              />
            )}
            <ol type="A" className="list-decimal pl-5">
              {["opt_A", "opt_B", "opt_C", "opt_D"].map((option, index) => {
                const opt = question[option];
                const isCorrect =
                  question.opt_correct === String.fromCharCode(65 + index);
                const optionLabel = String.fromCharCode(65 + index); // Generate A, B, C, D

                return (
                  <li
                    className={cn(
                      "mb-4 list-none",
                      isCorrect ? "text-blue-500" : ""
                    )}
                    key={option}
                  >
                    <div className="flex items-center gap-2">
                      <p
                        className={cn(
                          "font-medium",
                          isCorrect ? "text-blue-400" : ""
                        )}
                      >
                        {optionLabel}.
                      </p>
                      <p>{truncateText(opt.name, 1)}</p>
                    </div>
                    {opt.image && (
                      <img
                        src={opt.image}
                        alt={`Option ${optionLabel}`}
                        className=" h-32 object-contain mt-2 rounded "
                      />
                    )}
                  </li>
                );
              })}
            </ol>

            {question.description && (
              <p className="text-sm text-muted-foreground mt-4">
                {truncateText(question.description, 3)}
              </p>
            )}
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default Question;
