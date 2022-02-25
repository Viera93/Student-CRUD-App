import React,{ useState, useEffect } from 'react';
import StudentService from '../services/StudentService';
import { useNavigate, useParams, Link } from 'react-router-dom'

function AddStudent() {

    const[firstName, setFirstName] = useState('')
    const[lastName, setLastName] = useState('')
    const[email, setEmail] = useState('')
     
    
    

    const navigate = useNavigate()
    const {id} = useParams()

    const title = () => {
        if(id){
            return <h2 className="text-center">Edit Student</h2>
        }
        else{
            return <h2 className="text-center">Add Student</h2>
        }
    }

    const saveOrEditStudent = (e) => {
        e.preventDefault();
        const student = {firstName, lastName, email}

        if(id){
            StudentService.editStudent(id, student).then((response) =>{
                navigate('/students')
            }).catch(error =>{
                console.log(error)
            })
        }
        else{
        StudentService.createStudent(student).then((response) =>{
            console.log(response.data)
            navigate('/students')
        }).catch(error => {
            console.log(error)
        })
      }
    }

     
    useEffect(() =>{
        StudentService.getStudentById(id).then((response) =>{
            setFirstName(response.data.firstName)
            setLastName(response.data.lastName)
            setEmail(response.data.email)
            
        }).catch(error => {
            console.log(error)
        })
    }, [id])

     

    return (
        <div> 
            <br></br>
        <div className="container my-5 py-5">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset md-3">
                        {title()}
                        <div className="card-body">
                            <form>
                                <div className="form-group mb-2">
                                    <label className="form-label">First Name:</label>
                                    <input
                                    type="text"
                                    name="firstName"
                                    className="form-control"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}>
                                    </input>
                                </div>
                                 

                                <div className="form-group mb-2">
                                    <label className="form-label">Last Name:</label>
                                    <input
                                    type="text"
                                    name="lastName"
                                    className="form-control"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}>
                                    </input>
                                </div>

                                <div className="form-group mb-2">
                                    <label className="form-label">Email:</label>
                                    <input
                                    type="text"
                                    name="email"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}>
                                    </input>
                                </div>

                                

                                <button className="btn btn-primary" onClick={(e) => saveOrEditStudent(e)}>save</button>
                                <Link to={"/students"} className="btn btn-danger"style={{marginLeft:"10px"}}>cancel</Link>
                            </form>
                        </div>
                    </div>
                </div>
        </div>
        </div>
    );
}

export default AddStudent;