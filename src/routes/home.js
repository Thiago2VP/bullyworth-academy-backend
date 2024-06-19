import dotenv from "dotenv";
import { Router } from "express";
import homeController from "../controllers/Home.js";

dotenv.config();

const router = new Router();

export default router.get("/", homeController.index);
