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
