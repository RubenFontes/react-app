import React, { useState, useEffect } from "react";

import "./styles.css";
import { Card, CardProps } from "../../components/Card";

export function Home() {
  const [studentName, setStudentName] = useState("");
  const [user, setUser] = useState({ name: '', avatar: ''})
  const [students, setStudents] = useState<CardProps[]>([]);

  function handleAddStudent() {
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    };

    setStudents((prevState) => [...prevState, newStudent]);
  }

  useEffect(()=>{
    fetch('https://api.github.com/users/RubenFontes')
    .then(response => response.json())
    .then(data => {
      setUser({
        name: data.name,
        avatar: data.avatar_url
      })
    })
  }, [])

  return (
    <div className="wrapper">
      <div className="container">
        <header>
          <h1>Invite List</h1>
          <div>
            <strong>{user.name}</strong>
            <img src={user.avatar} alt="foto" />
          </div>
        </header>
        <input
          type="text"
          placeholder="Type your name..."
          onChange={(e) => setStudentName(e.target.value)}
        />
        <button type="button" onClick={handleAddStudent}>
          Add
        </button>

        {students.map((student) => (
          <Card key={student.time} name={student.name} time={student.time} />
        ))}
    </div>
    </div>
  );
}