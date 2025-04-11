import express, { Express } from "express";
import cors from 'cors'
import dotenv from 'dotenv'
import { loginUser } from "./authentication/login";
import { addEmployee } from "./db_manipulations/add";
import { removeEmployee } from "./db_manipulations/remove";
import { getEmployees, getEmployee } from "./db_manipulations/get";
import { updateEmployee } from "./db_manipulations/edit";
import { token_checker } from "./controllers/access.controller";
import {signup} from "./authentication/signup";

dotenv.config()
const app: Express = express()

app.use(cors({
    origin: process.env.ORIGIN,
    credentials: true
}))
const PORT=process.env.PORT

app.use(express.json())
app.post('/login', loginUser)
app.post('/signup',signup)
app.get('/', token_checker, getEmployees)
app.use(token_checker)
app.post('/add', addEmployee)
app.get('/getuser/:id', getEmployee)
app.patch('/update/:id', updateEmployee)
app.delete('/delete/:id', removeEmployee)

app.listen(PORT, () => console.log(`running on port ${PORT}`))

