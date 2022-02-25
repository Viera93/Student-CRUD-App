import axios from 'axios'

const STUDENT_REST_API_URL = 'http://localhost:8080/api/students';

class StudentService{

    getAllStudents(){
        return axios.get(STUDENT_REST_API_URL);
    }

    createStudent(student){
        return axios.post(STUDENT_REST_API_URL, student);
    }

    getStudentById(id){
        return axios.get(STUDENT_REST_API_URL + '/' + id)
    }

    editStudent(id, product){
        return axios.put(STUDENT_REST_API_URL + '/' + id, product)
    }

    deleteStudent(id){
        return axios.delete(STUDENT_REST_API_URL + '/' + id)
    }
     
}
export default new StudentService()