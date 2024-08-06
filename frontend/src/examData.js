export const exams = [
  {
    exam_id: "1001",
    name: "शिक्षा सेवा आयोग",
  },
  {
    exam_id: "1002",
    name: "बैंक",
  },
  {
    exam_id: "1003",
    name: "स्वास्थ्य",
  },
  {
    exam_id: "1004",
    name: "कृषि",
  },
  {
    exam_id: "1005",
    name: "पशु चिकित्सा",
  },
  {
    exam_id: "1006",
    name: "नेपाल टेलिकम",
  },
  {
    exam_id: "1007",
    name: "नासु खरिदार",
  },
  {
    exam_id: "1008",
    name: "वन रक्षक",
  },
  {
    exam_id: "1009",
    name: "भन्सार एजेन्ट",
  },
  {
    exam_id: "1010",
    name: "सामान्य ज्ञान (GK)",
  },
];

export const examIdToName = (id) => {
  return exams.find((exam) => exam.exam_id === id)?.name || id;
};
