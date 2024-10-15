import axios from "axios";

export const fetchQuestions = async (examId) => {
  try {
    if (examId != "random") {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/question/exam/${examId}?limit=10`
      );
      return response.data;
    } else {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URLBLIC_API_URL}/question/random?limit=10`
      );
      return response.data;
    }
  } catch (error) {
    if (err.message == "Network Error") {
      toast.error("Error Connecting to the Server");
      return;
    }
    if (error.response.data) {
      toast.error(error.response.data);
    } else if (error.message) {
      toast.error(error.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const fetchLeaderboard = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/leaderboard`,
      {
        headers: {
          apiKey: 123456789,
        },
      }
    );
    if (response.status == 200) {
      return response.data.concat(response.data);
    } else {
      toast.error("Failed to load Leaderboard");
    }
  } catch (err) {
    console.log("Leaderboard Fetching error.", err);
    if (err.response) {
      toast.error(err.response?.message);
    } else if (err.message) {
      toast.error(err.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};
