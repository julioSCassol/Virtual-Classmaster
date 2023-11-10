import { CreateUserUseCase } from "./CreateUserUseCase";
import { Request, Response } from "express";

class CreateUserController{
    constructor(private createUserUseCase: CreateUserUseCase) {}
    
    handle(req: Request, res: Response): Response{
        const {name,email, password, isTeacher} = req.body;
        this.createUserUseCase.execute({name,email, password, isTeacher});
        return res.status(201).send();
    }
}

export {CreateUserController}