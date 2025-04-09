import {useRef} from "react"
import EmployeeObject from "../../services/employeeService"
export default function Delete(){
    const eid:React.RefObject<HTMLInputElement|null>=useRef(null)
    function handleSubmit(eve: { preventDefault: () => void }){
        eve.preventDefault()
        if(eid.current!.value===''){
            window.alert('enter value')
            return;
        }
       EmployeeObject.deleteEmployee(Number(eid.current?.value))
    }
    return (<div style={{width:'100%',display:'flex',justifyContent:'center',marginTop:'3%'}} className="form-box">
        <form onSubmit={handleSubmit} style={{width:'auto',display:'flex',flexDirection:'column',alignItems:"center", gap:'10px'}}>
            <input placeholder="enter id" ref={eid} type='number'></input>
            <button>delete</button>
        </form>
    </div>)
}