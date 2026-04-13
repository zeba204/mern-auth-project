import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await API.post("/auth/register", form);
      alert("Registered successfully");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl font-bold mb-4">Register</h2>

        <input name="name" placeholder="Name" onChange={handleChange} className="border p-2 w-full mb-2" />
        <input name="email" placeholder="Email" onChange={handleChange} className="border p-2 w-full mb-2" />
        <input name="phone" placeholder="Phone" onChange={handleChange} className="border p-2 w-full mb-2" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="border p-2 w-full mb-2" />

        <button onClick={handleSubmit} className="bg-blue-500 text-white w-full p-2 rounded">
          Register
        </button>

        <p className="mt-2 text-sm">
          Already have account?{" "}
          <span className="text-blue-500 cursor-pointer" onClick={() => navigate("/")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;