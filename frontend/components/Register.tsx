'use client'

import React, { useState } from 'react'

const Register = () => {
    const [role, setRole] = useState('');
    const [error, setError]= useState('');
    const [email, setEmail] = useState("");
    const [password,setPassword]=useState('');
    const [password2, setPassword2] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const handleRegister = (e: React.SubmitEvent) => {
      e.preventDefault();


    }

    const handleSetEmail = (email:string) => {
        
    };

    const handleSetPassword = (password: string) => { };

    const handleSetPassword2 = (password: string) => {};
    
    const handleSetFirstName = (firstName: string) => { };
    
    const handleSetLastName = (lastName: string) => {};
    

  return (
    <div>
      <div className="flex justify-center items-center h-full">
        <form
          className="p-10 bg-white rounded-lg w-1/2 font-[arial] shadow-sm"
          onSubmit={handleRegister}
        >
          <h2 className="center mb-4 font-extrabold">Sign-Up</h2>
          {error && (
            <div
              style={{
                color: "#d73a49",
                marginBottom: "16px",
                fontSize: "14px",
              }}
            >
              {error}
            </div>
          )}

          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="Enter Your First Name"
            value={firstName}
            onChange={(e) => handleSetFirstName(e.target.value)}
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
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Enter Your Last Name"
            value={lastName}
            onChange={(e) => handleSetLastName(e.target.value)}
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
            type="email"
            id="email"
            name="email"
            placeholder="Email Address"
            onChange={(e) => handleSetEmail(e.target.value)}
            value={email}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "16px",
              borderRadius: "4px",
              border: "1px solid #d1d5da",
              boxSizing: "border-box",
            }}
          />

          <select
            name="role"
            id="role"
            onChange={(e) => setRole(e.target.value)}
            value={role}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "24px",
              borderRadius: "4px",
              border: "1px solid #d1d5da",
              boxSizing: "border-box",
            }}
          >
            <option value="">Select A Role</option>
            <option value="OWNER">OWNER</option>
            <option value="DRIVER">DRIVER</option>
            <option value="SERVICE-PROVIDER">SERVICE-PROVIDER</option>
          </select>

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

          <input
            type="password"
            id="password"
            name="password"
            placeholder="Confirm Password"
            value={password2}
            onChange={(e) => handleSetPassword2(e.target.value)}
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
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register