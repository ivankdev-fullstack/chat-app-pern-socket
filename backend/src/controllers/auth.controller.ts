import { Request, Response } from "express";
import prisma from "../db/prisma.js";
import generateToken from "../utils/generateToken.js";
import getAvatarByGender from "../utils/getAvatarByGender.js";
import hashPassword from "../utils/hashPassword.js";

export const me = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user) {
      res.status(404).json({ error: "User not found." });
      return;
    }

    res.status(200).json({
      id: user.id,
      fullname: user.fullname,
      username: user.username,
      profilePic: user.avatarImg,
    });
  } catch (err: any) {
    console.log("Error in `me` controller.", err.message);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

export const signup = async (req: Request, res: Response) => {
  try {
    const { fullname, username, password, confirmPassword, gender } = req.body;
    if (!fullname || !username || !password || !confirmPassword || !gender) {
      res.status(400).json({ error: "Please fill in all fields." });
      return;
    }

    if (password !== confirmPassword) {
      res.status(400).json({ error: "Passwords don't match." });
      return;
    }

    const user = await prisma.user.findUnique({ where: { username } });
    if (user) {
      res.status(400).json({ error: "Username already exists." });
      return;
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await prisma.user.create({
      data: {
        fullname,
        username,
        password: hashedPassword,
        gender,
        avatarImg: getAvatarByGender(username, gender),
      },
    });

    if (newUser) {
      generateToken(newUser.id, res);

      res.status(201).json({
        id: newUser.id,
        fullname: newUser.fullname,
        username: newUser.username,
        avatarImg: newUser.avatarImg,
      });
    } else {
      res.status(400).json({ error: "Invalid user data." });
    }
  } catch (err: any) {
    console.log("Error in signup controller.", err.message);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

export const login = async (req: Request, res: Response) => {};
export const logout = async (req: Request, res: Response) => {};
