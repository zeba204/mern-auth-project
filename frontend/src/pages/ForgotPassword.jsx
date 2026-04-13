import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      const res = await API.post("/auth/forgot-password", { email });
      setToken(res.data.token);
    } catch {
      alert("Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-6 bg-white shadow rounded w-80">
        <h2 className="text-xl mb-4">Forgot Password</h2>

        <input
          placeholder="Enter email"
          className="border p-2 w-full mb-2"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={handleSubmit} className="bg-blue-500 text-white w-full p-2 rounded">
          Get Token
        </button>
        {token && <p>Token: {token}</p>}
        {token && (
        <button
         onClick={() => navigate("/reset-password")}
         className="mt-3 w-full bg-green-600 text-white p-2 rounded"
        >
         Go to Reset Password
        </button>
   )}
      </div>
    </div>
  );
};

export default ForgotPassword;