import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";

interface CustomRequest extends Request {
  userid?: string;
}


export async function middleware(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.cookies?.jwttoken;

    if (!token) {
      return res.status(401).json({
        msg: "token not found",
      });
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET not defined");
    }
    const decoded = jwt.verify(token, secret) as { id: string };


    if (!decoded) {
      return res.status(401).json({
        msg: "invalid token",
      });
    }

    req.userid = decoded.id as string;

    next();
  } catch (error) {
    return res.status(401).json({
      msg: "invalid or expired token",
    });
  }
}