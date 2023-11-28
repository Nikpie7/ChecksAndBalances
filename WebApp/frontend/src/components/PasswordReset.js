import React, { useEffect, useState } from "react";
import { useParams, useHistory, useNavigate } from "react-router-dom";
import axios from "axios";
import authService from "../utils/authService";
import smallLogo from '../assets/smallLogo.png';
import { HeaderBar } from "./HeaderBar";
import Card from "./Card";
import FormInput from "./FormInput";
import NewPasswordInput from "./NewPasswordInput";
import passwordValidator from 'password-validator';
const schema = new passwordValidator();
schema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits()                                // Must have digits

const PasswordReset = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordObj, setPasswordObj] = useState({
    password: '',
    passwordConfirm: '',
  });

  useEffect(() => {
    // Existing code to verify token
  }, [token]);

  const handleFormChange = event => {
    const { name, value } = event.target;
    setPasswordObj({
      ...passwordObj,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    if (passwordObj.password.localeCompare(passwordObj.passwordConfirm) !== 0) {
      setErrorMessage('Passwords do not match');
      return;
    }
    if (!schema.validate(passwordObj.password)) {
      setErrorMessage('Password does not meet complexity requirements');
      return;
    }
    setErrorMessage('');
    authService.resetPassword({token, newPassword: passwordObj.password})
    .then(response => {
      // If any sort of message appears, something went wrong.
      console.log(response);
      setStatusMessage(`${response.data}. Redirecting to login page`);
      setTimeout(() => navigate('/'), 5000);
    })
    .catch(error => {
      console.log(error);
      setErrorMessage(error.response.data);
    });
  };

  return (<>
    <HeaderBar props={{
      left: <img src={smallLogo} className="ml-6 h-[10vh] object-contain justify-self-center" />,
      center: <h1 className="flex gap-2 items-center text-3xl font-semibold w-max">Reset Password</h1>,
      right: null
    }} />
    <div className="w-[100vw] h-[90vh] flex justify-center">
      <Card className="w-1/4 h-max mt-20">
        <span className="flex justify-between items-center">
          <h2 className="font-semibold text-2xl">Enter your new password</h2>
        </span>
        <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-300" />
        <form className="mt-4" onSubmit={handleSubmit}>
          <NewPasswordInput passwordObj={passwordObj} setPasswordObj={handleFormChange} />
          <p className="text-red-500">{errorMessage}</p>
          <p>{statusMessage}</p>
          <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-300" />
          <span className="flex justify-end items-center">
            <button type="submit" className="w-max px-4 py-2 text-white bg-blue-500 rounded-lg font-semibold hover:bg-blue-600 focus:outline-none">Reset password</button>
          </span>
        </form>
      </Card>
    </div>
  </>);
}

export default PasswordReset;
