"use client";
import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { TimerContext } from "./TimerContext";
import { useRouter } from "next/navigation";
import { ScoreContext } from "./ScoreContext";

const defaultQuizData = {
  isPlaying: false,
  questions: [
    {
      _id: "66870d85ba044061b5076aae",
      id: "9111",
      exam_id: "1003",
      name: "नेपाल र अस्ट्रेलियाबिच व्यापार तथा लगानीसम्बन्धी सम्झौता कहिले भएको हो ?",
      opt_a: "सन् २०२४ फेब्रुअरी ९",
      opt_b: "सन् २०२४ फेब्रुअरी ४",
      opt_c: "सन् २०२४ फेब्रुअरी ८",
      opt_d: "सन् २०२४ फेब्रुअरी १०",
      opt_correct: "A",
      __v: 0,
    },
    {
      _id: "66870c51ba044061b507254d",
      id: "5058",
      exam_id: "1001",
      name: "देहायको कुन भनाई बेठीक छ ?",
      opt_a: "सापेक्ष गरिबी र निरपेक्ष गरिबीको योगफल नै कुल गरिबी हो।",
      opt_b:
        "औसत गरिबीको रेखाभन्दा मुनि र निरपेक्ष गरिबीको रेखाभन्दा माथिको अवस्थालाई सापेक्ष गरिबी भनिन्छ।",
      opt_c: "सापेक्ष गरिबीलाई तुलनात्मक गरिबी पनि भनिन्छ।",
      opt_d: "निरपेक्ष गरिबीको अवधारणा सम्पूर्ण सुविधाको वितरणसँग सम्बन्धित छ।",
      opt_correct: "D",
      __v: 0,
    },
    {
      _id: "66870d85ba044061b5076a04",
      id: "8941",
      exam_id: "1003",
      name: "In high altitudes, the hemoglobin value is",
      opt_a: "Higher",
      opt_b: "Lower",
      opt_c: "The same",
      opt_d: "Not altered",
      opt_correct: "A",
      __v: 0,
    },
    {
      _id: "66870c51ba044061b507447c",
      id: "13041",
      exam_id: "1001",
      name: "भिन्न अक्षर-समूह छनोट गर्नुहोस् ।",
      opt_a: "ABCE",
      opt_b: "FGHI",
      opt_c: "JKLM",
      opt_d: "NOPQ",
      opt_correct: "A",
      __v: 0,
    },
    {
      _id: "66870c51ba044061b5072f0f",
      id: "7556",
      exam_id: "1001",
      name: "सामाजिक सिकाइ सिद्धान्तको प्रयोग कुन प्राणीमाथि गरिएको थियो ?",
      opt_a: "प्याभलभले कुकुर माथि",
      opt_b: "थर्नडाइकले बिरालो माथि",
      opt_c: "वि.एफ. स्किनरले मुसामाथि",
      opt_d: "बाण्डुराले बालकहरुमाथि",
      opt_correct: "D",
      __v: 0,
    },
    {
      _id: "66870ea4ba044061b5078c2a",
      id: "697",
      exam_id: "1007",
      name: "तल दिइएका साहित्यिक कृति र तिनीहरूका मदन पुरस्कार प्राप्त सित्ति बीच जोडा मिलाई बन्ने उपयुक्त विकल्प छान्नुहोस् । साहित्यिक कृति मदन पुरस्कार प्राप्त मिति (१) शिरीषको फूल (a) वि.स. २०७० (२) जीवन काँडा कि फूल (b) वि.स. २०६७ (३) खलंगामा हमला (c) वि.सं. २०२२",
      opt_a: "१-८,२-५,३-a",
      opt_b: "१-३,२-७,३-c",
      opt_c: "१-७.२-७.३-०",
      opt_d: "१-७, २-८३-a",
      opt_correct: "A",
      __v: 0,
    },
    {
      _id: "66870df5ba044061b5077751",
      id: "1350",
      exam_id: "1004",
      name: "SNF content of toned milk …………",
      opt_a: "8.5",
      opt_b: "8",
      opt_c: "6.5",
      opt_d: "7.5",
      opt_correct: "A",
      __v: 0,
    },
    {
      _id: "66870c51ba044061b5073085",
      id: "7930",
      exam_id: "1001",
      name: "मूल्याङ्कनका साधनमा के कस्ता गुणहरु हुनुपर्दछ ?",
      opt_a: "विश्वसनीयता र वैधता",
      opt_b: "वस्तुनिष्ठता र व्यापकता",
      opt_c: "विभेदीकरण र व्यावहारिकता",
      opt_d: "माथिका सबै",
      opt_correct: "D",
      __v: 0,
    },
    {
      _id: "66870eb6ba044061b50791a2",
      id: "1361",
      exam_id: "1008",
      name: "सबै भन्दा खतरनाक प्रकृतिको वन डढेलो कुन हो ?",
      opt_a: "सतही डढेलो",
      opt_b: "धरातलीय डढेलो",
      opt_c: "छत्र डढेलो",
      opt_d: "कुनै पनि होइन",
      opt_correct: "C",
      __v: 0,
    },
    {
      _id: "66870df5ba044061b5077a85",
      id: "2170",
      exam_id: "1004",
      name: "कालिमाटि फलफुल तथा बजार बिकास समिति गठन आदेश कुन ठिक छ?",
      opt_a: "2042bs",
      opt_b: "2051bs",
      opt_c: "2058bs",
      opt_d: "2063bs",
      opt_correct: "D",
      __v: 0,
    },
    {
      _id: "66870eb6ba044061b507979b",
      id: "2890",
      exam_id: "1008",
      name: "नेपालमा हाल अर्नाको संख्या कति रहेको छ?",
      opt_a: "432",
      opt_b: "430",
      opt_c: "455",
      opt_d: "431",
      opt_correct: "A",
      __v: 0,
    },
    {
      _id: "66870d85ba044061b5076af7",
      id: "9184",
      exam_id: "1003",
      name: "Prohibition of adulteration in `Drug Act 2035` is in section",
      opt_a: "26",
      opt_b: "29",
      opt_c: "30",
      opt_d: "33",
      opt_correct: "A",
      __v: 0,
    },
    {
      _id: "66870eb6ba044061b5079043",
      id: "1010",
      exam_id: "1008",
      name: "नेपाल भरि करीब एक लाख हेक्टर वन क्षेत्र अतिक्रमित भएको प्रारम्भिक तथ्यांक छ, यसको प्रमुख कारण के होला ?",
      opt_a: "बसाई सराई",
      opt_b: "वन क्षेत्रमा नै विकासका पूर्वाधार खडा गरिने परिपाटी",
      opt_c: "पर्यावरणीय चेतनाको अभाव",
      opt_d: "माथिका सबै",
      opt_correct: "D",
      __v: 0,
    },
    {
      _id: "66870df5ba044061b5077e9b",
      id: "3216",
      exam_id: "1004",
      name: "हाल बीउ विजन बिक्रीवितरणको लागि अनुमति पत्र कसले दिने व्यवस्था छ ?",
      opt_a: "स्थानीय तह",
      opt_b: "कृषि ज्ञान केन्द्घ-कृषि विकास कार्यालय",
      opt_c: "राष्ट्रिय बीउ विजन समिति",
      opt_d: "बीउ विजन गुणस्तर नियन्त्रण केन्द्घ",
      opt_correct: "C",
      __v: 0,
    },
    {
      _id: "66870df5ba044061b507762d",
      id: "1058",
      exam_id: "1004",
      name: "जलवायुको हिसाबले नेपाललाई कति भागमा विभाजन गर्न सकिन्छ ?",
      opt_a: "3",
      opt_b: "4",
      opt_c: "5",
      opt_d: "6",
      opt_correct: "C",
      __v: 0,
    },
    {
      _id: "66870c51ba044061b5073b17",
      id: "10636",
      exam_id: "1001",
      name: "स्मृति सुधारका लागि मस्तिष्कमा गहिरो छाप पर्ने गरी विषयवस्तु सिकाउनुपर्दछ भन्ने मान्यता कुन सिद्धान्तले राख्दछ ?",
      opt_a: "प्रयोगको सिद्धान्त",
      opt_b: "स्मृति सुदृढीकरणको सिद्धान्तं",
      opt_c: "प्रत्यक्षीकरणको सिद्धान्त",
      opt_d: "अहस्तक्षेपको सिद्धान्त",
      opt_correct: "B",
      __v: 0,
    },
    {
      _id: "66870c51ba044061b507366d",
      id: "9442",
      exam_id: "1001",
      name: "Rojina buys commodities worth Rs. 6650. She gets a discount of 6% on it. After getting the discount she pays sales tax at 10%. Find the amount that she has to pay for the commodities.",
      opt_a: "Rs.6654",
      opt_b: "Rs.6876.10",
      opt_c: "Rs.6999.20",
      opt_d: "Rs.7000",
      opt_correct: "B",
      __v: 0,
    },
    {
      _id: "66870d84ba044061b5075b3a",
      id: "5155",
      exam_id: "1003",
      name: "Which Vertebrae is also called Prominence vertebrae",
      opt_a: "Cervical 1",
      opt_b: "Cervical 7",
      opt_c: "Lumber 5",
      opt_d: "Coccyx",
      opt_correct: "B",
      __v: 0,
    },
    {
      _id: "66870ec4ba044061b5079af9",
      id: "844",
      exam_id: "1009",
      name: "हवाइजहाजको हकमा सुराकी बिंदा के-के कुरा खुलाउनुपर्दछ ? (A) हवाई उडान नं. र समय (B) हवाई जहाजभित्र लुकाई पिछाई राखिएको स्थान (C) चोरी निकासी/पैठारी गर्ने व्यक्तिको सम्भव भएसम्म नाम निजको हुलिया र मालवस्तु लुकाई छिपाई ल्याउने तरिका (D) माथिका सबै",
      opt_a: "हवाई उडान नं. र समय",
      opt_b: "हवाई जहाजभित्र लुकाई पिछाई राखिएको स्थान",
      opt_c:
        "चोरी निकासी/पैठारी गर्ने व्यक्तिको सम्भव भएसम्म नाम निजको हुलिया र मालवस्तु लुकाई छिपाई ल्याउने तरिका",
      opt_d: "माथिका सबै",
      opt_correct: "D",
      __v: 0,
    },
    {
      _id: "66870c51ba044061b5073cba",
      id: "11055",
      exam_id: "1001",
      name: "सिकाईको थालनी प्रेरणा तथा अभ्यासले गर्दछ भने सिकाइको दरमा केले प्रभाव पार्दछ ?",
      opt_a: "अभ्यास",
      opt_b: "धारण",
      opt_c: "उत्प्रेरणा",
      opt_d: "पुनर्वल",
      opt_correct: "D",
      __v: 0,
    },
  ],
  currentQuestion: 0,
  currentExam: "1001",
};

export const QuizContext = createContext();

const QuizProvider = ({ children }) => {
  const [quizData, setQuizData] = useState(defaultQuizData);
  const { uploadScore } = useContext(ScoreContext);

  const router = useRouter();

  const resetQuizData = () => {
    setQuizData(defaultQuizData);
  };

  const startQuiz = (maxTimer) => {
    setQuizData((prev) => ({ ...prev, isPlaying: true }));
  };

  const endQuiz = async () => {
    setQuizData((prev) => ({ ...prev, isPlaying: false }));
    // alert("Quiz ended");
    await uploadScore();
    router.push("/quiz-end");
  };

  useEffect(() => {
    console.log("quizData Updated: ", quizData);
  }, [quizData, setQuizData]);

  return (
    <QuizContext.Provider
      value={{ quizData, setQuizData, resetQuizData, endQuiz, startQuiz }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export default QuizProvider;
