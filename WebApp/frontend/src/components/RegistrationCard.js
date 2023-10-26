import {
  react,
  useState
} from 'react';
import FormInput from './FormInput.js';
import authService from '../utils/authService.js';

const RegistrationCard = ({className}) => {
  const [loginCreds, setLoginCreds] = useState({
    username: '',
    password: '',
    passwordConfirm: '',
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    zipCode: ''
  });
  const handleFormChange = event => {
    const { name, value } = event.target;
    setLoginCreds({
      ...loginCreds,
      [name]: value
    });
  };
  const handleFormSubmit = event => {
    event.preventDefault();
    console.log(loginCreds);
    if (loginCreds.password.localeCompare(loginCreds.passwordConfirm) !== 0) {
      alert('Passwords do not match');
      return;
    }
    delete loginCreds.passwordConfirm;
    authService.postRegister(loginCreds)
      .then(userData => {
        alert('Registration successful! Please log in.');
        window.location.href = './';
      })
      .catch(error => console.log(error));
  }
  return (
    <div className={`w-[30rem] p-8 shadow-lg bg-white rounded-xl ${className}`}>
      <h2 className="font-semibold text-2xl">
        Create a new account
      </h2>
      <form className="mt-4" onSubmit={handleFormSubmit}>
        <FormInput
          name="username"
          label="Username"
          placeholder="Enter a username"
          handleChange={handleFormChange}
          credObj={loginCreds}
        />
        <FormInput
          name="password"
          label="Password"
          placeholder="Enter a password"
          handleChange={handleFormChange}
          credObj={loginCreds}
          password
        />
        <FormInput
          name="passwordConfirm"
          label="Confirm password"
          placeholder="Re-enter password"
          handleChange={handleFormChange}
          credObj={loginCreds}
          password
        />
        <FormInput
          name="email"
          label="Email address"
          placeholder="Enter your email address"
          handleChange={handleFormChange}
          credObj={loginCreds}
        />
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
        <span className="flex justify-between">
          <FormInput
            name="address"
            label="Street address"
            placeholder="123 Main Street, Orlando, FL"
            handleChange={handleFormChange}
            credObj={loginCreds}
            className="min-w-[75%]"
          />
          <FormInput
            name="zipCode"
            label="Zip code"
            placeholder="12345"
            handleChange={handleFormChange}
            credObj={loginCreds}
            className="max-w-lg w-full ml-2"
          />
        </span>
        <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-300" />
        <button
          type="submit"
          className="w-full py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationCard;