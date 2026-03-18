import { Request, Response } from "express";
import { supabase } from "../config/supabaseClient";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export const adminLogin = async (req: Request, res: Response) => {

  try {

    const { username, password } = req.body;

    const { data, error } = await supabase
      .from("admins")
      .select("*")
      .eq("username", username)
      .single();

    if (error || !data) {
      return res.status(401).json({
        message: "Invalid username or password"
      });
    }

    const passwordMatch = await bcrypt.compare(password, data.password_hash);

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid username or password"
      });
    }

    const token = jwt.sign(
      { adminId: data.id },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Login successful",
      token
    });

  } catch (error: any) {

    res.status(500).json({
      message: "Login failed",
      error: error.message
    });

  }

};