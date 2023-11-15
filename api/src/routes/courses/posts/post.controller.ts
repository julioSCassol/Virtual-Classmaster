import { FastifyReply, FastifyRequest } from "fastify";
import { createPostType } from "./post.schemas";
import { ResultValidation } from "../../utils/result-validation";
import { PostService } from "./post.services";
import { PostRepository } from "./post.repository";
import { DatabaseConnector } from "../../../database";
import { applyResult } from "../../middlewares/applyResult";

export class PostController{
    constructor(){};
    async createPost(req: FastifyRequest<{Body: createPostType}>, res: FastifyReply){
        const resultValidation = new ResultValidation();
        const postService = new PostService(new PostRepository(new DatabaseConnector()))
        await postService.createPost(req, req.body, resultValidation)
        applyResult(resultValidation, res, 201)
    }

    async createAssignment(req: FastifyRequest<{Body: createPostType}>, res: FastifyReply){
        const resultValidation = new ResultValidation();
        const postService = new PostService(new PostRepository(new DatabaseConnector()))
        await postService.createAssignment(req, req.body, resultValidation)
        applyResult(resultValidation, res, 201)
    }

    async getPostsByCourse(req: FastifyRequest, res: FastifyReply){
        const resultValidation = new ResultValidation();
        const postService = new PostService(new PostRepository(new DatabaseConnector()))
        await postService.getPostsByCourse(resultValidation, req);
        applyResult(resultValidation, res, 201);
    }
}