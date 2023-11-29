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
const USER_ID = {token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjZmNDYyYmZmNDQ1MzY4MjQzZWZjYSIsImZpcnN0TmFtZSI6IktvYmUiLCJsYXN0TmFtZSI6IkNvbm9tb24iLCJwYXNzd29yZCI6IkJhU0ViQWxsLiwvMjUxIiwiZW1haWwiOiJrY29ub21vbkBnbWFpbC5jb20iLCJhZGRyZXNzIjpudWxsLCJpYXQiOjE3MDEyNDY5ODEsImV4cCI6MTcwMTI1MDU4MX0._Ln_vu4JTPaa7zW7rSZF-a9ivkgWCpQ4S670flz6X74" };

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
