import { Router } from "express";
import User from "./controllers/User";
const routes = Router();
routes.get("/users", User.showUsers);
routes.get("/create", User.createUser);
export default routes;
