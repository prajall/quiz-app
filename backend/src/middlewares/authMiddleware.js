import jwt from "jsonwebtoken";

export const authorisedUser = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.send("Please Login").status(401);
    }

    const decodedData = jwt.decode(token, process.env.JWT_SECRET);
    req.userData = decodedData;

    next();
  } catch (error) {
    console.log(error);
    res.send("Internal Server Error").status(500);
  }
};
