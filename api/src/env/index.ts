import { config } from 'dotenv'
import { z } from 'zod';

config()

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  DATABASE_CLIENT: z.enum(['sqlite', 'pg']),
  DATABASE_URL: z.string(),
  DATABASE_PORT: z.coerce.number().default(5432),
  DATABASE_PASSWORD: z.string(),
  DATABASE_USER: z.string(),
  DATABASE_NAME: z.string(),
  DATABASE_HOST: z.string(),
  PORT: z.coerce.number().default(3000),
  JWTTOKEN: z.string(),
  ENCRYPTKEY: z.string(),        
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false){
  console.log('Invalid enviroment variables ', _env.error.format())
  throw new Error('Invalid enviroment variables')
}

export const env = _env.data