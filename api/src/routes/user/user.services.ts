import { UserRepository } from "./user.repository";
import { ResultValidation } from '../utils/result-validation';
import { createAccountType, accountDTO, accountDTOType, loginBodyType, getAccountDB, tokenFormaterSchema, insertAccountDatabase } from './user.schemas';
import crypto from 'node:crypto'
import { env } from "../../env";
import app from "../../server";

export class UserService{

  private repository: UserRepository

  constructor(userRepository: UserRepository){
    this.repository = userRepository;
  }
  
  private loggedInUser: { id: string; name: string } | null = null;

  getLoggedInUserId() {
    return this.loggedInUser?.id || null;
  }

  async createUser(body: createAccountType, resultValidation:ResultValidation){
    const { name, email, password, is_teacher } = body;
    const encryptedPassword = await this._hashPassword(password)
    const user = insertAccountDatabase.parse({ 
      id: crypto.randomUUID(), 
      name, 
      email, 
      ...encryptedPassword,
      is_teacher,
      created_at: new Date()
    })
    await this.repository.createUser(user, resultValidation)
    return resultValidation
  }

  private async _hashPassword(password: string){
    const salt = crypto.randomBytes(64).toString("hex")
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 200, "SHA512").toString("hex")
    return({hash,salt})
  }


  async login(body: loginBodyType, resultValidation: ResultValidation) {
    try {
      const { email, password } = body;

      await this.repository.findByEmail(email, resultValidation);

      if (resultValidation.hasError()) {
        return resultValidation;
      }

      const result = resultValidation.getResult().data;
      const user = getAccountDB.parse(result);

      const { id, hash, salt, name, is_teacher } = user;

      if (!await this._verifyPassword(password, salt, hash)) {
        return resultValidation.addError("AUTHENTICATION_ERROR", "Invalid Password");
      }

      const userDTO = accountDTO.parse({ id, email, name, is_teacher });
      const token = await this._generateJWT(userDTO, resultValidation);

      // Now you can return the token along with the result
      resultValidation.setResult({ data:token });

      return resultValidation;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  }


  private async _verifyPassword(candidatePassword: string, salt: string, hash: string):Promise<boolean>{
    const candidateHash = crypto.pbkdf2Sync(candidatePassword, salt, 1000, 200, "sha512").toString('hex');
    if (hash === candidateHash){
      return true
    }
    return false
  }

  private async _generateJWT(user: accountDTOType, resultValidation: ResultValidation): Promise<string> {
    try {
      const exp = Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60);
      const tokenFormatter = tokenFormaterSchema.parse({ ...user, exp });
      const jwtToken = app.jwt.sign(tokenFormatter);
      const token = await this._encrypt(jwtToken);
      await resultValidation.setCookie({ name: "token", value: token, opts: { path: '/' } });

      // Return the generated token
      return token;
    } catch (error) {
      console.error('Error generating JWT:', error);
      throw error;
    }
  }

  private async _encrypt(text:string) {
    const algorithm = 'aes-256-cbc';
    const key = crypto.createHash('sha256').update(env.ENCRYPTKEY).digest('base64').slice(0, 32);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');  
    const token = iv.toString('hex')+ ':' + encrypted
    return token
  }
}