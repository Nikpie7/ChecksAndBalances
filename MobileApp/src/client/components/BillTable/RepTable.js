/* eslint-disable prettier/prettier */
import React, {react, useState} from 'react';
import { Text, View, ScrollView } from 'react-native';
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';

import dashboardService from '../../utils/dashboardService';
import interestsCategories from './interestsCategories.json';
import representativesList from './representativesList.json';
// TODO import user's representatives

// TODO: Remove later
const USER_ID = {token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjY4Mjk1OWFmZGY5ODc5NDljY2NmZSIsImZpcnN0TmFtZSI6IlRlc3QyIiwibGFzdE5hbWUiOiJUZXN0MiIsInBhc3N3b3JkIjoiIVRlc3QxMjMiLCJlbWFpbCI6IlRlc3RlcjJAdGVzdC5jb20iLCJhZGRyZXNzIjoiNDAwMCBDZW50cmFsIEZsb3JpZGEgQmx2ZC4gT3JsYW5kbywgRkwgMzI4MTYiLCJpYXQiOjE3MDEyMzg1NTQsImV4cCI6MTcwMTI0MjE1NH0.O-EIuX7VJwNM_qvYFAC0SK1t884CRhW-NDKInkDphrg" };
const ADDRESS = '4000 Central Florida Blvd. Orlando, FL 32816';

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
            <Text>Unable to load your representative's bills</Text>
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
      <View>
        <Text>{title}:</Text>
        <Text className="indent-4">{politician}</Text>
      </View>
    );

  };

  export default RepTable;
