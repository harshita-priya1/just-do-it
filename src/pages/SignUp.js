import React, { useState } from "react";

const SignUp = () => {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <label>Name:</label>
      <input type="text" value={name} placeholder="Name" />
      <label>E-Mail:</label>
      <input type="text" value={name} />
      <label>Password:</label>
      <input type="password" value={name} className="text-black" />
    </div>
  );
};

export default SignUp;
