import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";

function StudentDetails() {
  const [student, setStudent] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const getStudentDetails = async () => {
      const response = await fetch(`http://localhost:8080/api/students/${id}`);
      setStudent(await response.json());
    };
    getStudentDetails();
  }, []);

  const ShowStudent = () => {
    return (
      <>
        <div className="container my-5 py-5"></div>
        <div className="card col-md-6 offset-md-3 offset md-3">
          <div className="card-body">
            <h4 className="text-uppercase text-black-50">
              {student.firstName} {student.lastName}
            </h4>

            <p className="display-6 fw-bold my-4">{student.email}</p>
          </div>
        </div>
      </>
    );
  };

  return (
    <div>
      <div className="container">
        <div className="row py-4">{<ShowStudent />}</div>
      </div>
    </div>
  );
}

export default StudentDetails;
