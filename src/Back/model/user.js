import { db, PORT } from "../App.js";

export class userModel {
  static async modifyUser(
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
  ) {
    const user_image_url = file
      ? `http://localhost:${PORT}/uploads/${file.filename}`
      : null;

    const sql = `
      UPDATE Users
      SET name = ?, email_address = ?, company_name = ?, address = ?,
          phone_number = ?, postal_code = ?, city = ?
          ${file ? ", user_image_url = ?" : ""}
      WHERE id = ?
    `;

    const args = [
      name ?? null,
      emailaddress ?? null,
      companyName ?? null,
      address ?? null,
      phoneNumber ?? null,
      postalCode ?? null,
      city ?? null,
    ];

    if (file) {
      args.push(user_image_url);
    }
    args.push(id);

    await db.execute({ sql, args });

    const result = await db.execute({
      sql: `SELECT id, user_image_url, name, company_name, email_address, password_hash , address, phone_number, postal_code, city FROM Users WHERE id = ?`,
      args: [id],
    });

    const updatedUser = result.rows[0];

    return {
      id: updatedUser.id,
      name: updatedUser.name,
      userImage: updatedUser.user_image_url,
      companyName: updatedUser.company_name,
      email: updatedUser.email_address,
      address: updatedUser.address,
      phoneNumber: updatedUser.phone_number,
      postalCode: updatedUser.postal_code,
      city: updatedUser.city,
    };
  }
}
