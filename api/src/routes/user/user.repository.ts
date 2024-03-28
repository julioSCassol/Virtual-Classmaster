import { DatabaseConnector } from "../../database";
import { ResultValidation } from '../utils/result-validation';
import { insertAccountDatabaseType } from './user.schemas';

export class UserRepository {
  private databaseConnector: DatabaseConnector;

  constructor(dbConnector: DatabaseConnector) {
    this.databaseConnector = dbConnector;
  }

async createUser(user: insertAccountDatabaseType, resultValidation: ResultValidation) {
  try {
    console.log(user)
    const result = await this.databaseConnector.server('users').insert(user).returning('*');
    resultValidation.setResult({ data: result[0] });
  } catch (error) {
    console.error(error);
    console.error(error.code, error.constraint);
    if (error.code === '23505' && error.constraint === 'users_email_key') {
      resultValidation.addError('23505', 'Email already exists', true);
    } else {
      resultValidation.addError('Create User Failed', `${error}`, true);
    }
  }
}

async findByEmail(email: string, resultValidation: ResultValidation) {
  try {
    const result = await this.databaseConnector.server('users').where({
      email: email,
    });
    if (result.length > 0) {
      resultValidation.setResult({ data: result[0] });
    } else {
      resultValidation.addError('EMAIL ERROR', 'Email not found');
    }
  } catch (error) {
    console.error(error);
    resultValidation.addError('Find User Failed', `${error}`, true);
  }
}

}
