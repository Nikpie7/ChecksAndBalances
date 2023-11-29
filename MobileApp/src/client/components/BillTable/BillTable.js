/* eslint-disable prettier/prettier */
import React, {react, useState} from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';

import dashboardService from '../../utils/dashboardService';
import interestsCategories from './interestsCategories.json';
import representativesList from './representativesList.json';

// TODO: Remove later
const ADDRESS = '4000 Central Florida Blvd. Orlando, FL 32816';
const USER_ID = {token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjZmNDYyYmZmNDQ1MzY4MjQzZWZjYSIsImZpcnN0TmFtZSI6IktvYmUiLCJsYXN0TmFtZSI6IkNvbm9tb24iLCJwYXNzd29yZCI6IkJhU0ViQWxsLiwvMjUxIiwiZW1haWwiOiJrY29ub21vbkBnbWFpbC5jb20iLCJhZGRyZXNzIjpudWxsLCJpYXQiOjE3MDEyNDY5ODEsImV4cCI6MTcwMTI1MDU4MX0._Ln_vu4JTPaa7zW7rSZF-a9ivkgWCpQ4S670flz6X74" };

const queryClient = new QueryClient();

const CONGRESS_NUM = 118;

const BillTable = () => {
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
            <BillList userInterests={userInterestsTemp} />
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

    return (
      <View>
        <Text style={ styles.titles }> {bill.Title}</Text>
        <Text>{bill.BillType.toUpperCase()}.{bill.BillNumber}</Text>
      </View>
    );
  };

  const styles = StyleSheet.create({
    titles: {
      fontSize: 20,
    },
  });

  export default BillTable;
