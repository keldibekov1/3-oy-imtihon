import { Router } from "express";
import { findAll, findOne } from "../controllers/uquvMarkaz.controller.js";


const uquvMarkazroute = Router();

uquvMarkazroute.get("/", findAll);
uquvMarkazroute.get("/", findOne);
uquvMarkazroute.get("/", findAll);
uquvMarkazroute.get("/", findAll);