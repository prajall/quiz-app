export const isPremium = async (req, res, next) => {
  const user = req.user;
  if (!user) {
    console.log("No user found in isPremium middleware");
    return res.status(404).send("User not found");
  }

  if (user.isPremium) {
    next();
  } else {
    return res.status(403).send("Forbidden. Only for Premium users");
  }
};

export const coinChecker = (requestedCoin) => {
  return async (req, res, next) => {
    const user = req.user;
    if (!user) {
      console.log("No user found in coinChecker middleware");
      return res.status(404).send("User not found");
    }

    if (!user.isPremium && user.coins < requestedCoin) {
      return res.status(403).json({ message: "Not enough coins" });
    }
    next();
  };
};
