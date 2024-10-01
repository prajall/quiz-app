import jwt from "jsonwebtoken";

export const authorisedUser = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.send("Please Login").status(401);
    }

    const decodedData = jwt.decode(token, process.env.JWT_SECRET);
    req.userData = decodedData;

    if (!req.userData) {
      return res.send("Please Login").status(401);
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

export const etutorUserAuth = async (req, res, next) => {
  try {
    const { etutorId } = req.body;
    if (!etutorId) {
      return res.status(400).json({ message: "Etutor Id is required" });
    }

    const userDoc = await User.findOne({ etutorId });
    if (!userDoc) {
      return res.status(404).json({ message: "Quiz user not found" });
    }
    req.user = userDoc;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
