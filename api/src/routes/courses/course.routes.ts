import { FastifyInstance } from "fastify";
import { $ref } from "./course.schemas";
import { CourseController } from "./course.controller";

async function courseRoutes(app:FastifyInstance) {
    const courseController = new CourseController();

    app.post('/create', {schema: {body:$ref('createCourseBody')}}, courseController.createCourse);
}

export default courseRoutes