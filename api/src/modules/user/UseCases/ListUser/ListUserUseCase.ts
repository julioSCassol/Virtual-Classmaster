import { User } from "../../model/User";
import { UserRepository } from "../../repositories/UserRepository";

class ListUserUseCase{
    constructor(private userRepository:UserRepository){}
    execute(): User[]{
        const users = this.userRepository.list();
        return users;
    }
}

export {ListUserUseCase}