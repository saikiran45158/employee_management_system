import axios from "axios";
import { userType } from "../types/user.types";

export async function signup(data: userType) {
    try {
        await axios.post(`${process.env.HOST}/signup`, data)
    }
    catch (err) {
        if (axios.isAxiosError(err)) {
            if (err.status === 409 || err.status === 404)
                throw new Error('try a different username')
            else {
                throw new Error(`server down wait for some time`)
                console.log(err)
            }
        }
        throw new Error('unexpected error occurs')
    }
}
