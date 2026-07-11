import { authorizationModel } from "../model/authorization.js";

export class authorizationController {
  static async logIn(req, res) {
    try {
      const { email, password } = req.body;
      const user = await authorizationModel.userAuthorization(email, password);

      if (!user) {
        return res.status(404).json({ message: "Unexistence user" });
      }

      return res.status(200).json(user);
    } catch (error) {
      return res.status(404).json({
        message:
          "It was not possible to log in, please verify the information, once again.",
      });
    }
  }
}
