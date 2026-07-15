import { authorizationModel } from "../model/authorization.js";

export class authorizationController {
  static async logIn(req, res) {
    try {
      const { email, password } = req.body;
      const user = await authorizationModel.userAuthorization(email, password);

      if (!user.success && user.error === "INVALID_USER") {
        return res.status(404).json({ message: "User not found" });
        return;
      }

      if (!user.success && user.error === "INVALID_PASSWORD") {
        return res.status(401).json({ message: "Password incorrect" });
      }

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  static async createUser(req, res) {
    try {
      const userForm = req.body;
      const newUser = await authorizationModel.createUser(userForm);

      if (!newUser.success && newUser.error === "EMAIL_ALREADY_EXISTS") {
        return res.status(409).json({
          message:
            "This email address is already associated with another account.",
        });
      }

      if (!newUser.success && newUser.error === "PASSWORD_LENGTH") {
        return res
          .status(400)
          .json({ message: "Password length is not enough" });
      }

      return res.status(201).json(newUser);
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}
