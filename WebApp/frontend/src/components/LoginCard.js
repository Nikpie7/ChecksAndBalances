import {
  react,
  useState
} from 'react';
import authService from '../utils/authService.js';

const LoginCard = ({className}) => {
  const [loginCreds, setLoginCreds] = useState({
    username: '',
    password: ''
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
    authService.postLogin(loginCreds)
      .then(userData => {
        if (userData.id === -1) {
          alert('Invalid username and/or password');
        }
        sessionStorage.setItem('userData', JSON.stringify(userData));
        window.location.href = './cards';
      })
      .catch(error => console.log(error));
  }

  return (
    <div className={`w-[30rem] p-8 shadow-lg bg-white rounded-xl ${className}`}>
      <h2 className="font-semibold text-2xl">
        Sign in to Checks & Balances
      </h2>
      <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-300" />
      <form className="mt-4" onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={loginCreds.username}
            onChange={handleFormChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Your username"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={loginCreds.password}
            onChange={handleFormChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Your password"
            required
          />
        </div>
        <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-300" />
        <button
          type="submit"
          className="w-full py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          Login
        </button>
      </form>
      <div className="mt-4 text-center">
        <a
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          href="./register"
        >
          Sign up for a new account
        </a>
        <br></br>
        <a
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          href="./forgotPassword"
        >
          Forgot password?
        </a>
      </div>
    </div>
  );
};

export default LoginCard;