import axios from "axios";

export const fetchQuestions = async (examId) => {
  console.log(examId);
  try {
    if (examId != "random") {
      const response = await axios.get(
        `http://localhost:3001/question/exam/${examId}?limit=10`
      );
      return response.data;
    } else {
      const response = await axios.get(
        `http://localhost:3001/question/random?limit=10`
      );
      return response.data;
    }
  } catch (error) {
    console.log("ApiCalls Error 1:", error);
  }
};
