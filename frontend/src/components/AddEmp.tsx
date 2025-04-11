import { useRef, JSX, useState } from "react"
import React from "react";
import Error from "./Error";
import EmployeeObject from "../services/employeeService";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
export default function AddEmp(): JSX.Element {
    const [error, setError] = useState('')
    const eid: React.RefObject<HTMLInputElement | null> = useRef(null)
    const ename: React.RefObject<HTMLInputElement | null> = useRef(null)
    const edesig: React.RefObject<HTMLInputElement | null> = useRef(null)
    const edept: React.RefObject<HTMLInputElement | null> = useRef(null)
    const esal: React.RefObject<HTMLInputElement | null> = useRef(null)
    const navigate=useNavigate()
    async function handleSubmit(eve: { preventDefault: () => void; }) {
        setError('')
        eve.preventDefault();
        if (!eid.current || !ename.current || !edesig.current || !edept.current || !esal.current) {
            //console.log('enter values')
            return;
        }
        if (eid.current.value === '' || ename.current.value === '' || edesig.current.value === '' || edept.current.value === '' || esal.current.value === '') {
            setError('enter all values')
            return window.setTimeout(() => setError(''), 4000)
        }
        const data = { EmpId: Number(eid.current.value), EmpName: ename.current.value, EmpDesig: edesig.current.value, EmpDept: edept.current.value, EmpSal: Number(esal.current.value) }
        try {
            setError('')
            await EmployeeObject.addEmployee(data)
            eid.current.value = '';
            ename.current.value = '';
            edesig.current.value = '';
            edept.current.value = '';
            esal.current.value = '';
        }
        catch (err: unknown) {
            if (typeof err === 'object') {
                const errMsg = (err as { message: string }).message
               // console.log('-->',errMsg)
                if(errMsg.localeCompare('session expired please relogin')===0){
                    window.alert(errMsg)
                    navigate('/')
                }
                else
                    setError(errMsg);
            }
            window.setTimeout(()=>setError(''),4000)
        }
    }
    return (<div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '3%' }}>
        <form onSubmit={handleSubmit} style={{ width: 'auto', display: 'flex', flexDirection: 'column', alignItems: "center", gap: '10px' }}>
            <Error errorMsg={error}></Error>
            <TextField required label='Enter Id' type="number" inputRef={eid}></TextField>
            <TextField required label='Enter Name' inputRef={ename}></TextField>
            <TextField required label='Enter Designation' inputRef={edesig}></TextField>
            <TextField required label='Enter Department' inputRef={edept}></TextField>
            <TextField required label='Enter Salary' type="number" inputRef={esal}></TextField>
            <Button type='submit' variant='contained'>Add</Button>
        </form>
    </div>)
}
