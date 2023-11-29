/* eslint-disable prettier/prettier */
import React, {react, useState} from 'react';
import { Text, View, ScrollView } from 'react-native';
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';

import dashboardService from '../../utils/dashboardService';
import interestsCategories from './interestsCategories.json';
import representativesList from './representativesList.json';

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
                  <View style={{}}/>
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
        <Text>{bill.Title}</Text>
        <Text>{bill.BillType.toUpperCase()}.{bill.BillNumber}</Text>
      </View>
    );
  };

  export default BillTable;
