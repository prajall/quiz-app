import React, { useContext } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AppContext } from "@/contexts/AppContext"; // Adjust based on whether it's a default or named export

const Page = () => {
  return (
    <div>
      <div className="mt-4 space-y-4">
        {/* {appData?.exams[0]?._id && ( */}
        <Link href={`/adminclfa4ec7d/question/exam/66f68e69e8d137eb28cc72fd`}>
          <Button variant="link" className="text-black">
            Questions
          </Button>
        </Link>
        {/* )} */}
        <Link href={"/adminclfa4ec7d/exam"}>
          <Button variant="link" className="text-black">
            Exams
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Page;
