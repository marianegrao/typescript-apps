import { User } from "../entities/User";

// uma interface q define todos os metodos existentes independentemente de qual repositorio(bando de dados) eu vo mandar
export interface IUsersRepository {
	findByEmail(email: string): Promise<User | undefined>;
	save(user: User): Promise<void>;
	//save(user: User): () => void
}
