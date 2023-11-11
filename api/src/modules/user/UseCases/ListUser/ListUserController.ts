import { ListUserUseCase } from "./ListUserUseCase";
import { Response, Request } from "express";

class ListUserController {
    constructor(private listUserUseCase: ListUserUseCase) {}

    async handle(req: Request, res: Response): Promise<Response> {
        try {
            const users = await this.listUserUseCase.execute();
            console.log(users);
            return res.json(users);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }
}

export { ListUserController };