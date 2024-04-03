import { DatabaseConnector } from "../database"
import { CourseRepository } from "../routes/courses/course.repository"
import { CourseService } from "../routes/courses/course.services"
import { UserRepository } from "../routes/user/user.repository"
import { UserService } from "../routes/user/user.services"
import { ResultValidation } from "../routes/utils/result-validation"



describe("Create and delete Course", () =>{
  const userService = new UserService(new UserRepository(new DatabaseConnector()))
  const courseService = new CourseService( new CourseRepository(new DatabaseConnector()))
  const resultValidation = new ResultValidation()
  it("Should be able to create a course and then delete it", async () =>{

    const user = await userService.createUser({
      email: 'test@email.com',
      password: 'passwordTest',
      name: 'test',
      is_teacher: true
    }, resultValidation)

    const userReq = {
      user: {
        is_teacher: user.result.data.is_teacher,
        id: user.result.data.id,
      },
    }

    const course = await courseService.createCourse({
      name: "Test",
      students:[],
      subjects:["test"],
      teachers:[ "test@email.com"]
    }, resultValidation)
    expect(course.result.data).toHaveProperty('id')
    await courseService.deleteCourse(resultValidation, {id: course.result.data.id})
    await userService.deleteUser(resultValidation, {id: userReq.user.id})
  })
})

