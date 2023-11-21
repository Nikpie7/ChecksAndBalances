import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import authService from "../utils/authService";

const ForgotPasswordPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission

    authService
      .postSendPasswordReset({ username, email })
      .then((result) => {
        // If any sort of message appears, something went wrong.
        if (result === "") {
          alert("Something went wrong.");
        } else {
          // Re-route to page to input new password.
          window.location.href = "/resetPassword/:token";
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h1>Password Reset</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="username"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
