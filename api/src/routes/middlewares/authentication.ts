import { FastifyInstance, FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";
import crypto from 'crypto';
import { env } from "../../env";
import { accountDTO } from '../user/user.schemas';
const jwtValidator = require('jsonwebtoken')

export const RequireAuth = function (request:FastifyRequest, reply:FastifyReply, done:HookHandlerDoneFunction): void{
  try{
    console.log(request.headers.authorization.split(' ')[1])
    const token = request.headers.authorization.split(' ')[1]
    if(!token){
      reply.code(400).send('Token not Found')
      return
    }
    const jwt = decrypt(token)
    var decoded = jwtValidator.verify(jwt, env.JWTTOKEN);
    if(!decoded){
      // reply.clearCookie('token')
      reply.code(401).send('UNAUTHORIZED')
      return
    }
    const user = accountDTO.parse(decoded)
    request.user = user
    done()
  }catch(e){
    console.log(e)
    // reply.clearCookie('token')
    reply.code(401).send('UNAUTHORIZED')
  }
}

function decrypt(encryptedText: string) {
  try {
    const parts = encryptedText.split(':');
    if (parts.length !== 2) {
      throw new Error('Invalid token format');
    }

    const ivHex = parts[0];
    const encrypted = parts[1];

    const iv = Buffer.from(ivHex, 'hex');
    const key = crypto.createHash('sha256').update(env.ENCRYPTKEY).digest('base64').slice(0, 32);
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}
  
