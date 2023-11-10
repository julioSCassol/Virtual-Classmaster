import { v4 as uuidv4 } from "uuid";
import * as bcrypt from 'bcrypt';
class User{
    id?: string;
    name: string;
    email: string;
    password: string;
    isTeacher: boolean;
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidv4();
        }
    }

    async setPassword(rawPassword: string): Promise<void> {
        const saltRounds = 10;
        this.password = await bcrypt.hash(rawPassword, saltRounds);
    }

    async checkPassword(rawPassword: string): Promise<boolean> {
        return await bcrypt.compare(rawPassword, this.password);
    }

    // let isMatch = await user.checkPassword("myPassword");
    // if (isMatch) {
    //     console.log("Passwords match");
    // } else {
    //     console.log("Passwords do not match");
    // }

}
export {User}