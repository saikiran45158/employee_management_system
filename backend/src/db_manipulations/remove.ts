import { QueryResult,Pool,ResultSetHeader } from "mysql2";
import { Request,Response } from "express";
import conn from "./db_connection";

export function removeEmployee(req:Request,res:Response):void{
    conn.query('delete from mytab where empid=?',[req.params.id],(err,result)=>{
        const rows_affected=(result as ResultSetHeader).affectedRows
        if(err)
            return res.status(500).send({err:"error occured"})
        else if(rows_affected===0)
            return res.status(404).send({msg:"Employee not found"})
        else{
            console.log(result)
            return res.status(200).send({msg:"Employee deleted"})
        }
    })
}
