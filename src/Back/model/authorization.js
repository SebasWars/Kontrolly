import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { createToken } from "../middleware/CreateToken.js";
import { db } from "../App.js";
import { randomUUID } from "node:crypto";

const generateHash = async (password) => {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};

export class authorizationModel {
  static async userAuthorization(email, password) {
    const userResult = await db.execute({
      sql: "SELECT id, user_image_url, name, company_name, email_address, address, phone_number, postal_code, city, password_hash FROM Users WHERE email_address = ?",
      args: [email],
    });

    const user = userResult.rows[0];

    if (!user) {
      return {
        success: false,
        error: "INVALID_USER",
      };
    }

    const validPassword = await bcrypt.compare(password, user.password_hash);

    if (!validPassword) {
      return {
        success: false,
        error: "INVALID_PASSWORD",
      };
    }

    const token = createToken({
      id: user.id,
      email: user.email_address,
      companyName: user.company_name,
    });

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        userImage: user.user_image_url,
        companyName: user.company_name,
        email: user.email_address,
        address: user.address,
        phoneNumber: user.phone_number,
        postalCode: user.postal_code,
        city: user.city,
      },
    };
  }

  static async createUser(userForm) {
    const userResult = await db.execute({
      sql: "SELECT email_address FROM Users WHERE email_address = ?",
      args: [userForm.email],
    });
    const userExist = userResult.rows[0];

    if (userExist) {
      return {
        success: false,
        error: "EMAIL_ALREADY_EXISTS",
      };
    }
    if (userForm.password.length < 7) {
      return {
        success: false,
        error: "PASSWORD_LENGTH",
      };
    }
    const passwordHash = await generateHash(userForm.password);
    const id = randomUUID();

    await db.execute({
      sql: "INSERT INTO Users (id, user_image_url, name, company_name, email_address, password_hash , address, phone_number, postal_code, city) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      args: [
        id,
        null,
        null,
        userForm.companyName,
        userForm.email,
        passwordHash,
        null,
        null,
        null,
        null,
      ],
    });

    const newUser = {
      id,
      email: userForm.email,
      companyName: userForm.companyName,
    };

    const token = createToken(newUser);

    return {
      token,
      user: {
        id,
        userImage: null,
        companyName: userForm.companyName,
        email: userForm.email,
        name: null,
        address: null,
        phoneNumber: null,
        postalCode: null,
        city: null,
      },
    };
  }
}
