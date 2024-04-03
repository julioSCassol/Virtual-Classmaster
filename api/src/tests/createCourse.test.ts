import { DatabaseConnector } from "../database"
import { CourseRepository } from "../routes/courses/course.repository"
import { CourseService } from "../routes/courses/course.services"
import { ResultValidation } from "../routes/utils/result-validation"



describe("Create and delete Course", () =>{
  const courseService = new CourseService( new CourseRepository(new DatabaseConnector()))
  const resultValidation = new ResultValidation()
  it("Should be able to create a course and then delete it", async () =>{
    const course = await courseService.createCourse({
      name: "Test",
      students:["student@email.com"],
      subjects:["test"],
      teachers:[ "teacher@email.com"]
    }, resultValidation)
    expect(course.result.data).toHaveProperty('id')
    await courseService.deleteCourse(resultValidation, {id: course.result.data.id})
  })
})

