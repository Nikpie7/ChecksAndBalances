/* eslint-disable prettier/prettier */
import React, {react, useState, createContext, useRef, useContext } from 'react';
import { Text, View, ScrollView, StyleSheet, Image } from 'react-native';
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';

import dashboardService from '../../utils/dashboardService';
import interestsCategories from './interestsCategories.json';
import Background from '../../../../assets/images/background.png';

// TODO: Remove later
const ADDRESS = '4000 Central Florida Blvd. Orlando, FL 32816';
const USER_ID = {token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjZmNDYyYmZmNDQ1MzY4MjQzZWZjYSIsImZpcnN0TmFtZSI6IktvYmUiLCJsYXN0TmFtZSI6IkNvbm9tb24iLCJwYXNzd29yZCI6IkJhU0ViQWxsLiwvMjUxIiwiZW1haWwiOiJrY29ub21vbkBnbWFpbC5jb20iLCJhZGRyZXNzIjpudWxsLCJpYXQiOjE3MDEyNzY1NDUsImV4cCI6MTcwMTM2Mjk0NX0.RdiA1yGa76wme91GlTQEy_dgsXz2m7-jhkyZacf_SaI" };

const queryClient = new QueryClient();
const MyContext = createContext();

const CONGRESS_NUM = 118;

const BillTable = ({clickedBillData, setClickedBillData, handleOpenBillModal }) => {
    const {
        data: interests,
        isLoading,
        isError,
    } = useQuery(['interestsData', USER_ID], () =>
        dashboardService.getReadInterests(USER_ID)
    );

    if (isLoading) return <Text>Loading...</Text>;
    if (isError) return <Text>Error...</Text>;

    let userInterestsTemp = [];

    console.log('uh oh...for loop time :O');
    if (interests === undefined) {
      return (<View><Text>You have no interests</Text><Text>Go to the menu and add 
        interests to your profile</Text></View>);
    }
    for (let i = 0; i < interests.Interests.length; i++) {
        if (interests.Interests[i].value) {
            userInterestsTemp.push(interests.Interests[i].InterestName);
        }
    }

    return (
        <ScrollView>
          <MyContext.Provider value={{ clickedBillData, setClickedBillData, handleOpenBillModal }}>
            {/* LegistlationList */}
            <BillList userInterests={userInterestsTemp} />
          </MyContext.Provider>
        </ScrollView>
    );
};

const BillList = (props) => {
  // if (props === "interests") {
    const userInterests = props.userInterests;
    let billListTemp = [];

    // Get bills for user's interests.
    const {
      data: bills,
      isLoading,
      isError,
    } = useQuery(['billsData', interestsCategories], () =>
      Promise.all(
        userInterests.map(async (interest) =>
          dashboardService.postSearchBillsByInterest({ Interest: interest })
        )
      )
    );

    if (isLoading) return <Text>Loading...</Text>;
    if (isError) return <Text>Error...</Text>;

    for (let i = 0; i < bills.length; i++) {
      // Iterate through all bills for current interest.
      for (let j = 0; j < bills[i].response.length; j++) {
        billListTemp.push(bills[i].response[j]);
      }
    }

    // Sort all the bills by date.
    billListTemp.sort(
      (a, b) => new Date(a.LastUpdated) - new Date(b.LastUpdated)
    );

    // Reverse so it's in descending order.
    billListTemp.reverse();

    return (
        <View>
            {billListTemp.map((bill) => (
                <QueryClientProvider client={queryClient}>
                  <View />
                    <Bill key={bill._id} currBill={bill} />
                </QueryClientProvider>
            ))}
        </View>
    );
};

  const Bill = (props) => {
    const bill = props.currBill;
    const { setClickedBillData, handleOpenBillModal } = useContext(MyContext);

    const handleBillListClick = () => {
      setClickedBillData(bill);
      handleOpenBillModal();
    };

    return (
      <View style={ styles.billDiv }>
        <Text className="md:text-lg line-clamp-2 xl:line-clamp-1" style={ styles.titles }
          onClick={handleBillListClick}> {bill.Title}</Text>
      {/* <Text>{bill.BillType.toUpperCase()}.{bill.BillNumber}</Text> */}
      </View>
    );
  };

  const styles = StyleSheet.create({
    titles: {
      fontSize: 20,
      textAlign: 'center',
      fontFamily: 'headline',
      color: 'black',
    },
    billDiv: {
      backgroundColor: 'white',
      borderColor: 'black',
      borderWidth: 1,
      borderTopEndRadius: 15,
      borderBottomEndRadius: 15,
      borderTopLeftRadius: 15,
      borderBottomLeftRadius: 15,
      justifyContent: 'center',
      padding: 10,
      marginTop: 10,
      width: '97%',
    },
  });

  export default BillTable;
