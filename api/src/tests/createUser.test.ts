import { DatabaseConnector } from "../database"
import { UserRepository } from "../routes/user/user.repository"
import { UserService } from "../routes/user/user.services"
import { ResultValidation } from "../routes/utils/result-validation"

describe('User Creation', () => {

  const userService = new UserService(new UserRepository(new DatabaseConnector()))
  const resultValidation = new ResultValidation()
  
  it('Should be able to create a user', async () => {
    const user = await userService.createUser({
      email: 'test@email.com',
      password: 'passwordTest',
      name: 'test',
      is_teacher: false
    }, resultValidation)

    expect(user.result.data).toHaveProperty('id')
    await userService.deleteUser(resultValidation, {id: user.result.data.id})
  })

})

