import { Router } from "express";
import { UserRepository } from "../../repositories/UserRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { CreateUserController } from "./CreateUserController";

const router = Router();

const userRepository = UserRepository.getInstance();
const createUserUseCase = new CreateUserUseCase(userRepository);
const createUserController = new CreateUserController(createUserUseCase);

export {createUserController};