import jwt from "jsonwebtoken";
import { users } from "../MockData_Back.js";

export class authorizationModel {
  static async userAuthorization(email, password) {
    const user = users.find((user) => user.email === email);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
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

    return {
      token,
      user: { id: user.id, name: user.name, email: user.email },
    };
  }
}
