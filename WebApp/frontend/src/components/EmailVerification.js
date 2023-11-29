// EmailVerification.js 
import React, { useEffect, useState } from 'react';
import { useParams, useHistory, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EmailVerification() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  console.log(token);

  useEffect(() => {
    axios.get(`https://checksnbalances.us/api/verify-email?token=${token}`)
      .then(response => {
        alert('Email verified successfully! Redirecting to login page.');
        navigate('/');
        
        // setMessage('Email verified successfully. You can now login.');
        // Redirect after a delay
        // setTimeout(() => history.push('/login'), 3000);
      })
      .catch(error => {
        setMessage('Failed to verify email.');
      });
  }, [token]);

  return (
    <div>
      {/* <h1>Email</h1>
      <p>{message}</p> */}
    </div>
  );
}

export default EmailVerification;
