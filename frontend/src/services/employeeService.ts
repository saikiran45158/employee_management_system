import axios, { AxiosError } from "axios";
import { EmpObjectType, MsgType } from "../types/employee.types";

class Employee {
    async addEmployee(EmpData: EmpObjectType) {
        try {
            const receivedResponse = await axios.post(`${process.env.HOST}/add`, EmpData,
                {
                    headers:
                    {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                    , withCredentials: true
                })
            const msg: MsgType = receivedResponse.data
            return window.alert(msg['msg'])
        }
        catch (err) {
            if (err instanceof AxiosError) {
                if(err.response?.status === 409){
                    //console.log('->', err.response?.status)
                    throw Error('id already exist')
                }
                else if(err.response?.status===401)
                        throw new Error('session expired please relogin')
                    throw new Error('server down wait for some time')
                
            }
        }


    }
    async getEmployee(EmpId: number): Promise<Partial<EmpObjectType>> {
        try {
            const receivedResponse = await axios.get(`${process.env.HOST}/getuser/${EmpId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            const result: EmpObjectType[] = receivedResponse.data
            // console.log(result[0])
            if (result.length === 0)
                window.alert('user not found')
            return result[0]
        }
        catch (err) {
            if(axios.isAxiosError(err)){
                if(err.response?.status===401)
                    throw new Error('session expired please relogin')
            }
            throw new Error('server down wait for some time')
        }
    }
    async getEmployees(): Promise<EmpObjectType[]> {
        try {
            const receivedResponse = await axios.get(`${process.env.HOST}/`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            const result: EmpObjectType[] = receivedResponse.data
            //console.log(result)
            return result
        }
        catch (err) {
            if(axios.isAxiosError(err)){
                if(err.response?.status===401)
                    throw new Error('session expired please relogin')
            }
            throw new Error('server down wait for some time')
        }
    }
    async editEmployee(EmpId: number, EmpData: EmpObjectType) {
        try {
            const receivedResponse = await axios
                .patch(`${process.env.HOST}/update/${EmpId}`, EmpData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
            const msg: MsgType = receivedResponse.data
            return window.alert(msg['msg'])
        }
        catch (err) {
            if(axios.isAxiosError(err)){
                if(err.response?.status===401)
                    throw new Error('session expired please relogin')
            }
            throw new Error('server down wait for some time')
        }
    }
    async deleteEmployee(EmpId: number) {
        try {
            const receivedResponse = await axios.delete(`${process.env.HOST}/delete/${EmpId}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
            const msg: MsgType = (await receivedResponse).data
            return msg
        }
        catch (err) {
            if(axios.isAxiosError(err)){
                if(err.response?.status===401)
                    throw new Error('session expired please relogin')
            }
            throw new Error('server down wait for some time')
        }
    }

}
const EmployeeObject = new Employee()
export default EmployeeObject



