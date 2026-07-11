import { Router } from "express";
import { users } from "../MockData_Back.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { use } from "react";

export const authRoute = Router();

authRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = users.find((user) => user.email === email);

  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  const validatePassword = await bcrypt.compare(password, user.passwordHash);
  if (!validatePassword) {
    return res.status(401).json({ message: "Password invalid" });
  }

  const token = jwt.sign(
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

  res.json({
    token,
    user: { id: user.id, name: user.name, email: user.email },
  });
});
