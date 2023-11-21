import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import authService from "../utils/authService";

function PasswordReset() {
  const { token } = useParams();
  //const history = useHistory(); // Initialize useHistory
  const [message, setMessage] = useState("");
  const [newPassword, setNewPassword] = useState(""); // State for new password

  useEffect(() => {
    // Existing code to verify token
  }, [token]);

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission

    authService.postPasswordReset({ token, newPassword }).then(result => {
      // If any sort of message appears, something went wrong.
      if (result) {
        alert('Something went wrong.')
      }
      window.location.href = './'
    });

    
  };

  return (
    <div>
      <h1>New Password</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default PasswordReset;
