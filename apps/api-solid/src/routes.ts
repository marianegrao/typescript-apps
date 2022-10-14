import { Router } from "express";

const router = Router();
router.post("/users", (req, res) => {
	return res.send(201).send();
});

export { router };
