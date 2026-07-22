import { db } from "../App";

export class userModel {
  static async modifyUser(
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
  ) {
    const user_image_url = file
      ? `http://localhost:${PORT}/uploads/${file.filename}`
      : null;

    const user = await db.execute({
      sql: `UPDATE Users set name = ?, email_address = ?, company_name = ?, address = ?, phone_number = ?, postal_code = ?, city = ?, ${file ? ",user_image_url = ?" : ""}`,
      args: [
        name,
        emailaddress,
        companyName,
        address,
        phoneNumber,
        postalCode,
        cityname,
        user_image_url,
      ],
    });

    return user.rowsAffected > 0
  }
}
