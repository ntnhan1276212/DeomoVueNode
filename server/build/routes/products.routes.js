"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = __importDefault(require("../controllers/product.controller"));
class ProductsRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.controller = new product_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post("/", this.controller.create);
        this.router.get("/", this.controller.findAll);
        this.router.get("/:id", this.controller.findOne);
        this.router.put("/:id", this.controller.update);
        this.router.delete("/:id", this.controller.delete);
    }
}
exports.default = new ProductsRoutes().router;
