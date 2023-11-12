import { ResultValidation } from "../utils/result-validation";
import { CourseRepository } from "./course.repository";
import { createCourseType, insertCourseDatabase } from "./course.schemas";

export class CourseService{
    private repository: CourseRepository;

    constructor(courseRepository: CourseRepository){
        this.repository = courseRepository
    }

    async createCourse(body: createCourseType, resultValidation: ResultValidation){
        const {name, subjects, teachers, students} = body;
        console.log(body);
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
}