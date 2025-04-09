import { Link, Outlet,useNavigate } from "react-router-dom"
import '../styles/components.styles.css'
export default function Menu() {
    const navigate=useNavigate();
    function handleSubmit(){
        localStorage.clear();
        navigate('/')
    }
    return (
        <>
        <div className="nav-class">
            <Link to='home'>Home</Link>
            <button onClick={handleSubmit} id="logout-btn" style={{border:'none',color:'white',backgroundColor:'rgb(158, 101, 101)',fontSize:'large'}}>logout</button> 
        </div>
        <Outlet />
        </>
    )
}