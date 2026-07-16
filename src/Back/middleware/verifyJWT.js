import jwt from "jsonwebtoken";

export const verifyJWT = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    return res.status(401).json({
      message: "It is not allowed to continue, you have no permision.",
    });
  }

  if (!authorizationHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "It is not allowed to continue, you have no permision.",
    });
  }

  const token = authorizationHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Token was not provided",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      return res.status(401).json({
        message: "Something went wrong with user validation",
      });
    }
    req.user = decoded;
    next();
  });
};
