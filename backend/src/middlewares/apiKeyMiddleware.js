const validApiKeys = [
  {
    key: "123456789",
    role: "admin",
  },
  {
    key: "987654321",
    role: "user",
  },
  {
    key: "121212121",
    role: "user",
  },
  {
    key: "121212121",
    role: "admin",
  },
];

export const apiKeyValidation = async (req, res, next) => {
  const apiKey = req.header("apiKey");

  if (!apiKey) {
    return res.status(404).json({ message: "Missing API key" });
  }
  const apiKeyObject = validApiKeys.find((keyObj) => keyObj.key === apiKey);

  if (apiKeyObject) {
    req.apiObject = apiKeyObject;
    next();
  } else {
    res.status(403).json({ message: "Forbidden: Invalid API key" });
  }
};
