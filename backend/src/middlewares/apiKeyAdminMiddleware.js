export const apiKeyAdminValidation = async (req, res, next) => {
  const apiObject = req.apiObject;

  if (apiObject.role === "admin") {
    next();
  } else {
    res
      .status(403)
      .json({ message: "Forbidden: Only Admins can perform this action" });
  }
};
