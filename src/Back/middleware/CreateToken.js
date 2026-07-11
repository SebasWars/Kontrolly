import jwt from "jsonwebtoken";

export const createToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      isActive: user.isActive,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    },
  );
};
