"use client";
import React, { useContext } from "react";
import DescriptionComponent from "./DescriptionComponent";
import { ExamContext } from "@/contexts/ExamContext";

const DescriptionPage = () => {
  const { examData } = useContext(ExamContext);

  const questions = [
    {
      _id: "66870c50ba044061b50711bb",
      id: "48",
      exam_id: "1001",
      exam: "66f68e69e8d137eb28cc72fd",
      description: "",
      question: {
        name: "15. नेपाललाई सबैभन्दा पहिला वैदेशिक सहायता गर्ने राष्ट्र कुन हो ?",
      },
      opt_A: { name: "(क) जापान" },
      opt_B: { name: "(ख) रसिया" },
      opt_C: { name: "(ग) अमेरिका" },
      opt_D: { name: "(घ) बेलायत" },
      opt_correct: "C",
      userAnswer: "B",
      __v: 0,
    },
    {
      _id: "66870c50ba044061b50711a7",
      id: "28",
      exam_id: "1001",
      exam: "66f68e69e8d137eb28cc72fd",
      description: "",
      question: {
        name: "पचाल झरना कुन जिल्लामा रहेको छ ?",
      },
      opt_A: { name: "(क) रोल्पा" },
      opt_B: { name: "(ख) कालिकोट" },
      opt_C: { name: "(ग) दार्चुला" },
      opt_D: { name: "(घ) डोल्पा" },
      opt_correct: "B",
      userAnswer: "A",
      __v: 0,
    },
    {
      _id: "66870c50ba044061b50711a4",
      id: "25",
      exam_id: "1001",
      exam: "66f68e69e8d137eb28cc72fd",
      description: "",
      question: {
        name: "हिमालपारिका जिल्ला भनेर कुन-कुन जिल्लालाई चिनिन्छ",
      },
      opt_A: { name: "(क) मुगु, डोल्पा" },
      opt_B: { name: "(ख) हुम्ला, जुम्ला" },
      opt_C: { name: "(ग) मनाङ, मुस्ताङ" },
      opt_D: { name: "(घ) लमजुङ, गोरखा" },
      opt_correct: "C",
      userAnswer: "C",
      __v: 0,
    },
    {
      _id: "66870c50ba044061b50711b2",
      id: "39",
      exam_id: "1001",
      exam: "66f68e69e8d137eb28cc72fd",
      description: "",
      question: {
        name: "6. नेपालको इतिहासमा स्वामी निर्वाणानन्द/निर्गुणानन्दका उपनामले कसलाई चिनिन्छ ?",
      },
      opt_A: { name: "(क) जयप्रकाश मल्ल" },
      opt_B: { name: "(ख) रणबहादुर शाह" },
      opt_C: { name: "(ग) जुद्ध शमशेर" },
      opt_D: { name: "(घ) अजितसिंह थापा" },
      opt_correct: "B",
      userAnswer: "D",
      __v: 0,
    },
    {
      _id: "66870c50ba044061b50711b1",
      id: "38",
      exam_id: "1001",
      exam: "66f68e69e8d137eb28cc72fd",
      description: "",
      question: {
        name: "5. राजकुमारी भृकुटीलाई तिब्बतमा के उपनाम दिइएको थियो ?",
      },
      opt_A: { name: "(क) श्वेत तारा" },
      opt_B: { name: "(ख) ध्रुव तारा" },
      opt_C: { name: "(ग) हरित तारा" },
      opt_D: { name: "(घ) लाल तारा" },
      opt_correct: "C",
      userAnswer: "A",
      __v: 0,
    },
    {
      _id: "66870c50ba044061b5071191",
      id: "6",
      exam_id: "1001",
      exam: "66f68e69e8d137eb28cc72fd",
      description: "",
      question: {
        name: "शालीग्राम शिला' का लागि नेपालको प्रसिद्ध नदी कुन हो ?",
      },
      opt_A: { name: "कालीगण्डकी" },
      opt_B: { name: "बुढीगण्डकी" },
      opt_C: { name: "मादी" },
      opt_D: { name: "सल्यान" },
      opt_correct: "A",
      userAnswer: "A",
      __v: 0,
    },
    {
      _id: "66870c50ba044061b50711ab",
      id: "32",
      exam_id: "1001",
      exam: "66f68e69e8d137eb28cc72fd",
      description: "",
      question: {
        name: "नेपालमा कति प्रकारका चरालाई संरक्षित पंक्षीको सूचीमा राखिएको छ ?",
      },
      opt_A: { name: "क) ५" },
      opt_B: { name: "(ख)७" },
      opt_C: { name: "(ग) ९" },
      opt_D: { name: "(घ) ११" },
      opt_correct: "C",
      userAnswer: "B",
      __v: 0,
    },
    {
      _id: "66870c50ba044061b50711a0",
      id: "21",
      exam_id: "1001",
      exam: "66f68e69e8d137eb28cc72fd",
      description: "",
      question: {
        name: "8. फेवातालको बीचमा अवस्थित मन्दिरको नाम के हो?",
      },
      opt_A: { name: "(क) तालबाराही" },
      opt_B: { name: "(ख) बिन्दवासिनी" },
      opt_C: { name: "(ग) साराङकोट" },
      opt_D: { name: "(घ) विन्देश्वरी" },
      opt_correct: "A",
      userAnswer: "C",
      __v: 0,
    },
    {
      _id: "66870c50ba044061b50711b6",
      id: "43",
      exam_id: "1001",
      exam: "66f68e69e8d137eb28cc72fd",
      description: "",
      question: {
        name: "10. नेपालको अर्थतन्त्रमा सबैभन्दा बढी कुन क्षेत्रको योगदान छ?",
      },
      opt_A: { name: "(क) व्यापार" },
      opt_B: { name: "(ख) उद्योग" },
      opt_C: { name: "(ग) कृषि" },
      opt_D: { name: "(घ) पर्यटन" },
      opt_correct: "C",
      userAnswer: "D",
      __v: 0,
    },
    {
      _id: "66870c50ba044061b5071195",
      id: "10",
      exam_id: "1001",
      exam: "66f68e69e8d137eb28cc72fd",
      description: "",
      question: {
        name: "एक रुपैया 25 पैसा र 4 रुपैयाको अनुपात निकाल्नुहोस्।",
      },
      opt_A: { name: "25:4" },
      opt_B: { name: "4:25" },
      opt_C: { name: "5:16" },
      opt_D: { name: "5:8" },
      opt_correct: "C",
      userAnswer: "B",
      __v: 0,
    },
    {
      _id: "66870c50ba044061b5071192",
      id: "7",
      exam_id: "1001",
      exam: "66f68e69e8d137eb28cc72fd",
      description: "",
      question: {
        name: "राष्ट्रिय योजना परिषद् कहिलेदेखि राष्ट्रिय योजना आयोगमा रूपान्तरण भयो ?",
      },
      opt_A: { name: "वि.सं. २०२०" },
      opt_B: { name: "वि.सं. २०२२" },
      opt_C: { name: "वि.सं. २०२४" },
      opt_D: { name: "वि.सं. २०२५" },
      opt_correct: "C",
      userAnswer: "A",
      __v: 0,
    },
  ];
  return (
    <div>
      {/* {questions?.map((question, index) => ( */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {questions.map((question, index) => (
          <DescriptionComponent question={question} index={index} />
        ))}
      </div>
      {/* ))} */}
    </div>
  );
};

export default DescriptionPage;
