import { Request, Response } from "express";
import UserModel from "../Databases/UserModel.js";
import bcrypt from "bcrypt";
import { createtoken } from "../utils/jwt.config.js";
import { ObjectId } from "mongoose";

export async function register(req: Request, res: Response) {
  
  const { username, email, password } = req.body;
  if (!username) {
    return res.status(400).json({ msg: "username required" });
  }

  if (!email) {
    return res.status(400).json({ msg: "email required" });
  }

  if (!password) {
    return res.status(400).json({ msg: "password required" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ msg: "Email already exists" });
  }

  await UserModel.create({
    username,
    email,
    password: hashedPassword
  });

  return res.status(201).json({
    msg: "user created"
  });
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ msg: "email required" });
    }
  
    if (!password) {
      return res.status(400).json({ msg: "password required" });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ msg: "user not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ msg: "invalid credentials" });
    }

    const token = createtoken(user._id.toString());

    if (!token) {
      return res.status(500).json({ msg: "unable to create token" });
    }

    res.cookie("jwttoken", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000
    });

    return res.status(200).json({
      msg: "login successful",
      user
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return res.status(500).json({
      msg: "internal server error"
    });
  }
}

export async function logout(req: Request, res: Response) {
  res.clearCookie("jwttoken");

  return res.status(200).json({
    msg: "user logged out"
  });
}

export async function validateuser(req: Request, res: Response) {
  return res.status(200).json({
    msg: "validated (dummy)"
  });
}