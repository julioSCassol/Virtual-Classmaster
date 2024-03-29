import { FastifyReply, FastifyRequest } from "fastify";
import { createCourseType } from "./course.schemas";
import { ResultValidation } from "../utils/result-validation";
import { CourseService } from "./course.services";
import { CourseRepository } from "./course.repository";
import { DatabaseConnector } from "../../database";
import { applyResult } from "../middlewares/applyResult";

export class CourseController{
    constructor(){}

    async createCourse(req: FastifyRequest<{Body: createCourseType}>, res: FastifyReply){
        const resultValidation = new ResultValidation();
        const courseService = new CourseService(new CourseRepository(new DatabaseConnector()))
        await courseService.createCourse(req.body, resultValidation)
        applyResult(resultValidation, res, 201)
    }

    async findCourseBySubject(req: FastifyRequest, res:FastifyReply){
        const resultValidation = new ResultValidation();
        const courseService = new CourseService(new CourseRepository(new DatabaseConnector()));
        await courseService.findBySubject(resultValidation, req);
        applyResult(resultValidation, res, 201)
    }
    async findCourseByStudent(req: FastifyRequest, res:FastifyReply){
        const resultValidation = new ResultValidation();
        const courseService = new CourseService(new CourseRepository(new DatabaseConnector()));
        await courseService.findByStudent(resultValidation, req);
        applyResult(resultValidation, res, 201)
    }
    
    async findCourseByTeacher(req: FastifyRequest, res:FastifyReply){
        const resultValidation = new ResultValidation();
        const courseService = new CourseService(new CourseRepository(new DatabaseConnector()));
        await courseService.findByTeacher(resultValidation, req);
        applyResult(resultValidation, res, 201)
    }
    async deleteCourse(req: FastifyRequest, res:FastifyReply){
      const resultValidation = new ResultValidation();
      const courseService = new CourseService(new CourseRepository(new DatabaseConnector()));
      await courseService.deleteCourse(resultValidation, req.query);
      applyResult(resultValidation, res, 201)
    }
}
