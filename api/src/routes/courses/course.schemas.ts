// id
// name
// subjects
// teachers
// students
// created_at date
// updated_at date
// deleted_at date


// usar func pra buscar por email pra pegar o teacher e student
import { buildJsonSchemas } from 'fastify-zod'
import { z } from 'zod'
// import { CourseDTO } from '../user/user.schemas';
const id = z.string()
const name = z.string({required_error: "Need a name min 3 chars"}).min(3)
const subjects = z.array(z.string())
// const teachers = z.array(CourseDTO)
const teachers = z.array(z.string());
// const students = z.array(CourseDTO)
const students = z.array(z.string());
const created_at = z.coerce.date()
const updated_at = z.coerce.date().nullable().default(null)
const deleted_at = z.coerce.date().nullable().default(null)

export const createCourseBody = z.object({
  name,
  subjects,
  teachers,
  students
})
export type createCourseType = z.infer<typeof createCourseBody>
export const getCourseDB = z.object({
  id,
  name,
  subjects,
  teachers,
  students,
  created_at,
  updated_at,
  deleted_at
})
export type getCourseDBType = z.infer<typeof getCourseDB>

// variaveis que serao inseridas na database
export const insertCourseDatabase = z.object({
  id,
  name,
  subjects,
  teachers,
  students,
  created_at
})
export type insertCourseDatabaseType = z.infer<typeof insertCourseDatabase>

export type idCourseType = z.infer<typeof id>

export const CourseDTO = z.object({
  id,
  name,
  subjects,
  teachers,
  students
})
export type CourseDTOType = z.infer<typeof CourseDTO>


export const findCourseBySubjectBody = z.object({
  subjects
})
export type findCourseBySubjectType = z.infer<typeof findCourseBySubjectBody>

export const findCourseByStudentBody = z.object({
  students
})
export type findCourseByStudentType = z.infer<typeof findCourseByStudentBody>

export const findCourseByTeacherBody = z.object({
  teachers
})
export type findCourseByTeacherType = z.infer<typeof findCourseByTeacherBody>

const models = {
  createCourseBody,
  findCourseBySubjectBody,
  findCourseByStudentBody,
  findCourseByTeacherBody
}

const options = {
  $id: "courseSchemas"
}

export const { schemas : courseSchemas, $ref} = buildJsonSchemas(models, options)