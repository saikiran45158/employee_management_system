import { Pool } from "mysql2/typings/mysql/lib/Pool";
import { Request,Response } from "express";
import { QueryResult ,ResultSetHeader} from "mysql2";
import conn from "./db_connection";
import { DataInf } from "../models/query.models";

export function updateEmployee(req:Request,res:Response){
    const data:DataInf=req.body
    console.log(req.body)
    conn.query('update mytab set empName=?,empDesig=?,empDept=?,empSal=? where empid=?',[data.EmpName,data.EmpDesig,data.EmpDept,data.EmpSal,req.params.id],(err,result)=>{
        const rows_affected=(result as ResultSetHeader).affectedRows
        if(err){
            console.log(err)
            return res.status(500).send({err:"error occured"})
        }
        else if(rows_affected===0)
            return res.status(404).send({msg:"user not found"})
        else
            return res.status(200).send({msg:"updated"})
   })
}
