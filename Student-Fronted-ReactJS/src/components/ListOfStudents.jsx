import { Link } from "react-router-dom";
import React from "react";
import { useState, useEffect } from "react";
import StudentService from "../services/StudentService";

function ListOfStudents() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    getAllStudents();
  }, []);

  const getAllStudents = () => {
    StudentService.getAllStudents()
      .then((response) => {
        //console.log('printing data', response.data);
        setStudents(response.data);
      })
      .catch((error) => {
        console.log("Something went wrong", error);
      });
  };

  const deleteStudent = (id) => {
    StudentService.deleteStudent(id)
      .then((response) => {
        getAllStudents();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="container my-5 py-5">
        <div className="row">
          <div className="col-12 mb-5">
            <h1 className="display-6 fw-bolder">
              STUDENTS
              <Link to="/add-student" className="btn btn-primary float-end">
                add new student
              </Link>
            </h1>
            <hr />
          </div>
        </div>

        <div className="row justify-content-center">
          {students.map((student) => (
            <div className="col-md-3 mb-4">
              <div className="card h-100 text-center p4" key={student.id}>
                <div className="card-body">
                  <h5 className="card-title mb-0">{student.firstName} {student.lastName}</h5>
                  <p className="card-text lead fw-bold">{student.email}</p>

                  <Link
                    to={`/students/${student.id}`}
                    className="btn btn-outline-dark"
                    style={{ marginLeft: "5px" }}
                  >
                    view student
                  </Link>
                </div>
                <div className="card-body">
                  <Link
                    to={`/edit-student/${student.id}`}
                    className="btn btn-info"
                    style={{ marginLeft: "5px" }}
                  >
                    edit
                  </Link>
                  <button
                    className="btn btn-warning"
                    onClick={() => deleteStudent(student.id)}
                    style={{ marginLeft: "5px" }}
                  >
                    delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ListOfStudents;
