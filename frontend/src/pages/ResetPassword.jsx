import { useState } from "react";
import API from "../api/axios";

const ResetPassword = () => {
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      await API.post("/auth/reset-password", { token, password });
      alert("Password reset successful");
    } catch (error) {
  console.log(error.response?.data);
  alert(error.response?.data?.message || "Reset failed");
}
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-6 bg-white shadow rounded w-80">
        <h2 className="text-xl mb-4">Reset Password</h2>

        <input
          placeholder="Token"
          className="border p-2 w-full mb-2"
          onChange={(e) => setToken(e.target.value)}
        />

        <input
          type="password"
          placeholder="New Password"
          className="border p-2 w-full mb-2"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleSubmit} className="bg-green-500 text-white w-full p-2 rounded">
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;