"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
const config_1 = require("../config/config");
exports.default = mysql2_1.default.createConnection({
    host: config_1.dbConfig.HOST,
    user: config_1.dbConfig.USER,
    password: config_1.dbConfig.PASSWORD,
    database: config_1.dbConfig.DB
});
