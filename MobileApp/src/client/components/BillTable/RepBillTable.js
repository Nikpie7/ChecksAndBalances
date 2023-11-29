/* eslint-disable prettier/prettier */
import React, {react, useState, createContext, useRef, useContext} from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';

import dashboardService from '../../utils/dashboardService';
import interestsCategories from './interestsCategories.json';
import representativesList from './representativesList.json';
// TODO import user's representatives

// TODO: Remove later
const ADDRESS = '4000 Central Florida Blvd. Orlando, FL 32816';
const USER_ID = {token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjY4Mjk1OWFmZGY5ODc5NDljY2NmZSIsImZpcnN0TmFtZSI6IlRlc3QyIiwibGFzdE5hbWUiOiJUZXN0MiIsInBhc3N3b3JkIjoiIVRlc3QxMjMiLCJlbWFpbCI6IlRlc3RlcjJAdGVzdC5jb20iLCJhZGRyZXNzIjoiNDAwMCBDZW50cmFsIEZsb3JpZGEgQmx2ZC4gT3JsYW5kbywgRkwgMzI4MTYiLCJpYXQiOjE3MDEyNzYxNzQsImV4cCI6MTcwMTM2MjU3NH0.VXDPrxC2B5Rr6dM4j28Ying9hap75Cas0vehI629w84" };

const queryClient = new QueryClient();
const MyContext = createContext();

const CONGRESS_NUM = 118;

const RepBillTable = ({clickedBillData, setClickedBillData, handleOpenBillModal }) => {
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
          <MyContext.Provider value={{ clickedBillData, setClickedBillData, handleOpenBillModal }}>
            <RepBillList politicians={userPoliticians} />
          </MyContext.Provider>
        </ScrollView>
    );
};

const RepBillList = (props) => {
    const politicians = props.politicians;
    let billListTemp = [];

    // Get bills for user's reps.
    const {
      data: bills,
      isLoading,
      isError,
    } = useQuery(['billsData', interestsCategories], () =>
      Promise.all(
        politicians.map(async (politician) =>
          dashboardService.postSearchBillsSponsors({ member: politician })
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

    let billObjects = billListTemp.map(JSON.stringify);
    let billSet = new Set(billObjects);
    let billList = Array.from(billSet).map(JSON.parse);

    return (
        <View>
            {billList.map((bill) => (
                <QueryClientProvider client={queryClient}>
                  <View/>
                    <RepBill key={bill._id} currBill={bill} />
                </QueryClientProvider>
            ))}
        </View>
    );
};

  const RepBill = (props) => {
    const bill = props.currBill;
    const { setClickedBillData, handleOpenBillModal } = useContext(MyContext);

    const handleBillListClick = () => {
      setClickedBillData(bill);
      handleOpenBillModal();
    };


    return (
      <View style={styles.billDiv}>
        <Text className="md:text-lg line-clamp-2 xl:line-clamp-1" style={ styles.titles }
          onClick={handleBillListClick}> {bill.Title}</Text>
        <Text>{bill.BillType.toUpperCase()}.{bill.BillNumber}</Text>
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

  export default RepBillTable;
