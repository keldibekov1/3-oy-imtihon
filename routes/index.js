import { Router } from "express";
import yunalishRoute from "./yunalish.routes.js";
import userLikeRoute from "./userLikes.routes.js";
import uquvMarkazroute from "./uquvMarkaz.routes.js";
import commentRoute  from "./comment.routes.js"
import filialRoute from "./filial.routes.js";
import faoliyatRoute from "./faoliyat.routes.js";
// import router from "./uquvMarkaz.routes.js";
const mainRoute = Router();

mainRoute.use("/yunalish",yunalishRoute);
// mainRoute.use("/uquvmarkaz",router);
mainRoute.use("/like",userLikeRoute);
mainRoute.use("/comment",commentRoute);
mainRoute.use("/filial",filialRoute);
mainRoute.use("/faoliyat",faoliyatRoute);



export default mainRoute;