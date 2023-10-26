import React from 'react';

import PageTitle from '../components/PageTitle';
import LoggedInName from '../components/LoggedInName';
import CardUI from '../components/CardUI';
import NavBar from '../components/NavBar.js';

const DoxTable = ({userData}) => {
    let liArr = [];
    let i = 0;
    for (let key in userData) {
        if (userData.hasOwnProperty(key)) {
            liArr.push(<li key={i}>{`YOUR.........${key}     IS...............${userData[key]}`}</li>);
            i++;
        }
    }
    return <ol className="list-decimal text-left">{liArr}</ol>
};

const CardPage = () =>
{
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    return(<>
        <NavBar />
        {/* <PageTitle />
        <LoggedInName />
        <CardUI /> */}
        <div className="p-8 text-center">
            <h1 className="font-bold text-6xl">Get doxxed kid🤣🫵</h1>
            <DoxTable userData={userData} />
        </div>
    </>);
}

export default CardPage;
