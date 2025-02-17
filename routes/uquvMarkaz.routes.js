import { Router } from "express";
import { create, findAll, findOne, remove, update } from "../controllers/uquvMarkaz.controller.js";


const uquvMarkazroute = Router();

uquvMarkazroute.get("/", findAll);
uquvMarkazroute.get("/", findOne);
uquvMarkazroute.get("/", create);
uquvMarkazroute.get("/", update);
uquvMarkazroute.get("/", remove);

export default uquvMarkazroute;