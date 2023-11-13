import { FastifyInstance } from "fastify";
import { userSchemas } from "./routes/user/user.schemas";
import { courseSchemas } from "./routes/courses/course.schemas";
import { postSchemas } from "./routes/courses/posts/post.schemas";


async function insertSchemas(app: FastifyInstance){
  for (let schema of [
    ...userSchemas,
    ...courseSchemas,
    ...postSchemas
  ]){
    app.addSchema(schema);
  }
}

export default insertSchemas