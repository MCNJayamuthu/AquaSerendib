import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findAdminByUsername } from "../dao/admin.dao";

export const loginAdmin = async (username: string, password: string) => {

  const admin = await findAdminByUsername(username);

  if (!admin) {
    throw new Error("Admin not found");
  }

  const isMatch = await bcrypt.compare(password, admin.password_hash);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    { id: admin.id, username: admin.username },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" }
  );

  return token;
};