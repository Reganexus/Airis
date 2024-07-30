"use client";
import { useState } from "react";

const initialState = {
  message: "",
};

function SubmitButton({ pending }) {
  return (
    <button type="submit" aria-disabled={pending}>
      Add
    </button>
  );
}

function RegisterUser() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState(initialState.message);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPending(true);
    try {
      const response = await fetch("/api/register/", {
        method: "POST",
        body: new URLSearchParams(formData),
      });
      const result = await response.json();
      setMessage(result.message);
    } catch (error) {
      setMessage("Failed to register user");
    } finally {
      setPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mx-auto max-w-md mt-10">
      <input
        className="border border-black"
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
      />
      <input
        className="border border-black"
        type="text"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        className="border border-black"
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />
      <SubmitButton pending={pending} />
      {message && <p>{message}</p>}
    </form>
  );
}

// Export RegisterUser as the default export
export default RegisterUser;
