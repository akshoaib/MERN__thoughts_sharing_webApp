import jwt from "jsonwebtoken";
export const isSignin = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const user = jwt.verify(token, process.env.SECRET_KEY);
  if (user) {
    req.user = user;
    next();
  } else {
    return res.status(400).json({ error: "Authorization required" });
  }
};
