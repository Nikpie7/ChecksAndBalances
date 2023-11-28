import {
  react, useEffect, useState
} from 'react';
import { MdOutlineClose, MdOutlineInfo, MdOutlineLogin, MdOutlineArrowDownward, MdOutlineArrowBack } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import * as emailValidator from 'email-validator';

import Card from '../components/Card';
import authService from '../utils/authService'

import logo from '../assets/headerLogo.png';

import profilePic_Juni from '../assets/teammatePhotos/Juni.png';
import profilePic_Tim from '../assets/teammatePhotos/Tim.png';
import profilePic_Nikolai from '../assets/teammatePhotos/Nikolai.png';
import profilePic_Matt from '../assets/teammatePhotos/Matt.png';

const AboutUsButton = () => {
  const navigate = useNavigate();
  const [aboutUsVisible, setAboutUsVisible] = useState(false);
  return (<>
    <button onClick={() => setAboutUsVisible(true)} className="ml-4 flex gap-2 items-center text-2xl font-semibold hover:bg-gray-300 p-2 rounded-lg">
      <MdOutlineInfo className="text-4xl" /> About us
    </button>
    <AboutUsCard visible={aboutUsVisible} setVisible={setAboutUsVisible} />
  </>)
};

const LogInButton = () => {
  const navigate = useNavigate();
  const [loginVisible, setLoginVisible] = useState(false);
  return (<>
    <button onClick={() => setLoginVisible(true)} className="mr-4 flex gap-2 items-center text-2xl font-semibold hover:bg-gray-300 p-2 rounded-lg">
      Log in <MdOutlineLogin className="text-4xl" />
    </button>
    <LoginCard visible={loginVisible} setVisible={setLoginVisible} />
  </>)
};

const LoginCard = ({visible, setVisible}) => {
  const navigate = useNavigate();
  const [loginCreds, setLoginCreds] = useState({
    username: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [resetVisible, setResetVisible] = useState(false);
  useEffect(() => {
    if (!visible) {
      setErrorMessage('');
      setResetVisible(false);
    }
  }, [visible]);
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
        console.log(userData);
        // if (userData.id === -1) {
        //   alert('Invalid username and/or password');
        // }
        // sessionStorage.setItem('userData', JSON.stringify(userData));
        // navigate('/Dashboard');
      })
      .catch(error => {
        setErrorMessage(error.response.data.error);
      });
  }

  if (!visible)
    return null;

  return (
    <div onClick={e => { if (e.target === e.currentTarget) setVisible(false);} } className="w-[100vw] h-[100vh] bg-black bg-opacity-25 absolute z-10 inset-0">
      <Card className="fixed inset-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-min">
        {!resetVisible ? <>
        <span className="flex justify-between items-center">
          <h2 className="font-semibold text-2xl">
            Sign in to Checks & Balances
          </h2>
          <button
            onClick={() => setVisible(false)}
          >
            <MdOutlineClose className="text-2xl" />
          </button>
        </span>
        <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-300" />
        <form className="mt-4" onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-lg">Username</label>
            <input type="text" id="username" name="username" value={loginCreds.username} onChange={handleFormChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500" placeholder="Your username" required />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-lg">Password</label>
            <input type="password" id="password" name="password" value={loginCreds.password} onChange={handleFormChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500" placeholder="Your password" required />
          </div>
          <p className="text-red-500">{errorMessage}</p>
          <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-300" />
          <span className="flex justify-between items-center">
            <a onClick={() => setResetVisible(true)} className="text-blue-500 text-lg hover:cursor-pointer">Forgot password?</a>
            <button type="submit" className="w-1/4 py-2 text-white bg-blue-500 rounded-lg font-semibold hover:bg-blue-600 focus:outline-none">Login</button>
          </span>
        </form></>
        : <ResetPasswordForm setVisible={setVisible} setResetVisible={setResetVisible} />
        }
      </Card>
    </div>
  );
};

const ResetPasswordForm = ({setVisible, setResetVisible}) => {
  const [resetEmail, setResetEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const handleResetSubmit = e => {
    e.preventDefault();
    if (!emailValidator.validate(resetEmail)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    authService.sendResetEmail({email: resetEmail})
      .then(response => {
        console.log(response.error);
        if (response.error === '') {
          setErrorMessage('');
          setStatusMessage('Email has been sent. Please check your inbox.');
          return;
        }
        setErrorMessage(response.error);
      })
      .catch(error => {
        setErrorMessage(error.error);
      });
  }
  return (
    <><span className="flex justify-between items-center">
      <h2 className="font-semibold text-2xl">
        Reset password
      </h2>
      <button onClick={() => setVisible(false)} > <MdOutlineClose className="text-2xl" /></button>
    </span>
    <p className="pt-2">Please enter the email associated with your account to obtain a reset link.</p>
    <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-300" />
    <form className="mt-4" onSubmit={handleResetSubmit}>
      <div className="mb-4">
        <label htmlFor="email" className="block text-lg">Email</label>
        <input type="text" id="email" name="email" value={resetEmail} onChange={e => setResetEmail(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500" placeholder="Your email" required />
      </div>
      <p className="text-red-500 mb-4">{errorMessage}</p>
      <p className="mb-4">{statusMessage}</p>
      <span className="flex justify-between items-center">
        <button type="button" className="flex text-blue-500 w-max items-center gap-1" onClick={() => setResetVisible(false)} >
          <MdOutlineArrowBack className="text-xl" />
          <p className="text-lg">Back to login</p>
        </button>
        <button type="submit" className="w-max px-4 py-2 text-white bg-blue-500 rounded-lg font-semibold hover:bg-blue-600 focus:outline-none">Send reset link</button>
      </span>
    </form></>
  );
}

const AboutUsCard = ({visible, setVisible}) => {

  if (!visible)
    return null;

  return (
    <div onClick={ e => { if (e.target === e.currentTarget) setVisible(false);} } className="w-[100vw] h-[100vh] bg-black bg-opacity-25 absolute z-10 inset-0">
      <Card className="fixed inset-1/2 -translate-x-1/2 -translate-y-1/2 w-7/12 h-min">
        <span className="flex justify-between items-center">
          <h2 className="font-semibold text-2xl">
            About Checks & Balances
          </h2>
          <button
            onClick={() => setVisible(false)}
          >
            <MdOutlineClose className="text-2xl" />
          </button>
        </span>
        <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-300" />
        <p>Checks & Balances is a student project for UCF's Process of Object Oriented Design course of Fall 2023</p>
        <a href="https://github.com/Nikpie7/ChecksAndBalances/">Github</a>
        <div
          className="flex flex-wrap justify-center items-start gap-5"
        >
          <Teammate
            picture={profilePic_Juni}
            description={{
              name: 'Juni Yeom',
              role: 'Website Front End'
            }}
            linkedIn=''
          />
          <Teammate
            picture={profilePic_Nikolai}
            description={{
              name: 'Nikolai Coletta',
              role: 'Project Manager & Database'
            }}
            linkedIn=''
          />
          <Teammate
            picture={profilePic_Tim}
            description={{
              name: 'Tim Kovacs',
              role: 'API '
            }}
            linkedIn=''
          />
          <Teammate
            picture={profilePic_Matt}
            description={{
              name: 'Matt Trump',
              role: 'Mobile Front End'
            }}
            linkedIn=''
          />
        </div>
      </Card>
    </div>
  );
}

const Teammate = ({picture, description, linkedIn}) => {
  return (
    <div className="flex flex-col items-center text-center gap-1 w-36" >
      <img src={picture} className="w-5/6 rounded-full" />
      <p className="font-semibold w-full text-xl">{description.name}</p>
      <p className="font-normal w-full">{description.role}</p>
    </div>
  );
};

const HeroCard = ({onClick}) => {
  const navigate = useNavigate();
  return (<>
    <div className="panBackground opacity-20 w-[100vw] h-[90vh] fixed -z-10" />
    <section className="h-max w-3/4 m-auto flex flex-col text-center justify-around items-center gap-9 mt-40">
      <h1 className="font-bold text-7xl bg-gradient-to-l from-red-600 to-blue-600 bg-clip-text text-transparent leading-[5rem]">Find out your representatives</h1>
      <div className="text-4xl flex flex-col justify-around gap-1">
        <p>Using publicly sourced data from congress.gov</p>
        <p>Get personalized updates on relevant policy to you</p>
      </div>
      <button
        className="rounded-xl bg-blue-500 w-max font-semibold text-white text-2xl p-4"
        onClick={() => navigate('./state')}
      >
        <div className="flex justify-center items-center gap-2">
          <p>Select a state</p>
          <MdOutlineArrowDownward className="text-3xl" />
        </div>
      </button>
    </section>
  </>)
};

export { AboutUsButton, LogInButton, HeroCard };