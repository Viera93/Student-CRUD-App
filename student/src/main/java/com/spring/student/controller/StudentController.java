package com.spring.student.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.student.exception.ResourceNotFoundException;
import com.spring.student.model.Student;
import com.spring.student.repository.StudentRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class StudentController {
	
	@Autowired
	private StudentRepository studentRepo;
	
	//get all students
	@GetMapping("/students")
	public List<Student>getAllStudents(){
		return studentRepo.findAll();
	}
	
	//add student
	@PostMapping("/students")
	public Student addStudent(@RequestBody Student student) {
		return studentRepo.save(student);
	}
	
	//get student by ID
	@GetMapping("/students/{id}")
	public ResponseEntity<Student> getStudentById(@PathVariable Long id) {
		Student student = studentRepo.findById(id).
				orElseThrow(()-> new ResourceNotFoundException("Student with id " +id+ " does not exist"));
		return ResponseEntity.ok(student);
	}
	
	//update student
	@PutMapping("/students/{id}")
	public ResponseEntity<Student> updateStudent(@PathVariable Long id, @RequestBody Student studentDetails){
		Student student = studentRepo.findById(id).
				orElseThrow(()-> new ResourceNotFoundException("Student with id " +id+ " does not exist"));
		student.setFirstName(studentDetails.getFirstName());
		student.setLastName(studentDetails.getLastName());
		student.setEmail(studentDetails.getEmail());
		
		Student updatedStudent = studentRepo.save(student);
		return ResponseEntity.ok(updatedStudent);
	}
	
	//delete student
	@DeleteMapping("/students/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteStudent(@PathVariable Long id){
		Student student = studentRepo.findById(id).
				orElseThrow(()-> new ResourceNotFoundException("Student with id " +id+ " does not exist"));
		studentRepo.delete(student);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
}
