import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import RegistrationCard from '../components/RegistrationCard';
import { HeaderBar, ViewTitle, BackButton } from '../components/HeaderBar';
import { useEffect, useState } from 'react';
import MapInterface from '../components/MapInterface';
import AddressCard from '../components/AddressCard';
import InterestsCard from '../components/InterestsCard';
import { StateDropdown, StateHeader } from '../components/StateComponents';
import { AboutUsButton, LogInButton, HeroCard } from './HomeViewComponents.js'
import logo from '../assets/headerLogo.png';
import { RepInfo, SenatorInfo } from '../components/PoliticianInfo';
import interestsJson from '../utils/interestsJson.js';
import smallLogo from '../assets/smallLogo.png';

  // HeaderBar   DONE

  // AboutUs     WIP
  // LogIn       WIP

  // HeroCard    WIP
  // StateDropdown   WIP
  // Senator        WIP
  // Representative  

  // Map

  // Address
  // Interests
  // Signup

const OnboardingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const paths = ['/', '/state', '/district', '/interests', '/createAccount'];

  const getStep = () => paths.findIndex(path => path === location.pathname);

  const [userData, setUserData] = useState({
    // state: null,
    // district: null,
    // interests: interestsJson,
    // email: '',
    // username: '',
    // password: ''
    state: 9,
    district: null,
    coords: null,
    interests: interestsJson,
    email: '',
    username: '',
    password: ''
  });
  const [headerBarState, setHeaderBarState] = useState({
    left: null,
    center: null,
    right: null
  });
  const [heroCardVisible, setHeroCardVisible] = useState(true);
  const [stateDropdownVisible, setStateDropdownVisible] = useState(false);
  const [stateHeaderVisible, setStateHeaderVisible] = useState(false);
  const [senatorInfoVisible, setSenatorInfoVisible] = useState(false);
  const [repInfoVisible, setRepInfoVisible] = useState(false);

  useEffect(() => {
    let titleText = { header: '', hover: '' }
    switch (location.pathname) {
      case paths[0]:
        // Thes setUserData()s are for resetting userData upon page back
        setUserData({ state: null, district: null, coords: null, interests: interestsJson, email: '', username: '', password: '' });
        break;
      case paths[1]:
        titleText = { header: 'Select a state', hover: 'Your state yes.' };
        setUserData({ state: null, district: null, coords: null, interests: interestsJson, email: '', username: '', password: '' });
        break;
      case paths[2]:
        titleText = { header: 'Find your congressional district', hover: 'Your address is needed to determine your U.S. House representative.' };
        setUserData({ ...userData, district: null, coords: null, interests: interestsJson, email: '', username: '', password: '' });
        break;
      case paths[3]:
        titleText = { header: 'Select your policy interests', hover: 'Your dashboard will be personalized based on your choice of policy interests.' };
        setUserData({ ...userData, email: '', username: '', password: '' });
        break;
      case paths[4]:
        titleText = { header: 'Create an account', hover: 'Save your representatives and policy interests by registering for an account.' };
        break;
    }
    if (location.pathname === '/')
      setHeaderBarState({
        left: <AboutUsButton />,
        center: <img src={logo} className="h-[8vh] object-contain justify-self-center" />,
        right: <LogInButton />
      })
    else
      setHeaderBarState({
        left: <BackButton onClick={() => navigate(paths[paths.findIndex(path => path === location.pathname) - 1])} />,
        center: <ViewTitle info={titleText} />,
        right: <img title="Back to home page" className="h-[10vh] pr-4 hover:cursor-pointer" onClick={() => navigate('/')} src={smallLogo} />
      })
    setHeroCardVisible(location.pathname === paths[0]);
    setStateDropdownVisible(location.pathname === paths[1]);
    setStateHeaderVisible(getStep() >= 2);
    setSenatorInfoVisible(location.pathname === paths[2]);
    setRepInfoVisible(location.pathname === paths[3]);
  }, [location]);

  return (<div className="w-[100vw] h-[100vh]">
    <HeaderBar props={headerBarState} />
    {heroCardVisible ? <HeroCard /> : null }
    {stateDropdownVisible ? <StateDropdown state={userData.state} setState={newState => {setUserData({...userData, state: newState})}} /> : null }
    <div className="flex justify-center">
      {
        getStep() !== 0 ?
        <div className={`${getStep() <= 1 ? 'w-[100vw]' : 'w-[50vw]'} flex flex-col items-center gap-5`}>
          {stateHeaderVisible ? <StateHeader className="pt-5" state={userData.state} district={userData.district} /> : null }
          <MapInterface userData={userData} setUserData={setUserData} />
        </div>
        : null
      }
      {
        getStep() > 1 ?
        <div className="w-[40vw] h-[85vh] flex flex-col justify-around items-center gap-5">
          {senatorInfoVisible ? <SenatorInfo /> : null}
          {repInfoVisible ? <RepInfo /> : null}
          <Routes>
            <Route path={paths[0]} element={null} />
            <Route path={paths[1]} element={null} />
            <Route path={paths[2]} element={<AddressCard userData={userData} setUserData={setUserData} />} />
            <Route path={paths[3]} element={<InterestsCard userData={userData} setUserData={setUserData} />} />
            <Route path={paths[4]} element={<RegistrationCard userData={userData} setUserData={setUserData} />} />
          </Routes>
        </div>
        : null
      }
    </div>
  </div>);
}

export default OnboardingPage;