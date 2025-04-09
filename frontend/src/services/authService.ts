import axios, { AxiosError } from "axios";
import { userType } from "../types/user.types";

export default async  function authenticate(data:userType){
    const logina=`${process.env.HOST}/login`
    try{
        const receivedResponse=await axios.post(logina,data)
        let token:string=receivedResponse.data.token
        localStorage.setItem('token',token)
        return true
    }
    catch(err){
        if(err instanceof AxiosError){
            if(err.status===401)
                throw new Error('incorrect username or password')
            else
                throw new Error(`server down wait for some time`)
        }
        throw new Error('unexpected error occurs')
        return false
    }
}