import { FastifyInstance } from "fastify";
import userRoutes from "./routes/user/user.routes";
import courseRoutes from "./routes/courses/course.routes";


export async function insertRoutes(app: FastifyInstance){
  app.register(userRoutes, {prefix:"/user"})
  app.register(courseRoutes, {prefix:"/course"})
}