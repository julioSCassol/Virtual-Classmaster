import { z } from 'zod'
import { buildJsonSchemas } from 'fastify-zod';

const id = z.string()
const name = z.string({required_error: "Need a name min 3 chars"}).min(3)
const email = z.string({required_error:"Need a valid email"}).email()
const password = z.string({required_error: "Need a valid password (8 char min)"}).min(8)
const is_teacher = z.boolean()
const salt = z.string()
const hash = z.string()
const created_at = z.coerce.date()
const updated_at = z.coerce.date().nullable().default(null)
const deleted_at = z.coerce.date().nullable().default(null)
const exp = z.number()

export const createAccountBody = z.object({
  name,
  email,
  password,
  is_teacher
})
export type createAccountType = z.infer<typeof createAccountBody>

// variaveis que serao inseridas na database
export const insertAccountDatabase = z.object({
  id,
  name,
  email,
  is_teacher,
  salt,
  hash,
  created_at
})
export type insertAccountDatabaseType = z.infer<typeof insertAccountDatabase>

export type idUserType = z.infer<typeof id>

export const accountDTO = z.object({
  id,
  email,
  name,
  is_teacher
})
export type accountDTOType = z.infer<typeof accountDTO>

export const loginBody = z.object({
  email,
  password
})
export type loginBodyType = z.infer<typeof loginBody>

export const getAccountDB = z.object({
  id,
  name,
  email,
  is_teacher,
  salt,
  hash,
  created_at,
  updated_at,
  deleted_at
})
export type getAccountDBType = z.infer<typeof getAccountDB>

export const tokenFormaterSchema = z.object({
  id,
  email,
  name,
  is_teacher,
  exp
})
export type tokenFormaterType = z.infer<typeof tokenFormaterSchema>

const models = {
  createAccountBody,
  loginBody
}

const options = {
  $id: "userSchemas"
}

export const { schemas : userSchemas, $ref} = buildJsonSchemas(models, options)