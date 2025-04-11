import { Box, Button, TextField } from "@mui/material";
import { useRef, useState } from "react";
import { userType } from "../types/user.types";
import { signup } from "../services/signupService";
import { useNavigate } from "react-router-dom";
import Error from "./Error";

export default function SignUp() {
    const userRef = useRef<HTMLInputElement>(null)
    const passRef = useRef<HTMLInputElement>(null)
    const [error, setError] = useState('')
    const navigate = useNavigate()
    async function handleSubmit(eve: { preventDefault: () => void; }) {
        eve.preventDefault()
        const data: userType = { user: userRef.current?.value as string, password: passRef.current?.value as string }
        // console.log(data)
        if(data.password.length<6){
            setError('password has minimum 6 characters')
            return window.setTimeout(()=>setError(''),4000)
        }
        try { 
            await signup(data);
            window.alert('Signup sucessful ,redirecting to login page')
            navigate('/')
        }
        catch (err) {
            console.log(err)
            if (typeof err === 'object')
                setError((err as { message: string }).message)
        }
        window.setTimeout(() => setError(''), 4000)
    }
    return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column', marginTop: '3%' }}>
            <Box>
                <form onSubmit={handleSubmit} style={{ width: 'auto', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: "center", gap: '10px' }}>
                    <h2 style={{ display: 'inline', width: 'auto' }}>SignUp</h2>
                    <Error errorMsg={error} />
                    <TextField inputRef={userRef} type='text' required label='Enter username'></TextField>
                    <TextField inputRef={passRef} type='password' required label='Enter password'></TextField>
                    <Button variant='contained' type='submit'>SignUp</Button>
                    <span>have an account <Button onClick={() => navigate('/')}  variant='text'>login</Button></span>
                </form>
            </Box>
        </Box>
    )
}