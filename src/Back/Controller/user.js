import { userModel } from "../model/user.js";

export class UserController {
  static async modifyUser(req, res) {
    try {
      const { userInfo } = req.body;
      const id = req.params;
      const userID = req.user.id;
      const file = req.file;

      const {
        name,
        userImage,
        companyName,
        emailaddress,
        address,
        phoneNumber,
        postalCode,
        cityname,
      } = req.body;

      const userModified = await userModel.modifyUser(
        id,
        userID,
        file,
        name,
        userImage,
        companyName,
        emailaddress,
        address,
        phoneNumber,
        postalCode,
        cityname,
      );

      return res.status(200).json({ userModified });
    } catch (error) {
      return res
        .status(404)
        .json({ message: "There was not possible to modify user information" });
    }
  }
}
