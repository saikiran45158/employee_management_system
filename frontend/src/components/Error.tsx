type err={
    errorMsg:string
}
export default function Error(props:err){
    return (
        <div>
            <span style={{color:'red'}}>{props.errorMsg}</span>
        </div>
    )
}