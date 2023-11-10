import { v4 as uuidv4 } from "uuid";
class Course{
    id?: string;
    name: string;
    description: string;
    subjects: string [];
    teachers: string [];
    student: string [];
    created_at: Date;
    

    constructor() {
        if (!this.id) {
            this.id = uuidv4();
        }
    }
}

export {Course};