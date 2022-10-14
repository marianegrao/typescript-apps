import { useEffect, useState } from "react";
import User from "./components/User";
import api from "./services/api";

export interface IUser {
	id: number;
	name: string;
	email: string;
}

export default function App() {
	const [users, setUsers] = useState<IUser[]>([]);
	useEffect(() => {
		api.get<IUser[]>("users").then(({ data }) => {
			setUsers(data);
		});
	});
	return (
		<div>
			<h1>Hello Word</h1>
			{users && users.map((user) => <User key={user.id} user={user} />)}
		</div>
	);
}
