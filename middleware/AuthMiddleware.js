import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send("Unauthorized!");
  }

  let secretKey = process.env.ACCESS_TOKEN_SECRET || "secret";
  const token = req.headers.authorization.split(" ")[1];

  try {
    const credential = jwt.verify(token, secretKey);

    if (credential) {
      req.app.locals.credential = credential;
      return next();
    }

    return res.send("token invalid");
  } catch (error) {
    return res.send(error);
  }
};
