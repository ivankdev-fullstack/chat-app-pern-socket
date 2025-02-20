import { Request, Response } from "express";

export const signup = async (req: Request, res: Response) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
  } catch (err) {}
};

export const login = async (req: Request, res: Response) => {};
export const logout = async (req: Request, res: Response) => {};
