import { Router } from "express";
import { createUserController } from "../../modules/user/UseCases/CreateUser";
import { listUserController } from "../../modules/user/UseCases/ListUser";

const userRoutes = Router();

userRoutes.post("/", (req,res)=>{
    return createUserController.handle(req,res);
})

userRoutes.get("/", (req,res)=>{
    return listUserController.handle(req,res);
})

export {userRoutes};