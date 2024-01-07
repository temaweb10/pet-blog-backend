import jwt from "jsonwebtoken";

export default (req, res, next) => {
  console.log("up");
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
  console.log(token);
  if (token) {
    try {
      const decoded = jwt.verify(token, "sercetkeyy");

      req.userId = decoded._id;
      next();
    } catch (error) {
      console.log(error);
      return res.status(403).json({
        message: "Нет доступа",
      });
    }
  } else {
    return res.status(403).json({
      message: "Нет доступа",
    });
  }
};
