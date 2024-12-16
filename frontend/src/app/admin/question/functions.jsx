const checkQuestionValidation = (data) => {
  let setErrorFlag = false;
  if (!imagePreviews.question && !data.question.name) {
    setError("question.name", {
      type: "required",
      message: "Either Name or Image is required",
    });
    uploadQuestion = false;
  }
  ["A", "B", "C", "D"].forEach((option) => {
    if (!imagePreviews[`opt_${option}`] && !data[`opt_${option}`].name) {
      setError(`opt_${option}.name`, {
        type: "required",
        message: `Either Name or Image for Option ${option} is required`,
      });
      uploadQuestion = false;
    }
  });

  if (setErrorFlag) return;
};
