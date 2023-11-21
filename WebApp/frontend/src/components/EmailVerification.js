// EmailVerification.js 
import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

function EmailVerification() {
  const { token } = useParams();
  const history = null;
  const [message, setMessage] = useState('');

  console.log(token);

  useEffect(() => {
    axios.get(`https://checksnbalances.us/api/verify-email?token=${token}`)
      .then(response => {
        setMessage('Email verified successfully. You can now login.');
        // Redirect after a delay
        // setTimeout(() => history.push('/login'), 3000);
      })
      .catch(error => {
        setMessage('Failed to verify email. Please try again.');
      });
  }, [token, history]);

  return (
    <div>
      <h1>Email Verification!!!!!!</h1>
      <p>{message}</p>
    </div>
  );
}

export default EmailVerification;
