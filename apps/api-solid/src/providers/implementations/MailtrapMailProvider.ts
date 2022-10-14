import { IMailProvider, IMessage } from "./../IMailProvider";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

//segue um protocolo seguindo ImaailProvider
export class MailtrapMailProvider implements IMailProvider {
	private transporter: Mail;
	constructor() {
		this.transporter = nodemailer.createTransport({
			host: "smtp.mailtrap.io",
			port: 2525,
			auth: {
				user: "a502a89f1c62b0",
				pass: "4c15e35e1bd28d",
			},
		});
	}
	async sendMail(message: IMessage): Promise<void> {
		const { to, from, subject, body } = message;

		await this.transporter.sendMail({
			to: {
				name: to.name,
				address: to.email,
			},
			from: {
				name: from.name,
				address: from.email,
			},
			subject,
			html: message.body,
		});
	}
}
