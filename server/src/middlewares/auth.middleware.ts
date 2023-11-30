import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { secretKey } from "../config/config";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const headerAuthorization = req.headers["authorization"];
  const token = headerAuthorization ? headerAuthorization.split(" ")[1] : undefined;
  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, secretKey, (error, decode) => {
    if (error) return res.status(403);

    console.log(decode)

    next();
  })
}