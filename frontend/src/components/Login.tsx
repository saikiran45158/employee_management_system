import { useRef, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import Error from "./Error";
import authenticate from "../services/authService";
import { Button, TextField } from "@mui/material";


export default function Login() {
    const navigate: NavigateFunction = useNavigate()
    const user = useRef<HTMLInputElement>(null)
    const password = useRef<HTMLInputElement>(null)
    const [error, setError] = useState('')
    const handleSubmit = async (eve: { preventDefault: () => void; }) => {
        eve.preventDefault();
        if (!user.current?.value || !password.current?.value) {
            setError('enter all values')
            window.setTimeout(() => setError(''), 4000)
            return;
        }
        try {
            const data = { user: user.current.value, password: password.current.value }
            //console.log(data)
            const isLoggedIn: boolean = await authenticate(data)
            localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn))
            if (isLoggedIn) {
                navigate('/home')   
            }
        }
        catch (err) { 
            if(typeof err==='object')
                setError((err as {message:string}).message)
        }
        window.setTimeout(()=>setError(''),4000)

    }
    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '3%' }}>
            <form id='login-form' onSubmit={handleSubmit} style={{ width: 'auto', display: 'flex', flexDirection: 'column', alignItems: "center", gap: '10px' }}>
                <h2 style={{ display: 'inline', width: 'auto' }}>Login</h2>
                <Error errorMsg={error}></Error>
                <TextField label='UserName' required inputRef={user} type="text" placeholder="enter username"></TextField>
                <TextField label='Password' required inputRef={password} type="password" placeholder="enter password"></TextField>
                <Button variant='contained' type="submit">login</Button>
            </form>
        </div>
    )
}