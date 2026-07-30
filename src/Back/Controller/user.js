import { userModel } from "../model/user.js";

export class UserController {
  static async modifyUser(req, res) {
    try {
      const { id } = req.params;
      const userID = req.user.id;
      const file = req.file;

      const {
        name,
        companyName,
        emailaddress,
        address,
        phoneNumber,
        postalCode,
        city,
      } = req.body;

      const userModified = await userModel.modifyUser(
        id,
        userID,
        file,
        name,
        companyName,
        emailaddress,
        address,
        phoneNumber,
        postalCode,
        city,
      );

      return res.status(200).json(userModified);
    } catch (error) {
      console.error("Error en modifyUser:", error);
      return res.status(500).json({
        message: "There was not possible to modify user information",
      });
    }
  }

  static async modifyPassword(req, res) {
    try {
      const { id } = req.params;
      const { currentPassword, newPassword, newPasswordConfirmation } = req.body;

      if (!currentPassword || !newPassword || !newPasswordConfirmation) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const modifyPassword = await userModel.modifyPassword(
        id,
        currentPassword,
        newPassword,
        newPasswordConfirmation,
      );

      if (
        !modifyPassword.success &&
        modifyPassword.error === "USER_NOT_FOUND"
      ) {
        return res.status(404).json({ message: "User not found" });
        return;
      }

      if (
        !modifyPassword.success &&
        modifyPassword.error === "INCORRECT_PASSWORD"
      ) {
        return res
          .status(400)
          .json({ message: "current password is incorrect" });
        return;
      }
      if (!modifyPassword.success && modifyPassword.error === "NOT_MATCH") {
        return res
          .status(400)
          .json({
            message: "New password and passwordConfirmation are note the same",
          });
        return;
      }

      return res
        .status(200)
        .json({ message: "Password was updated successfully!" });
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}
