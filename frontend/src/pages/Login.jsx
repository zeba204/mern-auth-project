import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return alert("Please fill all fields");
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/login", {
        email,
        password,
      });

      console.log("LOGIN SUCCESS:", res.data);

      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      } else {
        alert("Login failed: No token received");
      }

    } catch (error) {
      console.log("LOGIN ERROR:", error.response || error);

      // show real backend message if exists
      const message =
        error?.response?.data?.message || "Login failed";

      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 mb-3 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-3 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="mt-2 text-sm text-center">
          Don’t have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>

       <p className="text-sm text-center mt-3">
       <span
       className="text-blue-600 cursor-pointer"
       onClick={() => navigate("/forgot-password")}
       >
       Forgot Password?
      </span>
      </p>
      </form>
    </div>
  );
};

export default Login;