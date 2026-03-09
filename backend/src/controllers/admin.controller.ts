import { Request, Response } from "express";
import { loginAdmin } from "../services/admin.service";

export const adminLogin = async (req: Request, res: Response) => {

  try {

    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password required"
      });
    }

    const token = await loginAdmin(username, password);

    res.json({
      message: "Login successful",
      token
    });

  } catch (error: any) {

    res.status(401).json({
      message: error.message
    });

  }
};