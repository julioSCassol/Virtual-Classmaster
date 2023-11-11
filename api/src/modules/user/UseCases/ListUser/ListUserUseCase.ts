import { client } from "../../../../../public/dbConnect";
import { User } from '../../model/User';
import { UserRepository } from "../../repositories/UserRepository";

class ListUserUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(): Promise<User[]> {
        const result = await client.query(
            'SELECT name, email, password, isteacher FROM users'
        );
        
        const users = result.rows;
        return users;
    }
}

export { ListUserUseCase };
