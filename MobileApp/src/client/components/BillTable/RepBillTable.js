/* eslint-disable prettier/prettier */
import React, {react, useState} from 'react';
import { Text, View, ScrollView } from 'react-native';
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';

import dashboardService from '../../utils/dashboardService';
import interestsCategories from './interestsCategories.json';
import representativesList from './representativesList.json';
// TODO import user's representatives

// TODO: Remove later
const USER_ID = {token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjY4Mjk1OWFmZGY5ODc5NDljY2NmZSIsImZpcnN0TmFtZSI6IlRlc3QyIiwibGFzdE5hbWUiOiJUZXN0MiIsInBhc3N3b3JkIjoiIVRlc3QxMjMiLCJlbWFpbCI6IlRlc3RlcjJAdGVzdC5jb20iLCJhZGRyZXNzIjoiNDAwMCBDZW50cmFsIEZsb3JpZGEgQmx2ZC4gT3JsYW5kbywgRkwgMzI4MTYiLCJpYXQiOjE3MDEyMzQwOTAsImV4cCI6MTcwMTIzNzY5MH0.f9KhxiTteu_LkMh3uQQ_4-ktZyMm0KU8sRjBunAy59c" };
const ADDRESS = '4000 Central Florida Blvd. Orlando, FL 32816';

const queryClient = new QueryClient();

const CONGRESS_NUM = 118;

// const BillTableReps = () => {
//   const {
//     data: reps,
//     isLoading,
//     isError,
//   } = useQuery(["repsData", USER_ID], () =>
//       dashboardService.postGetReps(ADDRESS)
//   );

// if (isLoading) return <Text>Loading...</Text>;
// if (isError) return <Text>Error...</Text>;

// let userRepsTemp = [];

// for (let i = 0; i < reps.Interests.length; i++) {
//     if (reps.Interests[i].value) {
//         userInterestsTemp.push(reps.Interests[i].InterestName);
//     }
// }

// return (
//     <ScrollView>
//         <BillList userReps={userRepsTemp} />
//     </ScrollView>
// );
// }

// get user's reps data
// populate bill format
// populate billList
// format billTable
// import RepBillTable in dashboardScreen.js

const RepBillTable = () => {
    const {
        data: reps,
        isLoading,
        isError,
    } = useQuery(['repsData', USER_ID], () =>
        dashboardService.postGetReps(USER_ID)
    );

    if (isLoading) return <Text>Loading...</Text>;
    if (isError) return <Text>Error...</Text>;

    console.log('getting user\'s reps');
    // TODO: Fix this loop

    return (
        <ScrollView>
            <RepBillList userReps={reps} />
        </ScrollView>
    );
};

const RepBillList = (props) => {
  // if (props === "interests") {
    const userReps = props.userReps;
    let billListTemp = [];

    // Get bills for user's reps.
    const {
      data: bills,
      isLoading,
      isError,
    } = useQuery(['billsData', userReps], () =>
      Promise.all(
        userReps.map(async (rep) =>
          dashboardService.postSearchBillsSponsors({ member: rep })
        )
      )
    );

    if (isLoading) return <Text>Loading...</Text>;
    if (isError) return <Text>Error...</Text>;

    console.log('grabbing all user rep sponsored bills :D');
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
                  <View style={{}}/>
                    <RepBill key={bill._id} currBill={bill} />
                </QueryClientProvider>
            ))}
        </View>
    );
};

  const RepBill = (props) => {
    const bill = props.currBill;

    return (
      <View>
        <Text>{bill.Title}</Text>
        <Text>{bill.BillType.toUpperCase()}.{bill.BillNumber}</Text>
      </View>
    );
  };

  export default RepBillTable;
