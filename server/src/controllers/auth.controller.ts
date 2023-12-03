import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { secretKey } from "../config/config";

export default class AuthController {
  login(req: Request, res: Response) {
    console.log('login')
    const {username, password} = req.body;

    if (username !== 'admin' || password !== '123456') {
      return res.status(401).json({
        message: "Authentication failed!",
      });
    } else {
      return res.json({
        id: 'c767f759-ed73-4f63-8725-f623a9b80a34',
        email: 'admin@gmail.com',
        fullname: 'Admin',
        role: 'admin',
        username: username,
        access_token: jwt.sign(
            {
              id: 'c767f759-ed73-4f63-8725-f623a9b80a34'
            },
            secretKey,
            {
              expiresIn: '8h'
            }
        )
      })
    }
  }
  register(req: Request, res: Response) {
    console.log(req.body)
    return res.send("1234 abn")
  }
}
