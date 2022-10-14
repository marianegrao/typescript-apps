import { IUser } from "../App";

interface UserProps {
	user: IUser;
}

export default function User({ user }: UserProps) {
	return (
		<div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
			<strong>Nome: {user.name}</strong> <br />
			<strong>E-mail: {user.email}</strong>
		</div>
	);
}
