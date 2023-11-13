import { FastifyReply, FastifyRequest } from "fastify";
import { ResultValidation } from "../utils/result-validation";
import { CourseRepository } from "./course.repository";
import { createCourseType, insertCourseDatabase, findCourseBySubjectType } from "./course.schemas";

export class CourseService{
    private repository: CourseRepository;

    constructor(courseRepository: CourseRepository){
        this.repository = courseRepository
    }

    async createCourse(body: createCourseType, resultValidation: ResultValidation){
        const {name, subjects, teachers, students} = body;
        const course = {
            id: crypto.randomUUID(),
            name,
            subjects,
            teachers,
            students,
            created_at: new Date()
        };
        await this.repository.createCourse(course, resultValidation)
        return resultValidation
    }
    async findBySubject(resultValidation: ResultValidation, req: FastifyRequest){
        const subjects = req.query;
        console.log(subjects)

        await this.repository.findBySubject(subjects, resultValidation);
        return resultValidation
    }


    async findByStudent(resultValidation: ResultValidation, req: FastifyRequest){
        const student = req.query;
        console.log(student)

        await this.repository.findByStudent(student, resultValidation);
        return resultValidation
    }

    async findByTeacher(resultValidation: ResultValidation, req: FastifyRequest){
        const teacher = req.query;
        console.log(teacher)

        await this.repository.findByTeacher(teacher, resultValidation);
        return resultValidation
    }
}