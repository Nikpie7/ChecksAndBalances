/* eslint-disable prettier/prettier */
import React, {react, useState} from 'react';
import { Text, View, ScrollView, StyleSheet, Image } from 'react-native';
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';

import dashboardService from '../../utils/dashboardService';
import Background from '../../../../assets/images/background.png';
import interestsCategories from './interestsCategories.json';
import representativesList from './representativesList.json';
// TODO import user's representatives

// TODO: Remove later
const ADDRESS = '4000 Central Florida Blvd. Orlando, FL 32816';
const USER_ID = {token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjY4Mjk1OWFmZGY5ODc5NDljY2NmZSIsImZpcnN0TmFtZSI6IlRlc3QyIiwibGFzdE5hbWUiOiJUZXN0MiIsInBhc3N3b3JkIjoiIVRlc3QxMjMiLCJlbWFpbCI6IlRlc3RlcjJAdGVzdC5jb20iLCJhZGRyZXNzIjoiNDAwMCBDZW50cmFsIEZsb3JpZGEgQmx2ZC4gT3JsYW5kbywgRkwgMzI4MTYiLCJpYXQiOjE3MDEyNjc4ODcsImV4cCI6MTcwMTM1NDI4N30.hvcPFCg3ngKatAyvx89TjeXmA_oUCt_tSM2LOGbODxU" };

const queryClient = new QueryClient();

const RepTable = () => {
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
            <Text>Unable to load your representative</Text>
        );
    }

    return (
        <ScrollView>
            <PoliticianName politician={reps.Senator1} title="Senator"/>
            <PoliticianName politician={reps.Senator2} title="Senator"/>
            <PoliticianName politician={reps.Representative} title="Representative"/>
        </ScrollView>
    );
};

const PoliticianName = (props) => {
    const politician = props.politician;
    const title = props.title;

    return (
        <View style={styles.view}>
            <Text style={styles.seat}>{title}:</Text>
            <Text style={styles.seat}>{politician}</Text>
        </View>
    );

  };

const styles = StyleSheet.create({
    seat: {
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'headline',
        color: 'black',
    },
    politician: {
        fontSize: 20,
        textAlign: 'right',
        fontFamily: 'headline',
        color: 'black',
        margin: 10,
    },
    view: {
      backgroundColor: 'white',
      borderColor: 'black',
      borderWidth: 1,
      borderTopEndRadius: 15,
      borderBottomEndRadius: 15,
      borderTopLeftRadius: 15,
      borderBottomLeftRadius: 15,
      justifyContent: 'center',
      padding: 10,
      paddingLeft: '20%',
      paddingRight: '20%',
      marginTop: 10,
      width: '97%',
    },
});

  export default RepTable;
