import { Application } from "express";
import tutorialRoutes from "./tutorial.routes";
import homeRoutes from "./home.routes";
import authRoutes from "./auth.routes";
import { verifyToken } from "../middlewares/auth.middleware";
import Products from "./products.routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/api/tutorials", tutorialRoutes);
    app.use("/api/products", verifyToken, Products);
    // app.use("/api/tutorials", verifyToken, tutorialRoutes);
    app.use("/api/auth", authRoutes);
    app.use("/api", homeRoutes);
  }
}