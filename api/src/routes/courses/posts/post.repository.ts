import { DatabaseConnector } from "../../../database";
import { ResultValidation } from "../../utils/result-validation";
import { findCourseByTeacherType, idCourseType } from "../course.schemas";
import { deletePostType, insertAssignmentDatabaseType, insertPostDatabaseType } from "./post.schemas";

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

    async getPostsByCourse(course_id, resultValidation: ResultValidation) {
        try {
            console.log('Course ID:', course_id.course_id);
            
            // verifica por meio da FK
            const posts = await this.databaseConnector.server('posts').where({
                course_id: course_id.course_id,
            });
    
            if (posts.length > 0) {
                resultValidation.setResult({ data: posts });
            } else {
                resultValidation.addError('POSTS ERROR', 'No Posts Found for the Course');
            }
        } catch (error) {
            console.error(error);
            resultValidation.addError('Find Posts Failed', `${error}`, true);
        }
    }
    
    async getPostsByTeacher(teacher_id, resultValidation: ResultValidation) {
        try {
            console.log('Course ID:', teacher_id.course_id);
            
            // verifica por meio da FK
            const posts = await this.databaseConnector.server('posts').where({
                teacher: teacher_id.teacher,
            });
    
            if (posts.length > 0) {
                resultValidation.setResult({ data: posts });
            } else {
                resultValidation.addError('POSTS ERROR', 'No Posts Found for the Course');
            }
        } catch (error) {
            console.error(error);
            resultValidation.addError('Find Posts Failed', `${error}`, true);
        }
    }
    async deletePost(id: string, resultValidation: ResultValidation){
      try{
        const result = await this.databaseConnector.server('posts').where({id}).del().returning('*');
        resultValidation.setResult({ data: result[0] });
      }catch(error){
        console.log(error);
        resultValidation.addError('Delete Post Failed', `${error}`, true);
      }
    }
}
