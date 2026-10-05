'use client'

import { authenticateUser } from "../lib/actions";
import { useState } from "react";

function Login({onRegister}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState("");

    const handleLogin = async (formData:FormData) => {
        try {
            setError('');
          const res = await authenticateUser(formData);
          window.location.replace(res);
          
        } catch (err: any) {
            setError(err.message || "Login attempt failed.");
        }
    };

    const handleSetEmail = (email: string) => {
        setEmail(email);
    }


    const handleSetPassword = (password: string) => {
        setPassword(password);
    }
    
    
  return (
    <div className="flex justify-center items-center h-full">
      <form className="p-10 bg-white rounded-lg w-1/2 font-[arial] shadow-sm" action={handleLogin}>
        <h2 className="center mb-4 font-extrabold">System Authentication</h2>
        {error && (
          <div
            style={{ color: "#d73a49", marginBottom: "16px", fontSize: "14px" }}
          >
            {error}
          </div>
        )}
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => handleSetEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "16px",
            borderRadius: "4px",
            border: "1px solid #d1d5da",
            boxSizing: "border-box",
          }}
        />

        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => handleSetPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "24px",
            borderRadius: "4px",
            border: "1px solid #d1d5da",
            boxSizing: "border-box",
          }}
        />

        <button
          type="submit"
          // formAction={handleLogin}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#2ea44f",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Login
        </button>
        <span>New User?</span>
        <a onClick={onRegister}>Register</a>
      </form>
    </div>
  );
}

export default Login