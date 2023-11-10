import express from "express";
import { userRoutes } from "./routes/user/user.routes";
const app = express();

app.use(express.json());

app.post("/courses", (req,res) =>{
    const {name} = req.body;
    return res.json({name});
})

app.use("/user", userRoutes);

app.listen(3000, () => console.log("http://localhost:3000"));