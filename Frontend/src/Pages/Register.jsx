import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name ||!email || !password) {
      return toast.error("Please fill all fields");
    }
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", 
        body: JSON.stringify({ name,email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        console.log("Registeration failed");
        return toast.error(data.message)
      }
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      toast.success("Registeration successful");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-gray-900 p-8 rounded-xl"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>
        <div className="mb-4">
          <label className="block text-sm mb-1">Name</label>
          <input
            type="name"
            className="w-full px-4 py-2 rounded bg-gray-800 outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 rounded bg-gray-800 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 rounded bg-gray-800 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 py-2 rounded font-medium hover:bg-red-500 transition"
        >
          Register
        </button>
        <div className="flex justify-end ">
           <a href="/login" className="pt-5 text-blue-400 underline">Already Existing User ?</a> 
        </div>
      </form>
    </div>
  );
};

export default Register;
