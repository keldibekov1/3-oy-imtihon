import { Router } from "express";
import { create, findAll, findOne, remove, update } from "../controllers/yunalish.controller.js";


const yunalishRoute = Router();

yunalishRoute.get("/all", findAll);
yunalishRoute.get("/:id", findOne);
yunalishRoute.get("/", create);
yunalishRoute.get("/:id", update);
yunalishRoute.get("/:id", remove);

export default yunalishRoute;