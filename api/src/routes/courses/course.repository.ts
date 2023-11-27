import { string } from "zod";
import { DatabaseConnector } from "../../database";
import { ResultValidation } from "../utils/result-validation";
import { insertCourseDatabaseType, findCourseBySubjectType, findCourseByStudentType, findCourseByTeacherType } from "./course.schemas";

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
    async findByTeacher(course: findCourseByTeacherType, resultValidation: ResultValidation) {
        try {
            const results = await this.databaseConnector.server('courses').where(
                'teachers', '&&', course.teachers
            );
    
            if (results.length > 0) {
                resultValidation.setResult({ data: results });
                return results;
            } else {
                resultValidation.addError('TEACHER ERROR', 'No courses assigned to this teacher');
                return [];
            }
        } catch (error) {
            console.log(error);
            resultValidation.addError('Find Course Failed', `${error}`, true);
            return [];
        }
    }
    
    
    async findByStudent(course: findCourseByStudentType, resultValidation: ResultValidation){
        try {
            const results = await this.databaseConnector.server('courses').where(
                'students', '&&', course.students
            );
            if (results.length > 0) {
                resultValidation.setResult({data: results});
                return results
            }else{
                resultValidation.addError('STUDENT ERROR', 'No courses assigned to this student');
                return [];
        }
        }catch(error){
            console.log(error);
            resultValidation.addError('Find Course Failed', `${error}`, true);
            return [];
        }
    }

    async findBySubject(course: findCourseBySubjectType, resultValidation: ResultValidation) {
        try {
            const results = await this.databaseConnector.server('courses').where(
                'subjects', '&&', course.subjects
            );
    
            if (results.length > 0) {
                resultValidation.setResult({ data: results });
                return results
            } else {
                resultValidation.addError('SUBJECTS ERROR', 'No courses assigned to these subjects');
            return [];
        }
            
        } catch (error) {
            console.log(error);
            resultValidation.addError('Find Course Failed', `${error}`, true);
            return [];
        }
    }
    
    
}
