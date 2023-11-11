import { CreateUserUseCase } from "./CreateUserUseCase";
import { Request, Response } from "express";

class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, password, isTeacher } = req.body;

    try {
      const userCreated = await this.createUserUseCase.execute({ name, email, password, isTeacher });

      if (!userCreated) {
        console.log("User already exists");
        return res.status(409).send("User already exists!");
      }

      return res.status(201).send("User created successfully");
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).send("Internal Server Error");
    }
  }
}

export { CreateUserController };
