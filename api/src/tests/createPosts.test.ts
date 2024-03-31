import { DatabaseConnector } from "../database"
import { CourseRepository } from "../routes/courses/course.repository"
import { CourseService } from "../routes/courses/course.services"
import { PostRepository } from "../routes/courses/posts/post.repository"
import { PostService } from "../routes/courses/posts/post.services"
import { ResultValidation } from "../routes/utils/result-validation"
import { UserRepository } from "../routes/user/user.repository"
import { UserService } from "../routes/user/user.services"


describe("Create Post", () =>{
  const courseService = new CourseService( new CourseRepository(new DatabaseConnector()))
  const postService = new PostService( new PostRepository(new DatabaseConnector()))
  const resultValidation = new ResultValidation()
  const userService = new UserService(new UserRepository(new DatabaseConnector()))

  it("Should be able to create a course, then a post in that course", async () =>{

  
  
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
      students:["student@email.com"],
      subjects:["test"],
      teachers:[ "teacher@email.com"]
    }, resultValidation)

    const courseReq = {
      course: {
        id: course.result.data.id,
      },
    }
    const post = await postService.createPost(userReq, {
      content: "Test",
      indexed_material: "Test",
      course_id: course.result.data.id,
      subjects_post: ["test"]
    }, resultValidation)

    const postReq = {
      post: {
        id: post.result.data.id,
      },
    }

    expect(post.result.data).toHaveProperty('id')
    console.log(userReq)
    console.log(courseReq)
    await postService.deletePost(resultValidation, {id: postReq.post.id})
    await courseService.deleteCourse(resultValidation, {id: courseReq.course.id})
    await userService.deleteUser(resultValidation, {id: userReq.user.id})
  })
})


