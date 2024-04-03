
import { DatabaseConnector } from "../database"
import { ResultValidation } from "../routes/utils/result-validation"
import { UserRepository } from "../routes/user/user.repository"
import { UserService } from "../routes/user/user.services"


describe("Get User by email", () =>{
  const resultValidation = new ResultValidation()
  const userRepository = new UserRepository(new DatabaseConnector())
  const userService = new UserService(new UserRepository(new DatabaseConnector()))

  it("Should be able to get a user by email", async () =>{
    const user = await userService.createUser({
      email: 'test@email.com',
      password: 'passwordTest',
      name: 'test',
      is_teacher: false
    }, resultValidation)

    const userFound = await userRepository.findByEmail(user.result.data.email, resultValidation)
    expect(userFound).not.toBe(null)
    await userService.deleteUser(resultValidation, {id: user.result.data.id})
  })
})


