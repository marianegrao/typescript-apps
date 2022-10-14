import { ICreateUserRequestDTO } from "./CreateUserDTO";
import { IUsersRepository } from "./../../repositories/IUsersRepository";
import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";

// possui a funcionalidae unica de ver se email existe, e criar ou nao um novo usuario apartir disso
// delegando a funcao de salvar esse novo usuario criado para outro metodo/função
export class CreateUserUseCase {
	constructor(
		private usersRepository: IUsersRepository,
		private mailProvider: IMailProvider
	) {}

	async execute(data: ICreateUserRequestDTO) {
		const { name, email } = data;
		const userAlreadyExists = await this.usersRepository.findByEmail(
			data.email
		);

		if (userAlreadyExists) {
			throw new Error("User already exists.");
		}
		const user = new User(data);

		await this.usersRepository.save(user);

		const mailBody = {
			to: {
				name,
				email,
			},
			from: {
				name: "Minha equipe",
				email: "minha.equipre@email.com",
			},
			subject: "Agradecimento",
			body: "<h1>Obrigada</h1>",
		};
		this.mailProvider.sendMail(mailBody);
	}
}
