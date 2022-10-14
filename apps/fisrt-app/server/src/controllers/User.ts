import { Request, Response } from "express";
const users = [
	{ id: 1, name: "Diego", email: "diego@rocketseat.com" },
	{ id: 2, name: "Diego", email: "diego@rocketseat.com" },
	{ id: 3, name: "Diego", email: "diego@rocketseat.com" },
];
import EmailService from "../services/EmailServices";

const showUsers = async (req: Request, res: Response) => {
	return res.status(200).json(users);
};

const createUser = async (req: Request, res: Response) => {
	const emailService = new EmailService();
	const user = {
		name: "Usuario",
		email: "usuario@email.com",
	};
	const message = {
		subject: `Olá ${user.name}`,
		body: `Seja muito bem vindo!`,
	};

	emailService.sendMail({ to: user, message });
	return res.status(200).json("Email enviado com sucesso");
};
export default { showUsers, createUser };
