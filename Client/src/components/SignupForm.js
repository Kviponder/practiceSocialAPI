import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { MUTATION_ADD_USER } from "../utils/mutations";
const UserForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [addUser, { loading, error }] = useMutation(MUTATION_ADD_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await addUser({
        variables: { username, email, password },
      });

      // Handle successful registration, e.g., redirect user
      console.log("User registered:", data.addUser.user);
    } catch (err) {
      console.error("Registration error:", err);
    }
  };

  return (
    <div className="flex-center">
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <input
          className="form-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="form-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="form-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="form-button" type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
        {error && <p className="form-error">Error: {error.message}</p>}
      </form>
    </div>
  </div>
  );
};

export default UserForm;
