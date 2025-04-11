import { Request,Response ,NextFunction} from "express";
import jwt,{JwtPayload} from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
export function token_checker(req:Request,res:Response,next:NextFunction):void{
    let token:string;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
        token=req.headers.authorization.split(' ')[1]
    else{
        res.status(404).send({err:'error occured'})
        return;
    }
    let decoded_token:JwtPayload|string
    if(!process.env.SECRET_KEY){
        res.status(401).send({err:'error occured'})
        return;
    }
    try{
        decoded_token=jwt.verify(token,process.env.SECRET_KEY)
        next();
    }
    catch(err){
        res.status(401).send({msg:'expired or wrong token'})
        return;
    }
}