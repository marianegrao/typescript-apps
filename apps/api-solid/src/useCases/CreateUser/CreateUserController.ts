import { CreateUserUseCase } from "./CreateUserUseCase";
import { Request, Response } from "express";

export class CreateUserController {
	constructor(private createUserUseCase: CreateUserUseCase) {}

	async handle(req: Request, res: Response): Promise<Response> {
		try {
			await this.createUserUseCase.execute(req.body);
			return res.status(201).send();
		} catch (err) {
			return res.status(400).json({
				message: err.message || "Unexpected error.",
			});
		}
	}
}
