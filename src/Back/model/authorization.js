import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { users } from "../MockData_Back.js";
import { createToken } from "../middleware/CreateToken.js";

const generateHash = async (password) => {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};

export class authorizationModel {
  static async userAuthorization(email, password) {
    const user = users.find((user) => user.email === email);

    if (!user) {
      return {
        success: false,
        error: "INVALID_USER",
      };
    }

    const validPassword = await bcrypt.compare(password, user.passwordHash);

    if (!validPassword) {
      return {
        success: false,
        error: "INVALID_PASSWORD",
      };
      ƒ;
    }

    const token = createToken(user);

    return {
      token,
      user: { id: user.id, companyName: user.companyName, email: user.email },
    };
  }

  static async createUser(userForm) {
    const userExist = users.find((user) => user.email === userForm.email);

    if (userExist) {
      return {
        success: false,
        error: "EMAIL_ALREADY_EXISTS",
      };
    }

    const passwordHash = await generateHash(userForm.password);

    const newUser = {
      id: crypto.randomUUID(),
      name: '',
      companyName: userForm.name,
      email: userForm.email,
      passwordHash,
      isActive: false,
    };

    const token = createToken(newUser);

    users.push(newUser);

    return {
      token,
      user: { id: newUser.id, name: newUser.name, email: newUser.email },
    };
  }
}
