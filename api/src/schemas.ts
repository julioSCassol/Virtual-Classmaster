import { FastifyInstance } from "fastify";
import { userSchemas } from "./routes/user/user.schemas";


async function insertSchemas(app: FastifyInstance){
  for (let schema of [
    ...userSchemas
  ]){
    app.addSchema(schema);
  }
}

export default insertSchemas