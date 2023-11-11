import { FastifyInstance } from "fastify";
import userRoutes from "./routes/user/user.routes";


export async function insertRoutes(app: FastifyInstance){
  app.register(userRoutes, {prefix:"/user"})
}