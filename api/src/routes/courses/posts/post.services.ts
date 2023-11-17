import { FastifyRequest } from "fastify";
import { ResultValidation } from "../../utils/result-validation";
import { PostRepository } from "./post.repository";
import { createAssignmentType, createPostType } from "./post.schemas";
import { resultSchemaType } from "../../utils/resultSchema";

export class PostService{
    private repository: PostRepository;
    
    constructor(postRepository: PostRepository){
        this.repository = postRepository;
    }

    async createPost(req: FastifyRequest, body: createPostType, resultValidation: ResultValidation){
        const {content, indexed_material, course_id, subjects_post} = body;

        if (req.user.is_teacher === true) {
            const teacherId = req.user.id;
    
            const post = {
                id: crypto.randomUUID(),
                teacher: teacherId,
                content,
                course_id,
                indexed_material,
                subjects_post,
                created_at: new Date()
            };
            await this.repository.createPost(post, resultValidation);
        }else{
            resultValidation.addError("User is not a teacher", "NAT", false);
        }
        return resultValidation;
    }

    async createAssignment(req: FastifyRequest, body: createAssignmentType, resultValidation: ResultValidation){
        const {content, indexed_material,course_id, limit_date, max_points, subjects_post} = body;

        if (req.user.is_teacher === true) {
            const teacherId = req.user.id;
    
            const post = {
                id: crypto.randomUUID(),
                teacher: teacherId,
                content,
                indexed_material,
                course_id,
                subjects_post,
                limit_date,
                max_points,
                created_at: new Date()
            };
            await this.repository.createAssignment(post, resultValidation);
        }else{
            resultValidation.addError("User is not a teacher", "NAT", false);
        }
        return resultValidation;
    }

    async getPostsByCourse(resultValidation: ResultValidation, req: FastifyRequest){
        const course_id = req.query;
        await this.repository.getPostsByCourse(course_id, resultValidation);
        return resultValidation
    }

    async getPostsByTeacher(resultValidation: ResultValidation, req: FastifyRequest){
        const teacher_id = req.query;
        await this.repository.getPostsByTeacher(teacher_id, resultValidation);
        return resultValidation;
    }
}