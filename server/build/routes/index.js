"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tutorial_routes_1 = __importDefault(require("./tutorial.routes"));
const home_routes_1 = __importDefault(require("./home.routes"));
const auth_routes_1 = __importDefault(require("./auth.routes"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const products_routes_1 = __importDefault(require("./products.routes"));
class Routes {
    constructor(app) {
        app.use("/api/tutorials", tutorial_routes_1.default);
        app.use("/api/products", auth_middleware_1.verifyToken, products_routes_1.default);
        // app.use("/api/tutorials", verifyToken, tutorialRoutes);
        app.use("/api/auth", auth_routes_1.default);
        app.use("/api", home_routes_1.default);
    }
}
exports.default = Routes;
