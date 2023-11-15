import { DatabaseConnector } from "../../../database";
import { ResultValidation } from "../../utils/result-validation";
import { findCourseByTeacherType, idCourseType } from "../course.schemas";
import { insertAssignmentDatabaseType, insertPostDatabaseType } from "./post.schemas";

export class PostRepository{
    private databaseConnector: DatabaseConnector
    constructor(dbConnector: DatabaseConnector){
        this.databaseConnector = dbConnector;
    }

    async createPost(post:insertPostDatabaseType , resultValidation: ResultValidation){
        try{
            const result = await this.databaseConnector.server('posts').insert(post).returning('*');
            resultValidation.setResult({ data: result[0] });
        }catch(error){
            console.log(error);
            resultValidation.addError('Create Post Failed', `${error}`, true);
        }
    }

    async createAssignment(assignment:insertAssignmentDatabaseType, resultValidation: ResultValidation){
        try{
            const result = await this.databaseConnector.server('posts').insert(assignment).returning('*');
            resultValidation.setResult({ data: result[0] });
        }catch(error){
            console.log(error);
            resultValidation.addError('Create Post Failed', `${error}`, true);
        }
    }

    async getPostsByCourse(course_id, resultValidation: ResultValidation){
        try {
            console.log('Course ID:', course_id.course_id);
            const result = await this.databaseConnector.server('courses').where({
                id: course_id.course_id,
            });
            if(result.length > 0){
                resultValidation.setResult({data: result[0]});
            }else{
                resultValidation.addError('COURSE ERROR', 'Course Not Found');
            }
        } catch (error) {
            console.error(error);
            resultValidation.addError('Find Course Failed', `${error}`, true);
            
        }
    }
}