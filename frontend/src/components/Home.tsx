import { JSX, useEffect, useState } from "react"
import { EmpObjectType } from "../types/employee.types"
import EmployeeObject from "../services/employeeService"
import { Add, Delete, Edit } from "@mui/icons-material"
import '../styles/components.styles.css'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Fab, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import Update from "./Update"
import AddEmp from "./AddEmp"
import { Link, useNavigate } from "react-router-dom"

export default function Home(): JSX.Element {
    const [UpdateDialog, setUpdateDialog] = useState(false)
    const [AddDialog, setAddDialog] = useState(false)
    const [editId, setEditId] = useState(0)
    const [employees, setEmployees] = useState<EmpObjectType[]>([])
    const [deleteDialog, setDeleteDialog] = useState(false)
    const [deleteId, setDeleteId] = useState(0)
    const navigate = useNavigate();

    useEffect(() => {
        const allEmployees = async () => {
            try {
                const Employees: EmpObjectType[] = await EmployeeObject.getEmployees()
                setEmployees(Employees)
            }
            catch (err) {
                if (typeof err === 'object') {
                    const errMsg = (err as { message: string }).message
                    if(errMsg.localeCompare('session expired please relogin')===0){
                        window.alert(errMsg)
                        navigate('/')
                    }
                    else
                        window.alert(errMsg);
                }
            }
        }
        allEmployees()

    }, [UpdateDialog, AddDialog, deleteId])

    function handleEdit(id: number): void {
        setUpdateDialog(true)
        setEditId(id)
    }
    async function handleOk() {
        try {
            if (deleteId !== 0) {
                await EmployeeObject.deleteEmployee(deleteId)
            }
            setDeleteDialog((prev) => !prev)
            setDeleteId(0)
        }
        catch (err) {
            if (typeof err === 'object') {
                const errMsg = (err as { message: string }).message
               // console.log('-->',errMsg)
                if(errMsg.localeCompare('session expired please relogin')===0){
                    window.alert(errMsg)
                    navigate('/')
                }
                else
                    window.alert(errMsg);
            }
        }

    }
    async function handleDelete(id: number): Promise<void> {
        setDeleteDialog(true)
        setDeleteId(id)
    }

    function handleEditBack(): void {
        setUpdateDialog(false)
    }

    function handleAddBack(): void {
        setAddDialog(false)
    }

    function handleAddEmployee(): void {
        setAddDialog(true)
    }

    function handleLogOut(): void {
        localStorage.clear();
        navigate('/');
    }

    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
            <div className="nav-class">
                <Link to='/home'><h2>Employees</h2></Link>
                <button onClick={handleLogOut} id="logout-btn" style={{ border: 'none', color: 'white', backgroundColor: 'rgb(158, 101, 101)', fontSize: 'large' }}>Logout</button>
            </div>

            <p>
                <Fab onClick={handleAddEmployee}><Add /></Fab>
            </p>
            <TableContainer sx={{ width: '50%', minWidth: 700 }} component={Paper}>
                <Table sx={{ border: '2px solid black', marginTop: '3%' }}>
                    <TableHead >
                        <TableRow sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>
                            <TableCell sx={{ fontWeight: "bold" }}>EmployeeId</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>EmployeeName</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Designation</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Department</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Salary</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            employees?.map((employee, index) => (
                                <TableRow key={index}>
                                    <TableCell>{employee.EmpId}</TableCell>
                                    <TableCell>{employee.EmpName}</TableCell>
                                    <TableCell>{employee.EmpDesig}</TableCell>
                                    <TableCell>{employee.EmpDept}</TableCell>
                                    <TableCell>{employee.EmpSal}</TableCell>
                                    <TableCell>
                                        <IconButton color='primary' onClick={() => handleEdit(employee.EmpId)}><Edit /></IconButton>
                                        <IconButton color='error' onClick={() => handleDelete(employee.EmpId)}><Delete /></IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={AddDialog}>
                <DialogTitle>Add Employee</DialogTitle>
                <DialogContent>
                    <AddEmp />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddBack}>Back</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={UpdateDialog}>
                <DialogTitle>Update Employee</DialogTitle>
                <DialogContent>
                    <Update id={editId} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditBack}>Back</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={deleteDialog}>
                <DialogContent>
                    Do you want to delete this employee
                </DialogContent>
                <DialogActions sx={{ width: 'auto', display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                    <Button onClick={() => setDeleteDialog(false)}>cancel</Button>
                    <Button onClick={handleOk}>confirm</Button>
                </DialogActions>
            </Dialog>

        </div>
    )
}

