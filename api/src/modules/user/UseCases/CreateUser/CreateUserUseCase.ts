import { client } from "../../../../../public/dbConnect";
import { UserRepository } from "../../repositories/UserRepository";
class CreateUserUseCase{
    constructor(private userRepository: UserRepository){}

    async execute({ name,email, password, isTeacher }): Promise<boolean>{
        const UserExists = await this.userRepository.findByEmail(email);
        if (UserExists) {
            return false;
        }
        this.userRepository.create({name,email, password, isTeacher});
        
        client.query(
            'INSERT INTO users (name, email, password, isteacher) VALUES (\$1, \$2, \$3, \$4)',
            [name, email, password, isTeacher]
        );
        return true;
    }
}

export {CreateUserUseCase}