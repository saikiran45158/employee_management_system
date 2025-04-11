import mysql,{Pool,QueryResult} from 'mysql2'
import dotenv from "dotenv";

dotenv.config();
const conn:Pool=mysql.createPool({
    user:process.env.DB_USER,
    password:process.env.USER_PASSWORD,
    database:process.env.DATABASE
})
export default conn