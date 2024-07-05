import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import userRoutes from "./routes/user.js";
import courseRoutes from "./routes/course.js";
import subscriptionRoutes from "./routes/subscription.js";
import lessonRoutes from "./routes/lesson.js";
import supportMaterialRoutes from "./routes/supportmaterial.js";
import tokenRoutes from "./routes/token";

dotenv.config();

const whiteList = ["http://localhost:3000"];

const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors(corsOptions));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use("/users", userRoutes);
    this.app.use("/courses", courseRoutes);
    this.app.use("/subscriptions", subscriptionRoutes);
    this.app.use("/lessons", lessonRoutes);
    this.app.use("/supportmaterials", supportMaterialRoutes);
    this.app.use("/tokens/", tokenRoutes);
  }
}

export default new App().app;
