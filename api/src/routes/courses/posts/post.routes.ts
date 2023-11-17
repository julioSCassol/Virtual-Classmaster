import { FastifyInstance } from "fastify";
import { PostController } from "./post.controller";
import { $ref } from "./post.schemas";
import { RequireAuth } from "../../middlewares/authentication";

async function postRoutes(app:FastifyInstance) {
    const postController = new PostController();

    app.post('/create', {schema:{body:$ref('createPostBody')},preHandler: RequireAuth.bind(app)}, postController.createPost)
    app.post('/createassignment', {schema: {body: $ref('createAssignmentBody')}, preHandler: RequireAuth.bind(app)}, postController.createAssignment)
    app.get('/getpostsbycourse', { schema: { querystring: $ref('getPostsByCourseBody') } }, postController.getPostsByCourse);
    app.get('/getpostsbyteacher', { schema: { querystring: $ref('getPostsByTeacherBody') } }, postController.getPostsByTeacher);
}

export default postRoutes