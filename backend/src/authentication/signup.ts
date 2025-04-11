import { Request, Response } from "express";
import mysql from 'mysql2'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'

dotenv.config()
const pool = mysql.createPool({
    user: process.env.DB_USER,
    password: process.env.USER_PASSWORD,
    database: process.env.DATABASE
})

export async function signup(req: Request, res: Response) {
    //console.log('sign')
    const { user, password } = req.body as { user: string, password: string }
    if (!user || !password)
        res.status(400).send({ errorMsg: 'username or password not empty' })
    try {
        const rounds=9
        const hashedpass = await bcrypt.hash(password.toString(), rounds)
        pool.execute('insert into users (userName,password) values(?,?)', [user, hashedpass],(err,result)=>{
            if(err)
                res.status(409).send({errMsg:"user alredy exist"})
            else
                res.status(201).send({ msg: 'account created successfully' })
        })
    }
    catch (err) {
        res.status(500).send({ errMsg: 'hashing error' })
    }
}