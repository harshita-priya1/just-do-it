import React, { useEffect, useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user._id;
    const getTodos = async () => {
      try {
        let response = await fetch(
          `http://localhost:3000/todo/get?userId=${userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        response = await response.json();
        console.log(response);
        if (response.status === 200) {
          setTodos(response.data);
          //   console.log(response.data);
        } else {
          console.log(response);
        }
      } catch (error) {
        alert(error);
        console.log(error);
      }
    };
    getTodos();
    // console.log(todos);
  }, []);
  return (
    <div>
      <ul>
        {todos
          ? todos.map((i) => {
              return <li key={i._id}>{i.content}</li>;
            })
          : null}
      </ul>
    </div>
  );
}
