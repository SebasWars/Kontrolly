import jwt from "jsonwebtoken";

export const createToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      companyName: user.companyName,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    },
  );
};
