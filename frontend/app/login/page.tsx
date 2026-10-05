'use client'
import React, { useState } from "react";
import Login from "../../components/Login";
import Register from "../../components/Register";

export default function LoginPage() {
  const [isNewUser, setIsNewUser] = useState(false);

  const handleRegister = () => {
    setIsNewUser(true);
  }

  return (
    <div className="grid place-items-center h-screen bg-cyan-100">
      {!isNewUser ? <Login onRegister={handleRegister} /> : <Register />}
    </div>
  );
}
