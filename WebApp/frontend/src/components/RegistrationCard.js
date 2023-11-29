import {
  react,
  useState
} from 'react';
import FormInput from './FormInput.js';
import authService from '../utils/authService.js';
import * as emailValidator from 'email-validator';
import NewPasswordInput from './NewPasswordInput.js';
import passwordValidator from 'password-validator';
import { useNavigate } from 'react-router-dom';
import { updateInterests } from '../utils/onboardingService.js';
const schema = new passwordValidator();
schema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits()                                // Must have digits

const RegistrationCard = ({userData, className}) => {
  const navigate = useNavigate();
  const [loginCreds, setLoginCreds] = useState({
    password: '',
    passwordConfirm: '',
    email: '',
    firstName: '',
    lastName: '',
  });
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const handleFormChange = event => {
    const { name, value } = event.target;
    setLoginCreds({
      ...loginCreds,
      [name]: value
    });
  };
  const handleFormSubmit = event => {
    event.preventDefault();
    loginCreds.address = userData.address;
    loginCreds.interests = [...userData.interests];
    console.log(loginCreds);
    if (loginCreds.password.localeCompare(loginCreds.passwordConfirm) !== 0) {
      setErrorMessage('Passwords do not match');
      return;
    }
    if (!emailValidator.validate(loginCreds.email)) {
      setErrorMessage('Invalid email');
      return;
    }
    if (!schema.validate(loginCreds.password)) {
      setErrorMessage('Password does not meet complexity requirements');
      return;
    }
    // delete loginCreds.passwordConfirm;
    authService.postRegister(loginCreds)
      .then(response => {
        alert('Registration successful! A verification email has been sent, please verify your email before logging in.');
        navigate('/');
      })
      .catch(error => {
        console.log('jaaaaTest');
        console.log(error.response.data.error);
        setErrorMessage(error.response.data.error);
      });
  }
  return (
    <div className={`w-[30rem] p-8 shadow-lg bg-white rounded-xl ${className}`}>
      <h2 className="font-semibold text-2xl">
        Create a new account
      </h2>
      <form className="mt-4" onSubmit={handleFormSubmit}>
        <span className="max-h-min flex gap-2 justify-between">
          <FormInput
            name="firstName"
            label="First Name"
            placeholder="Your first name"
            handleChange={handleFormChange}
            credObj={loginCreds}
          />
          <FormInput
            name="lastName"
            label="Last Name"
            placeholder="Your last name"
            handleChange={handleFormChange}
            credObj={loginCreds}
          />
        </span>
        <FormInput
          name="email"
          label="Email address"
          placeholder="Enter your email address"
          handleChange={handleFormChange}
          credObj={loginCreds}
          onBlur={() => setEmailValid(emailValidator.validate(loginCreds.email))}
          formStyling={emailValid || loginCreds.email === '' ? '' : 'border border-red-600'}
        />
        <NewPasswordInput passwordObj={loginCreds} setPasswordObj={handleFormChange} />
        <p className="text-red-500">{errorMessage}</p>
        <p>{statusMessage}</p>
      <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-300" />
        <button
          type="submit"
          className="w-full font-semibold py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
        >

          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationCard;