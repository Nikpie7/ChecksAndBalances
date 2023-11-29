/* eslint-disable prettier/prettier */
import React, {react, useState} from 'react';
import { Text, View, ScrollView } from 'react-native';
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';

import dashboardService from '../../utils/dashboardService';
import interestsCategories from './interestsCategories.json';
import representativesList from './representativesList.json';
// TODO import user's representatives

// TODO: Remove later
const ADDRESS = '4000 Central Florida Blvd. Orlando, FL 32816';

const queryClient = new QueryClient();

const CONGRESS_NUM = 118;

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

    if (reps === undefined) {
        return (
            <Text>Unable to load your representative's bills</Text>
        );
    }
    console.log('getting user\'s reps');

    const userPoliticians = [];

    const removeMiddleName = (policician) => {
        let strTokens = policician.split(' ');

        return strTokens[0] + ' ' + strTokens[strTokens.length - 1];
    };

    userPoliticians.push(removeMiddleName(reps.Senator1));
    userPoliticians.push(removeMiddleName(reps.Senator2));
    userPoliticians.push(removeMiddleName(reps.Representative));

    return (
        <ScrollView>
            <RepBillList politicians={userPoliticians} />
        </ScrollView>
    );
};

const RepBillList = (props) => {
    const userReps = props.userReps;
    let billListTemp = [];

    // Get bills for user's reps.
    const {
      data: bills,
      isLoading,
      isError,
    } = useQuery(['repsData', userReps], () =>
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
