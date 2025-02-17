import { Router } from "express";
import { create, findAll, findOne, remove, update } from "../controllers/userLikes.controller.js";


const userLikeRoute = Router();

userLikeRoute.get("/all", findAll);
userLikeRoute.get("/:id", findOne);
userLikeRoute.get("/", create);
userLikeRoute.get("/:id", update);
userLikeRoute.get("/:id", remove);

export default userLikeRoute;