import { User } from "../model/User";

class UserRepository {
    private users: User[];

    private static INSTANCE: UserRepository;

    private constructor() {
        this.users = [];
    }

    public static getInstance(): UserRepository{
        if(!UserRepository.INSTANCE){
            UserRepository.INSTANCE = new UserRepository();
        }
        return UserRepository.INSTANCE;
    }

    create({ name,email, password, isTeacher }){
        const user = new User();
        Object.assign(user,{
            name,
            email,
            password,
            isTeacher,
            created_at: new Date()
        });
        this.users.push(user);
    }
    list(): User[]{
        return this.users;
    }

    findByEmail(email: string): User | undefined{
        const user = this.users.find(user => user.email === email);
        return user;
    }
}

export {UserRepository}