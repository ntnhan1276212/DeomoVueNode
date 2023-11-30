"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const verifyToken = (req, res, next) => {
    const headerAuthorization = req.headers["authorization"];
    const token = headerAuthorization ? headerAuthorization.split(" ")[1] : undefined;
    if (!token) {
        return res.sendStatus(401);
    }
    jsonwebtoken_1.default.verify(token, config_1.secretKey, (error, decode) => {
        if (error)
            return res.status(403);
        console.log(decode);
        next();
    });
};
exports.verifyToken = verifyToken;
