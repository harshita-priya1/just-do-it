import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [user, setUser] = useState({
    email: "",
    name: "",
    password: "",
    phone: "",
  });
  const navigate = useNavigate();

  const toSignIn = () => {
    // Navigate to the About page when the button is clicked
    navigate("/");
  };
  const onSignup = async (e) => {
    e.preventDefault();
    const email = user.email;
    const password = user.password;
    const name = user.name;
    const phone = user.phone;
    try {
      const response = await fetch("http://localhost:3000/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name, phone }),
      });

      const data = await response.json();

      // Check if sign-in was successful
      if (data.status === "SUCCESS") {
        // Save user details in cookies
        localStorage.setItem("user", JSON.stringify(data.data.user));
        localStorage.setItem("token", data.data.token);

        navigate("/home", { replace: true });
      } else {
        console.error("Sign-up failed:", data.message);
        alert(data.message);
      }
    } catch (error) {
      console.error("Error signing up:", error);
      alert(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#EFD9D1]">
      <div className="flex flex-col gap-4 p-8 pl-20 pr-20 rounded-3xl  bg-[#DDB7AB]">
        <label className="text-[#F4EEED]" htmlFor="email">
          Email:
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          className="text-black rounded-2xl p-2"
        />
        <label className="text-[#F4EEED]" htmlFor="name">
          Name:
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          className="text-black rounded-2xl p-2"
        />
        <label className="text-[#F4EEED]" htmlFor="password">
          Password:
        </label>
        <input
          type="password"
          name="password"
          id="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          className="text-black rounded-2xl p-2"
        />
        <label className="text-[#F4EEED]" htmlFor="phone">
          Phone:
        </label>
        <input
          type="text"
          name="phone"
          id="phone"
          value={user.phone}
          onChange={(e) => setUser({ ...user, phone: e.target.value })}
          className="text-black rounded-2xl p-2"
        />
        <button
          onClick={onSignup}
          type="submit"
          className="text-xl text-[#F4EEED] bg-[#999B84] mt-8 p-4 pl-8 pr-8 self-center rounded-2xl"
        >
          SignUp
        </button>
        <div
          onClick={toSignIn}
          className="text-[#F4EEED] text-center hover:text-[#999B84] hover:underline cursor-pointer"
        >
          Sign In instead!
        </div>
      </div>
    </div>
  );
}
