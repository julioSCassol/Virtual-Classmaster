import { FastifyRequest } from "fastify";
import { ResultValidation } from "../../utils/result-validation";
import { PostRepository } from "./post.repository";
import { createPostType } from "./post.schemas";
import { resultSchemaType } from "../../utils/resultSchema";

export class PostService{
    private repository: PostRepository;
    
    constructor(postRepository: PostRepository){
        this.repository = postRepository;
    }

    async createPost(req: FastifyRequest, body: createPostType, resultValidation: ResultValidation){
        const {content, indexed_material} = body;

        if (req.user.is_teacher === true) {
            const teacherId = req.user.id;
    
            const post = {
                id: crypto.randomUUID(),
                teacher: teacherId,
                content,
                indexed_material,
                created_at: new Date()
            };
            await this.repository.createPost(post, resultValidation);
        }else{
            resultValidation.addError("User is not a teacher", "NAT", false);
        }
        return resultValidation;
    }

    async getPostsByCourse(resultValidation: ResultValidation, req: FastifyRequest){
        const courseID = req.query;
        await this.repository.getPostsByCourse(courseID, resultValidation);
        return resultValidation
    }
}