import { Router } from "express";
import { create, findAll, findOne, remove, update } from "../controllers/uquvMarkaz.controller.js";


const uquvMarkazroute = Router();

uquvMarkazroute.get("/all", findAll);
uquvMarkazroute.get("/:id", findOne);
uquvMarkazroute.post("/", create);
uquvMarkazroute.get("/:id", update);
uquvMarkazroute.get("/:id", remove);


export default uquvMarkazroute;
