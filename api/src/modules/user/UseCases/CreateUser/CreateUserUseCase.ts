import { UserRepository } from "../../repositories/UserRepository";

class CreateUserUseCase{
    constructor(private userRepository: UserRepository){}

    execute({ name,email, password, isTeacher }){
        const UserExists = this.userRepository.findByEmail(email);
        if (UserExists) {
            throw new Error("Este Usuário já existe");
        }
        this.userRepository.create({name,email, password, isTeacher});
    }
}

export {CreateUserUseCase}