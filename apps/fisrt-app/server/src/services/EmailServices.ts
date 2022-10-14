interface IMailTo {
	name: string;
	email: string;
}
interface IMessageTo {
	subject: string;
	body: string;
	attachment?: string[];
}

//Data Transfer Object (DTO)
interface IMessageDTO {
	to: IMailTo;
	message: IMessageTo;
}

class EmailService {
	sendMail({ to, message }: IMessageDTO) {
		console.log(`email enviado para ${to.name} : ${message.subject}`);
	}
}

export default EmailService;
