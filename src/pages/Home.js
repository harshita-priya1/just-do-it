import React, { useEffect, useState } from "react";

const formatEndDate = (endDate) => {
  const date = new Date(endDate);
  return date.toLocaleDateString();
};

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [content, setContent] = useState("");
  const [endDate, setEndDate] = useState(null);
  const [isClicked, setIsClicked] = useState(0);
  const [selectedTodo, setSelectedTodo] = useState(null);

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
      setIsClicked(0);
      setEndDate(null);
      setContent("");
    } catch (error) {
      alert(error);

      setIsClicked(0);
      setEndDate(null);
      setContent("");
    }
  };
  const modifyTodo = async (todoId) => {
    try {
      let response = await fetch(`http://localhost:3000/todo/modify`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: content,
          endDate: endDate,
          todoId: todoId,
        }),
      });
      response = await response.json();
      console.log(response);
      if (response.status === 200) {
        getTodos();
      } else {
        alert("Server Error");
      }
      setIsClicked(0);
      setEndDate(null);
      setContent("");
      setSelectedTodo(null);
    } catch (error) {
      alert(error);

      setIsClicked(0);
      setEndDate(null);
      setContent("");
      setSelectedTodo(null);
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
      {isClicked === 0 ? (
        <ul className="w-screen flex flex-col items-center mt-8">
          {todos
            ? todos.map((todo) => (
                <li
                  key={todo._id}
                  className="bg-[#DDB7AB] p-4 m-4 w-4/5 rounded-md shadow-md max-w-screen-sm"
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
                    <button
                      onClick={() => {
                        setIsClicked(2);
                        setSelectedTodo(todo._id);
                      }}
                      className="bg-[#999B84] text-[#F4EEED] px-2 py-1 rounded-md"
                    >
                      Modify
                    </button>
                  </div>
                </li>
              ))
            : null}
        </ul>
      ) : (
        <div className="bg-[#DDB7AB] h-1/2 self-center p-4 rounded-lg shadow-md">
          <h2 className="text-[#F4EEED] text-center text-lg font-semibold mb-4">
            {isClicked === 1 ? `New To-Do` : "Modify To-Do"}
          </h2>
          <div className="mb-4">
            <label
              htmlFor="content"
              className=" text-[#F4EEED] block font-semibold mb-2"
            >
              Content:
            </label>
            <input
              type="text"
              id="todoContent"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#999B84] placeholder-[#999B84]::placeholder"
              placeholder="Enter todo content"
              style={{ color: "#999B84" }}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="endDate"
              className=" text-[#F4EEED] block font-semibold mb-2"
            >
              Due Date:
            </label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              placeholder="dd/mm/yyyy"
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#999B84]"
              style={{ color: "#999B84" }}
            />
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => {
                console.log(content, endDate);
                isClicked === 1 ? createTodo() : modifyTodo(selectedTodo);
              }}
              className="bg-[#999B84] text-[#F4EEED] px-4 py-2 rounded-md mr-2"
            >
              {isClicked === 1 ? "Create" : "ModiFy"}
            </button>
            <button
              onClick={() => {
                setIsClicked(0);
                setEndDate(null);
                setContent("");
              }}
              className="bg-[#999B84] text-[#F4EEED] font-thin px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <button
        onClick={() => {
          setIsClicked(1);
        }}
        className="h-20 w-20 rounded-full bg-[#DDB7AB] fixed bottom-0 mb-8 right-0 mr-8 text-[#F4EEED] text-5xl"
      >
        +
      </button>
    </div>
  );
}
