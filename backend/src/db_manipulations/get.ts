import { Pool } from "mysql2/typings/mysql/lib/Pool";
import { Request,Response } from "express";
import { QueryResult } from "mysql2";
import conn from "./db_connection";
import { token_checker } from "../controllers/access.controller";

export function getEmployees(req:Request,res:Response):void{
    conn.query('select * from mytab order by empId',(err,result)=>{
        if(err){
            console.log(err)
            return res.status(500).send({err:"error occured"})
        }
        else
            return res.status(200).send(result)
    })
}
export function getEmployee(req:Request,res:Response):void{
    conn.query('select * from mytab where empId=?',[+req.params.id],(err,result)=>{
        if(err){
            console.log(err)
            return res.status(500).send({err:"error occured"})
        }
        else
            return res.status(200).send(result)
    })
}

