import { FastifyInstance } from "fastify";
import { $ref } from "./course.schemas";
import { CourseController } from "./course.controller";

async function courseRoutes(app:FastifyInstance) {
    const courseController = new CourseController();

    app.post('/create', {schema: {body:$ref('createCourseBody')}}, courseController.createCourse);
    app.get('/searchbysubject', { schema: { querystring: $ref('findCourseBySubjectBody') } }, courseController.findCourseBySubject);
    app.get('/searchbystudent', { schema: { querystring: $ref('findCourseByStudentBody') } }, courseController.findCourseByStudent);
    app.get('/searchbyteacher', { schema: { querystring: $ref('findCourseByTeacherBody') } }, courseController.findCourseByTeacher);
}

export default courseRoutes