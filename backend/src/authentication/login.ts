import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { Request, Response } from 'express'
import mysql, { QueryResult, RowDataPacket } from 'mysql2'
dotenv.config()

const pool = mysql.createPool({
    user: 'saikirankanchi',
    password: 'saikirankanchi',
    database: 'mydb'
})
export async function loginUser(req: Request, res: Response) {
    const AdminName = req.body.user
    const AdminPass = req.body.password
    pool.query('select * from users where userName=?', [AdminName], (err, result) => {
        if (err) {
            console.log(err)
            res.status(500).send({ errMsg: 'database error' })
        }
        else {
            const data = (result as RowDataPacket[])
            if (data.length === 0)
                return res.status(404).send({ msg: 'user not found' })

            const { userName, password } = data[0] as { userName: string, password: string }

            // console.log(userName, password)
            if (password.localeCompare(AdminPass) !== 0) {
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



// res.cookie('token', token, {
//     maxAge: 1 * 60 * 60 * 1000
// })

// const payload = {
//     user: process.env.ADMIN,
//     password: process.env.ADMIN_PASS,
// }
// // export function loginUser(req: Request, res: Response): any {
// //     const userName = req.body.user
// //     const userPass = req.body.password
// if (payload.user != userName || payload.password != userPass) {
//     console.log('invalid user :', userName)
//     return res.status(401).send({ err: 'wrong credentials' })
// }
// if (!process.env.SECRET_KEY)
//     throw new Error('secret key undefined')
// const secretkey: jwt.Secret = process.env.SECRET_KEY
// const token = jwt.sign(payload, secretkey, { expiresIn: '1h' })
// res.cookie('token', token, {
//     maxAge: 1 * 60 * 60 * 1000
// })

// return res.status(200).send({ token: token })
// // }
