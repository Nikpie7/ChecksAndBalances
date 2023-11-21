import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

function PasswordReset() {
  const { token } = useParams();
  //const history = useHistory(); // Initialize useHistory
  const [message, setMessage] = useState('');
  const [newPassword, setNewPassword] = useState(''); // State for new password

  useEffect(() => {
    // Existing code to verify token
  }, [token]);

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
  
    // Use axios.post instead of axios.get
    axios.post('http://checksnbalances.us/api/password-reset', { token, newPassword })
      .then(response => {
        setMessage('Password successfully reset.');
        // setTimeout(() => history.push('/login'), 3000); // Uncomment if you want to redirect after reset
      })
      .catch(error => {
        setMessage('Failed to reset password. Please try again.');
      });
  };
  

  return (
    <div>
      <h1>Password Reset</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="password" 
          placeholder="Enter new password" 
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default PasswordReset;
