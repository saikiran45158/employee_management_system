import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { Request, Response } from 'express'
import mysql, {  RowDataPacket } from 'mysql2'
import bcrypt from 'bcrypt'

dotenv.config()

const pool = mysql.createPool({
    user: process.env.DB_USER,
    password:process.env.USER_PASSWORD,
    database: process.env.DATABASE
})
export async function loginUser(req: Request, res: Response) {
    const AdminName:string = req.body.user
    const AdminPass:string = req.body.password
    pool.query('select * from users where userName=?', [AdminName],async (err, result) => {
        if (err) {
            console.log("err",err);
            res.status(500).send({ errMsg: 'database error' })
        }
        else {
            const data = (result as RowDataPacket[])
            if (data.length === 0)
                return res.status(404).send({ msg: 'user not found' })

            const { userName, password } = data[0] as { userName: string, password: string }

            // console.log(userName, password)
            if (!await bcrypt.compare(AdminPass.toString(),password)) {
                console.log('invalid user :', userName)
                return res.status(401).send({ errMsg: 'wrong credentials' })
            }
            else {
                const payload = {
                    user: userName,
                    password: password,
                }
                if (!process.env.SECRET_KEY)
                    throw new Error('secret key undefined')
                const secretkey: jwt.Secret = process.env.SECRET_KEY
                const token = jwt.sign(payload, secretkey, { expiresIn: '1h' })
                return res.status(200).send({ token: token })
            }

        }
    })


}


