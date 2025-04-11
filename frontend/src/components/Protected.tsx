import { Navigate, Outlet } from "react-router-dom";

export default function Protected(){
    const isLoggedIn=localStorage.getItem('isLoggedIn')
    return isLoggedIn?<Outlet/>:<Navigate to={'/'}></Navigate>
}