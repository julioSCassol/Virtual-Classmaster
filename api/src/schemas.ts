import { FastifyInstance } from "fastify";
import { userSchemas } from "./routes/user/user.schemas";
import { courseSchemas } from "./routes/courses/course.schemas";


async function insertSchemas(app: FastifyInstance){
  for (let schema of [
    ...userSchemas,
    ...courseSchemas
  ]){
    app.addSchema(schema);
  }
}

export default insertSchemas