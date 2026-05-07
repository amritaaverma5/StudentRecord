import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const API = process.env.REACT_APP_API_URL || "/api";

  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [editUserId, setEditUserId] = useState(null);

  const [posts, setPosts] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [selectedUser, setSelectedUser] = useState("");

  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);

  const [studentName, setStudentName] = useState("");
  const [courseName, setCourseName] = useState("");

  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");

  // ===== USER CRUD =====
  const fetchUsers = async () => {
    const res = await axios.get(`${API}/user`);
    setUsers(res.data);
  };

  const addUser = async () => {
    if (editUserId) {
      await axios.put(`${API}/user/${editUserId}`, { name });
      setEditUserId(null);
    } else {
      await axios.post(`${API}/user`, { name });
    }
    setName("");
    fetchUsers();
  };

  const deleteUser = async (id) => {
    await axios.delete(`${API}/user/${id}`);
    fetchUsers();
  };

  const editUser = (u) => {
    setName(u.name);
    setEditUserId(u._id);
  };

  // ===== POSTS =====
  const fetchPosts = async () => {
    const res = await axios.get(`${API}/post`);
    setPosts(res.data);
  };

  const addPost = async () => {
    await axios.post(`${API}/post`, {
      title: postTitle,
      userId: selectedUser
    });
    setPostTitle("");
    fetchPosts();
  };

  const deletePost = async (id) => {
    await axios.delete(`${API}/post/${id}`);
    fetchPosts();
  };

  // ===== STUDENTS & COURSES =====
  const fetchStudents = async () => {
    const res = await axios.get(`${API}/student`);
    setStudents(res.data);
  };

  const fetchCourses = async () => {
    const res = await axios.get(`${API}/course`);
    setCourses(res.data);
  };

  const addStudent = async () => {
    await axios.post(`${API}/student`, { name: studentName });
    setStudentName("");
    fetchStudents();
  };

  const deleteStudent = async (id) => {
    await axios.delete(`${API}/student/${id}`);
    fetchStudents();
  };

  const addCourse = async () => {
    await axios.post(`${API}/course`, { title: courseName });
    setCourseName("");
    fetchCourses();
  };

  const deleteCourse = async (id) => {
    await axios.delete(`${API}/course/${id}`);
    fetchCourses();
  };

  const enroll = async () => {
    await axios.post(`${API}/enroll`, {
      studentId: selectedStudent,
      courseId: selectedCourse
    });
    fetchStudents();
    fetchCourses();
  };

  const unenroll = async () => {
    await axios.post(`${API}/unenroll`, {
      studentId: selectedStudent,
      courseId: selectedCourse
    });
    fetchStudents();
    fetchCourses();
  };

  useEffect(() => {
    fetchUsers();
    fetchPosts();
    fetchStudents();
    fetchCourses();
  }, []);

  return (
    <div style={{ padding: "20px" }}>

      <h1> FULL CRUD WITH RELATIONS</h1>

      {/* USER */}
      <h2>User CRUD</h2>
      <input value={name} onChange={e => setName(e.target.value)} />
      <button onClick={addUser}>
        {editUserId ? "Update" : "Add"}
      </button>

      {users.map(u => (
        <div key={u._id}>
          {u.name}
          <button onClick={() => editUser(u)}>Edit</button>
          <button onClick={() => deleteUser(u._id)}>Delete</button>
        </div>
      ))}

      {/* POSTS */}
      <h2>Posts</h2>
      <select onChange={(e) => setSelectedUser(e.target.value)}>
        <option>Select User</option>
        {users.map(u => (
          <option key={u._id} value={u._id}>{u.name}</option>
        ))}
      </select>

      <input onChange={(e) => setPostTitle(e.target.value)} placeholder="Title" />
      <button onClick={addPost}>Add Post</button>

      {posts.map(p => (
        <div key={p._id}>
          {p.title} → {p.userId?.name}
          <button onClick={() => deletePost(p._id)}>Delete</button>
        </div>
      ))}

      {/* MANY TO MANY */}
      <h2>Students & Courses</h2>

      <input onChange={(e) => setStudentName(e.target.value)} placeholder="Student" />
      <button onClick={addStudent}>Add</button>

      <input onChange={(e) => setCourseName(e.target.value)} placeholder="Course" />
      <button onClick={addCourse}>Add</button>

      <br /><br />

      <select onChange={(e) => setSelectedStudent(e.target.value)}>
        <option>Select Student</option>
        {students.map(s => (
          <option key={s._id} value={s._id}>{s.name}</option>
        ))}
      </select>

      <select onChange={(e) => setSelectedCourse(e.target.value)}>
        <option>Select Course</option>
        {courses.map(c => (
          <option key={c._id} value={c._id}>{c.title}</option>
        ))}
      </select>

      <button onClick={enroll}>Enroll</button>
      <button onClick={unenroll}>Unenroll</button>

      <h3>Students</h3>
      {students.map(s => (
        <div key={s._id}>
          {s.name} → {s.courses.map(c => c.title).join(", ")}
          <button onClick={() => deleteStudent(s._id)}>Delete</button>
        </div>
      ))}

      <h3>Courses</h3>
      {courses.map(c => (
        <div key={c._id}>
          {c.title} → {c.students.map(s => s.name).join(", ")}
          <button onClick={() => deleteCourse(c._id)}>Delete</button>
        </div>
      ))}

    </div>
  );
}

export default App;