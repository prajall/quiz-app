"use client";
import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { TimerContext } from "./TimerContext";
import { redirect, useRouter } from "next/navigation";
import { ScoreContext } from "./ScoreContext";

const defaultQuizData = {
  isPlaying: false,
  questions: [],
  // questions: [
  //   {
  //     _id: "66870c51ba044061b50725a4",
  //     id: "5145",
  //     exam_id: "1001",
  //     name: "त्रि.वि.को परीक्षामा १०० जना केटाहरुले परीक्षा दिएकोमा २० जना मात्र उतिर्ण भएछन् भने कति प्रतिशत केटाहरु अनुतिर्ण भएछन् ?",
  //     opt_a: "४० प्रतिशत",
  //     opt_b: "६० प्रतिशत",
  //     opt_c: "८० प्रतिशत",
  //     opt_d: "९०प्रतिशत",
  //     opt_correct: "C",
  //     __v: 0,
  //   },
  //   {
  //     _id: "66870c51ba044061b50737dc",
  //     id: "9809",
  //     exam_id: "1001",
  //     name: "नेपालमा घुम्ती शिक्षक तालिम कार्यक्रम कहिले सञ्चालन भएको थियो ?",
  //     opt_a: "वि.सं. २०१०",
  //     opt_b: "वि.सं. २०११",
  //     opt_c: "वि.सं. २०१२",
  //     opt_d: "वि.सं. २०१३",
  //     opt_correct: "D",
  //     __v: 0,
  //   },
  //   {
  //     _id: "66870d85ba044061b5076d52",
  //     id: "9787",
  //     exam_id: "1003",
  //     name: "Under which section of drug Act 2035, there is the provision of registration prior to the importation of drugs?",
  //     opt_a: "SubSection -2 of Section 8A",
  //     opt_b: "Subsection-2 of section 8",
  //     opt_c: "Subsection-2 of Section 8",
  //     opt_d: "Subsection-1 of Section 9",
  //     opt_correct: "A",
  //     __v: 0,
  //   },
  //   {
  //     _id: "66870c51ba044061b5073f8e",
  //     id: "11779",
  //     exam_id: "1001",
  //     name: "शिक्षण सिकाइ प्रक्रियामा सूचना तथा सञ्चार प्रविधिको प्रयोग गरी गुणस्तरीय शिक्षणमा अभिवृद्धि गर्ने जिम्मेवारी कसको हो ?",
  //     opt_a: "विद्यालय",
  //     opt_b: "स्रोत केन्द्र",
  //     opt_c: "जिशिका",
  //     opt_d: "नेपाल सरकार",
  //     opt_correct: "A",
  //     __v: 0,
  //   },
  //   {
  //     _id: "66870ec5ba044061b507a346",
  //     id: "2969",
  //     exam_id: "1009",
  //     name: "१६ वर्ष मुनिका बालबालिकाका लागि भन्सार महशुलमा कति प्रतिशत छुट हुने व्यवस्था छ ? .",
  //     opt_a: "२०%",
  //     opt_b: "३०%",
  //     opt_c: "३५%",
  //     opt_d: "५०%",
  //     opt_correct: "D",
  //     __v: 0,
  //   },
  //   {
  //     _id: "66870df5ba044061b5077dfb",
  //     id: "3056",
  //     exam_id: "1004",
  //     name: "खुमल ज्यापु कुन बालीको जात हो ?",
  //     opt_a: "बन्दा",
  //     opt_b: "आलु",
  //     opt_c: "काउली",
  //     opt_d: "काँक्रो",
  //     opt_correct: "A",
  //     __v: 0,
  //   },
  //   {
  //     _id: "66870c50ba044061b5071426",
  //     id: "667",
  //     exam_id: "1001",
  //     name: "एड्गर डेलको सिकाइ पिरामिड अनुसार गरेर सिक्ने (एचबअतष्अभ दथ मयष्लन) बिधिमार्फत सिकाइ औसत कति प्रतिशत धारण दर पाइएको उल्लेख गरेका छन् ?",
  //     opt_a: "३० प्रतिशत",
  //     opt_b: "५० प्रतिशत",
  //     opt_c: "७० प्रतिशत",
  //     opt_d: "७५ प्रतिशत",
  //     opt_correct: "D",
  //     __v: 0,
  //   },
  //   {
  //     _id: "66870d84ba044061b5075607",
  //     id: "3824",
  //     exam_id: "1003",
  //     name: "Not a systemic route of drug administration",
  //     opt_a: "Oral",
  //     opt_b: "Intravenous",
  //     opt_c: "Arterial",
  //     opt_d: "Sublingual",
  //     opt_correct: "C",
  //     __v: 0,
  //   },
  //   {
  //     _id: "66870e17ba044061b5078540",
  //     id: "896",
  //     exam_id: "1005",
  //     name: "बाख्राको गर्भधारण अवधि कति दिन हुन्छ ?",
  //     opt_a: "१४५",
  //     opt_b: "१५०",
  //     opt_c: "१५५",
  //     opt_d: "१६०",
  //     opt_correct: "C",
  //     __v: 0,
  //   },
  //   {
  //     _id: "66870ec5ba044061b507a504",
  //     id: "3415",
  //     exam_id: "1009",
  //     name: "निजी क्षेत्रबाट संचालित कुरियरबाट पैठारी गर्न नपाउने मालवस्तु तल उल्लेख गरिएका मध्ये कुन हो ?",
  //     opt_a: "जनावर र तिनका अंगहरु",
  //     opt_b: "वनस्पति र तिनका अंगहरु",
  //     opt_c: "सुनचाँदी र गरगहना",
  //     opt_d: "माथिका सबै",
  //     opt_correct: "D",
  //     __v: 0,
  //   },
  //   {
  //     _id: "66870d84ba044061b507569c",
  //     id: "3973",
  //     exam_id: "1003",
  //     name: "धेरैमात्रामा पानीको शद्धिकरण गर्न chlorine को कुन form उपयुक्त हुन्छ ?",
  //     opt_a: "Chlorine gas",
  //     opt_b: "Chloramine",
  //     opt_c: "Perchloroni",
  //     opt_d: "Bleaching Powder",
  //     opt_correct: "A",
  //     __v: 0,
  //   },
  //   {
  //     _id: "66870ea4ba044061b5078b80",
  //     id: "527",
  //     exam_id: "1007",
  //     name: "निम्न रोगहरूका बारेमा विचार गर्नुहोस् । 1. दादुरा 2. दाद 3. मलेरिया 4. कुष्ठरोग उपरोक्त रोगहरू क्रमशः भाइरस , व्याक्टेरिया , प्रोटोजोवा र फन्जाइबाट हुने आधारमा कुन सही छ ?",
  //     opt_a: "1-4-2-3",
  //     opt_b: "1-3-2-4",
  //     opt_c: "4-1-2-3",
  //     opt_d: "1-4-3-2",
  //     opt_correct: "D",
  //     __v: 0,
  //   },
  //   {
  //     _id: "66870d84ba044061b507511f",
  //     id: "2568",
  //     exam_id: "1003",
  //     name: "Mini lecture स्वास्थ्य शिक्षाको कुन विधि अन्तर्गत पर्दछ?",
  //     opt_a: "Individual Method",
  //     opt_b: "Small Group Method",
  //     opt_c: "Mass Method",
  //     opt_d: "माथिका सबै",
  //     opt_correct: "B",
  //     __v: 0,
  //   },
  //   {
  //     _id: "66870c51ba044061b50722ee",
  //     id: "4451",
  //     exam_id: "1001",
  //     name: "कुन भनाई गलत छ ?",
  //     opt_a: "स्केन्डेभिनियन टापु अमेरिकामा पर्दछ।",
  //     opt_b: "प्रायद्विपको पनि प्रायद्विप भनेर यूरोपलाई चिनिन्छ।",
  //     opt_c: "चराहरुको महादेश दक्षिण अमेरिका हो।",
  //     opt_d: "विश्वको पुरानो राष्ट्रिय निकुञ्ज यिध क्तयलभ उत्तर अमेरिकामा छ।",
  //     opt_correct: "A",
  //     __v: 0,
  //   },
  //   {
  //     _id: "66870df5ba044061b50774d5",
  //     id: "714",
  //     exam_id: "1004",
  //     name: "Which one is not transmitted by soil?",
  //     opt_a: "Fungi",
  //     opt_b: "Bacteria",
  //     opt_c: "Virus",
  //     opt_d: "Algae",
  //     opt_correct: "C",
  //     __v: 0,
  //   },
  //   {
  //     _id: "66870df5ba044061b5077571",
  //     id: "870",
  //     exam_id: "1004",
  //     name: "विरुवालाई आवश्यक पर्ने सुक्ष्म तत्व कति वटा रहेका छन् ?",
  //     opt_a: "3",
  //     opt_b: "6",
  //     opt_c: "7",
  //     opt_d: "16",
  //     opt_correct: "C",
  //     __v: 0,
  //   },
  //   {
  //     _id: "66870c51ba044061b5073e41",
  //     id: "11446",
  //     exam_id: "1001",
  //     name: "प्रकोपको दवाव झेल्ने वा सहन गर्न सक्ने क्षमता……हो ?",
  //     opt_a: "जोखिम",
  //     opt_b: "विपद",
  //     opt_c: "उत्थानसिलता",
  //     opt_d: "प्रकोप",
  //     opt_correct: "A",
  //     __v: 0,
  //   },
  //   {
  //     _id: "66870d85ba044061b50770d7",
  //     id: "10688",
  //     exam_id: "1003",
  //     name: "Most critical phase of the nurse client relationship?",
  //     opt_a: "Pre interaction phase",
  //     opt_b: "Working phase",
  //     opt_c: "Termination phase",
  //     opt_d: "Orientation phase",
  //     opt_correct: "A",
  //     __v: 0,
  //   },
  //   {
  //     _id: "66870ec5ba044061b507a6ef",
  //     id: "3906",
  //     exam_id: "1009",
  //     name: "विदेशमा बिक्रि कर तथा अन्य कुनै कर लाग्ने मालवस्तु पैठारी गर्ने व्यक्तिले पैठारी गरेको प्रमाणपत्र लिनका लागि सम्बन्धित भन्सार कार्यालयमा निवेदन दिएकोमा सो प्रमाणपत्र दिँदा प्रति प्रमाणपत्रको के कति दस्तुर लाग्ने व्यवस्था छ ?",
  //     opt_a: "रु५",
  //     opt_b: "रु ७",
  //     opt_c: "रु १०",
  //     opt_d: "रु १५",
  //     opt_correct: "A",
  //     __v: 0,
  //   },
  //   {
  //     _id: "66870d84ba044061b5075c1c",
  //     id: "5381",
  //     exam_id: "1003",
  //     name: "Which is not the objective of first aid ?",
  //     opt_a: "Bleeding stop",
  //     opt_b: "Pain management",
  //     opt_c: "Surgical management",
  //     opt_d: "Position maintain",
  //     opt_correct: "C",
  //     __v: 0,
  //   },
  // ],
  currentQuestion: 0,
  currentExam: "All",
  correct: 0,
  incorrect: 0,
  quizSettings: { time: 60, questionLength: 10 },
};

export const QuizContext = createContext();

const QuizProvider = ({ children }) => {
  const [quizData, setQuizData] = useState(defaultQuizData);
  const { uploadScore } = useContext(ScoreContext);

  const router = useRouter();

  const resetQuizData = () => {
    setQuizData(defaultQuizData);
  };

  const startQuiz = () => {
    setQuizData((prev) => ({ ...prev, isPlaying: true }));
  };

  const endQuiz = async () => {
    setQuizData((prev) => ({ ...prev, isPlaying: false }));
    await uploadScore();
    router.push("/quiz-end");
  };

  return (
    <QuizContext.Provider
      value={{ quizData, setQuizData, resetQuizData, endQuiz, startQuiz }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export default QuizProvider;
