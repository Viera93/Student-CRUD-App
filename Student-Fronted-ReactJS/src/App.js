import "./App.css";
import { Routes, Route } from "react-router-dom";
import ListOfStudents from "./components/ListOfStudents";
import StudentDetails from "./components/StudentDetails";
import AddStudent from "./components/AddStudent";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path="/" element={<ListOfStudents />}></Route>
        <Route path="/students" element={<ListOfStudents />}></Route>
        <Route path="/add-student" element={<AddStudent />}></Route>
        <Route path="/edit-student/:id" element={<AddStudent />}></Route>
        <Route path="/students/:id" element={<StudentDetails />}></Route>
      </Routes>
    </div>
  );
}

export default App;
