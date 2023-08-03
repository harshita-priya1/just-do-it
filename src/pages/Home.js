import React, { useEffect, useState } from "react";

const formatEndDate = (endDate) => {
  const date = new Date(endDate);
  return date.toLocaleDateString();
};

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [content, setContent] = useState("");
  const [endDate, setEndDate] = useState(null);
  const [isClicked, setIsClicked] = useState(false);

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
  useEffect(() => {
    getTodos();
    // console.log(todos);
  }, []);

  const update = async (todoId) => {
    try {
      let response = await fetch(`http://localhost:3000/todo/update`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ todoId: todoId }),
      });
      response = await response.json();
      console.log(response);
      if (response.status === 200) {
        getTodos();
      } else {
        alert("Server Error");
      }
    } catch (error) {
      alert(error);
    }
  };
  const deleteTodo = async (todoId) => {
    try {
      let response = await fetch(`http://localhost:3000/todo/delete`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ todoId: todoId }),
      });
      response = await response.json();
      console.log(response);
      if (response.status === 200) {
        getTodos();
      } else {
        alert("Server Error");
      }
    } catch (error) {
      alert(error);
    }
  };
  const createTodo = async () => {
    try {
      let response = await fetch(`http://localhost:3000/todo/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: content,
          endDate: endDate,
          userId: userId,
        }),
      });
      response = await response.json();
      console.log(response);
      if (response.status === 200) {
        getTodos();
      } else {
        alert("Server Error");
      }
      setIsClicked(false);
      setEndDate(null);
      setContent("");
    } catch (error) {
      alert(error);

      setIsClicked(false);
      setEndDate(null);
      setContent("");
    }
  };

  return (
    // <div>
    //   <ul>
    //     {todos
    //       ? todos.map((i) => {
    //           return <li key={i._id}>{i.content}</li>;
    //         })
    //       : null}
    //   </ul>
    // </div>
    <div className=" flex justify-center  h-screen bg-[#EFD9D1]">
      {!isClicked ? (
        <ul className="w-screen flex flex-col items-center mt-8">
          {todos
            ? todos.map((todo) => (
                <li
                  key={todo._id}
                  className="bg-[#DDB7AB] p-4 m-4 w-4/5 rounded-md shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={todo.status}
                        className="mr-2"
                        onClick={() => {
                          update(todo._id);
                        }}
                      />
                      <p className="text-[#F4EEED] font-bold">{todo.content}</p>
                    </div>
                    {todo.endDate && (
                      <p className="text-sm text-[#F4EEED]">
                        Due: {formatEndDate(todo.endDate)}
                      </p>
                    )}
                  </div>
                  <div className="flex justify-between mt-2">
                    <button
                      onClick={() => {
                        deleteTodo(todo._id);
                      }}
                      className="bg-[#999B84] text-[#F4EEED] px-2 py-1 rounded-md"
                    >
                      Delete
                    </button>
                    <button className="bg-[#999B84] text-[#F4EEED] px-2 py-1 rounded-md">
                      Modify
                    </button>
                  </div>
                </li>
              ))
            : null}
        </ul>
      ) : (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">New To-Do</h2>
          <div className="mb-4">
            <label htmlFor="content" className="block font-semibold mb-2">
              Todo Content:
            </label>
            <input
              type="text"
              id="todoContent"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
              placeholder="Enter todo content"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="endDate" className="block font-semibold mb-2">
              To-do Due Date:
            </label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => {
                createTodo();
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
            >
              Create
            </button>
            <button
              onClick={() => {
                setIsClicked(false);
                setEndDate(null);
                setContent("");
              }}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <button
        onClick={() => {
          setIsClicked(true);
        }}
        className="h-20 w-20 rounded-full bg-[#DDB7AB] fixed bottom-0 mb-8 right-0 mr-8 text-[#F4EEED] text-5xl"
      >
        +
      </button>
    </div>
  );
}
