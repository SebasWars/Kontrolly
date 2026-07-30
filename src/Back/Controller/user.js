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
}
