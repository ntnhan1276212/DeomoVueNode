"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
function login(req, res) {
    console.log('login');
    const { username, password } = req.body;
    if (username !== 'admin' || password !== '123456') {
        return res.status(401).json({
            message: "Authentication failed!",
        });
    }
    else {
        return res.json({
            id: 'c767f759-ed73-4f63-8725-f623a9b80a34',
            email: 'admin@gmail.com',
            fullname: 'Admin',
            role: 'admin',
            username: username,
            access_token: jsonwebtoken_1.default.sign({
                id: 'c767f759-ed73-4f63-8725-f623a9b80a34'
            }, config_1.secretKey, {
                expiresIn: '8h'
            })
        });
    }
}
exports.login = login;
