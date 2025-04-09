import { JSX, useRef, useState } from "react";
import { EmpObjectType } from "../types/employee.types";
import EmployeeObject from "../services/employeeService";
import React from "react";
import Error from "./Error";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Update(props: { id: number; }): JSX.Element {
    // const eid = useRef<HTMLInputElement>(null);
    const [error, setError] = useState('')
    const ename = useRef<HTMLInputElement>(null);
    const edesig = useRef<HTMLInputElement>(null);
    const edept = useRef<HTMLInputElement>(null);
    const esal = useRef<HTMLInputElement>(null);
    const navigate=useNavigate()
    async function fetchUserData(id: number) {
        //console.log(id)
        try{
        const EmpData: Partial<EmpObjectType> = await EmployeeObject.getEmployee(Number(id))
        //console.log('->', EmpData)
        ename.current!.value = ''
        edesig.current!.value = ''
        edept.current!.value = ''
        esal.current!.value = ''

        ename.current!.value = EmpData.EmpName!
        edesig.current!.value = EmpData.EmpDesig!
        edept.current!.value = EmpData.EmpDept!
        esal.current!.value = EmpData.EmpSal!.toString();
        }
        catch(err){
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
        }
    }
    fetchUserData(props.id)
    async function handleSubmit(eve: React.FormEvent) {
        eve.preventDefault();
        if (!ename.current || !edesig.current || !edept.current || !esal.current) {
            console.log("Enter values");
            window.alert('enter all values')
            return;
        }
        if (ename.current.value === '' || edesig.current.value === '' || edept.current.value === '' || esal.current.value === '') {
            setError('enter all values')
            window.setTimeout(() => setError(''), 4000)
            return;
        }
        const data = {
            EmpId: Number(props.id),
            EmpName: ename.current.value,
            EmpDesig: edesig.current?.value,
            EmpDept: edept.current.value,
            EmpSal: Number(esal.current.value)
        };

       // console.log(data);
       try{
        await EmployeeObject.editEmployee(data.EmpId, data)
       }
       catch(err){
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
       }

    }

    return (
        <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "3%" }}>

            <form onSubmit={handleSubmit} style={{ width: 'auto', display: 'flex', flexDirection: 'column', alignItems: "center", gap: '10px' }}>
                <Error errorMsg={error}></Error>
                <TextField required label='Enter Name' inputRef={ename}></TextField>
                <TextField required label='Enter Designation' inputRef={edesig}></TextField>
                <TextField required label='Enter Department' inputRef={edept}></TextField>
                <TextField required label='Enter Salary' type="number" inputRef={esal}></TextField>
                <Button type='submit' variant='contained'>Update</Button>
            </form>
        </div>
    );
}

