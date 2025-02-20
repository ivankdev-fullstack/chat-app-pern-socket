import { Request, Response } from "express";
import prisma from "../db/prisma.js";

export const me = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user) {
      res.status(404).json({ error: "User not found." });
      return;
    }

    res.status(200).json({
      id: user.id,
      fullName: user.fullname,
      username: user.username,
      profilePic: user.avatarImg,
    });
  } catch (err: any) {
    console.log("Error in `me` controller.", err.message);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

export const signup = async (req: Request, res: Response) => {};
export const login = async (req: Request, res: Response) => {};
export const logout = async (req: Request, res: Response) => {};
