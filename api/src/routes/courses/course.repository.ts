import { string } from "zod";
import { DatabaseConnector } from "../../database";
import { ResultValidation } from "../utils/result-validation";
import { insertCourseDatabaseType } from "./course.schemas";

export class CourseRepository {
    private databaseConnector: DatabaseConnector;

    constructor(dbConnector: DatabaseConnector){
        this.databaseConnector = dbConnector
    }

    async createCourse(course: insertCourseDatabaseType, resultValidation: ResultValidation){
        try{
            const result = await this.databaseConnector.server('courses').insert(course).returning('*');
            resultValidation.setResult({ data: result[0]});
        }catch(error){
            console.error(error);
            resultValidation.addError('Create Course Failed', `${error}`, true);
            // if (error.code === ) {
                
            // }
        }
    }

    async findByTeacher(teacher: string, resultValidation: ResultValidation){
        try {
            const result = await this.databaseConnector.server('courses').where(
                'teachers', '@>', [teacher]
            );
            if (result.length > 0) {
                resultValidation.setResult({data: result[0]});
            }else{
                resultValidation.addError('TEACHER ERROR', 'No courses assigned to this teacher');
            }
        }catch(error){
            console.log(error);
            resultValidation.addError('Find Course Failed', `${error}`, true);
        }
    }
    
    async findByStudent(student: string, resultValidation: ResultValidation){
        try {
            const result = await this.databaseConnector.server('courses').where(
                'students', '@>', [student]
            );
            if (result.length > 0) {
                resultValidation.setResult({data: result[0]});
            }else{
                resultValidation.addError('STUDENT ERROR', 'No courses assigned to this student');
            }
        }catch(error){
            console.log(error);
            resultValidation.addError('Find Course Failed', `${error}`, true);
        }
    }

    async findBySubject(subject: string, resultValidation: ResultValidation){
        try {
            const result = await this.databaseConnector.server('courses').where(
                'subjects', '@>', [subject]
            );
            if (result.length > 0) {
                resultValidation.setResult({data: result[0]});
            }else{
                resultValidation.addError('SUBJECTS ERROR', 'No courses assigned to this subject');
            }
        }catch(error){
            console.log(error);
            resultValidation.addError('Find Course Failed', `${error}`, true);
        }
    }
}
