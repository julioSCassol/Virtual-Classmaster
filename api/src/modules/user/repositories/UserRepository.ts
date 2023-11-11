import { client } from "../../../../public/dbConnect";
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

    async create({ name,email, password, isTeacher }){
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

    async findByEmail(email: string): Promise<User>{
        const result = client.query('SELECT email from users');
        const users = (await result).rows;
        const user = users.find(user => user.email === email);
        console.log(user);
        return user;
    }
}

export {UserRepository}