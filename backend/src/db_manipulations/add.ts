import { Pool } from "mysql2/typings/mysql/lib/Pool";
import { Request,Response } from "express";
import { QueryResult } from "mysql2";
import conn from "./db_connection";
interface DataInf{
    EmpId:number,
    EmpName:string,
    EmpDesig:string,
    EmpDept:string,
    EmpSal:number
}

export function addEmployee(req:Request,res:Response):void{
   const data:DataInf=req.body
   //console.log(data)
   conn.query('insert into mytab(EmpId,EmpName,EmpDesig,EmpDept,EmpSal) values(?,?,?,?,?)',[data.EmpId,data.EmpName,data.EmpDesig,data.EmpDept,data.EmpSal],(err,result)=>{
    if(err){
        console.log(err)
        return res.status(409).send({error:'Error occured'})
    }
    else
        return res.status(200).send({msg:'done'})
   })
}

