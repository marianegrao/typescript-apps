import { Router } from "express";

const routes = Router();

routes.get("/", (req, res) => {
	return res.status(201).json('API startada e funcionante')
});

export default routes;
