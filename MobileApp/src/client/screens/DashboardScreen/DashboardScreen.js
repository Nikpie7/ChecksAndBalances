/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Image, StyleSheet, useWindowDimensions } from 'react-native';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { TabNavigator } from 'react-navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import  Modal  from 'react-native-modal';
import { CustomHamburgerIcon } from '../../components/HamburgerButton/CustomHamburgerIcon';
import Logo from '../../../../assets/images/logo.png';
import Background from '../../../../assets/images/background.png';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import LegistlationTable from '../../components/LegislationTable/LegislationTable.js';

function InterestsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* <View>
        <LegistlationTable/>
      </View> */}
      <Text fontSize={20}>All Interests!</Text>
    </View>
  );
}

function RepresentativesScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* Add API endpoint here*/}
      <Text>Representatives!</Text>
    </View>
  );
}

function AllBillsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* Add API endpoint here*/}
      <Text>All Bills!</Text>
    </View>
  );
}

const DashboardScreen = () => {
  const navigation = useNavigation();
  const [isProfileModalVisible, setProfileModalVisible] = useState(false);
  const [isHamburgerModalVisible, setHamburgerModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");

  const congress = 118;
  const Tab = createBottomTabNavigator();

  const {height} = useWindowDimensions();

  const toggleProfileModal = () => {
    setProfileModalVisible(!isProfileModalVisible);
  };

  const handleHamburgerPress = () => {
    toggleHamburgerModal();
  };

  const handleProfilePress = () => {
    // Show the profile options modal
    toggleProfileModal();
  };

  const handleOptionSelect = (option) => {
    // Handle the selected option
    console.log('Selected option:', option);

    // Close the modal
    toggleProfileModal();
  };

  const handleSearch = () => {
    // TODO
    console.log('beans! Can\'t search quite yet but will be able to soon!');
  };

  const toggleHamburgerModal = () => {
    setHamburgerModalVisible(!isHamburgerModalVisible);
  };

  const handleTabChange = (tab) => {
    // Add logic to update the feed based on the selected tab
    console.log('Switch to tab:', tab);
  };

  const getBillTitles = () => {
    var bodyVariable = JSON.stringify({"congress": congress,"billType": billType, "billNumber": billNumber});
        
        console.log(bodyVariable);
        //Validate the user
        fetch('https://checksnbalances.us/api/getBillTitles', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: bodyVariable,
        })
        .then(response => response.json())
        .catch(error => {
          console.error(error);
          });
  };

  const getBillsByInterest = () => {
    // TODO replace "Finance" with interest variable
    var bodyVariable = JSON.stringify({'interest': 'Finance'});

    console.log(bodyVariable);

    fetch('https://checksnbalances.us/api/getBillTitles', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: bodyVariable,
    })
    .then(response => response.json())
    .catch(error => {
      console.error(error);
    });
  };

  const readInterests = () => {
    var bodyVariable = JSON.stringify({"userID": userID});

    console.log(bodyVariable);

    fetch('https://checksnbalances.us/api/getBillTitles', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: bodyVariable,
    })
    .then(response => response.json())
    .catch(error => {
      console.error(error);
    });
  };

  const getUserID = () => {

  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Image source={Background} style={[styles.background]} resizeMode="cover"/>

      {/* Header section */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16 }}>
        <Image source={Logo} style={[styles.logo, {height: height * 0.1}]} resizeMode="contain"/>
      </View>

      {/* Search bar */}
      <View>
        <TextInput placeholder="Search..." style={ styles.searchBar } /*Add onclick *//>
          <View source={ CustomHamburgerIcon }>
            { CustomHamburgerIcon }
          </View>
      </View>

      {/* Modal for hamburger menu options */}
      <Modal isVisible={isHamburgerModalVisible} onBackdropPress={toggleHamburgerModal}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => handleOptionSelect('Option 1')}>
            <Text>Option 1</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleOptionSelect('Option 2')}>
            <Text>Option 2</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Feed Section */}
        <Tab.Navigator>
          <Tab.Screen name="Interests" component={InterestsScreen}/>
          <Tab.Screen name="Representatives" component={RepresentativesScreen}/>
          <Tab.Screen name="TBD" component={AllBillsScreen}/>
        </Tab.Navigator>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root:{
      alignItems: 'left',
      padding: 10,
  },
  logo: {
      width: '75%',
      maxWidth: 300,
      maxHeight: 50,
  },
  text: {
      fontSize: 32,
  },
  titleText: {
      fontSize: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'Center',
  },
  background:{
    position: 'absolute',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  billBackground:{
    backgroundColor: 'white',
    padding: 20,
  },
  hamburgerMenu: {
    position: 'absolute',
    top: 50,
    right: 50,
    width: 70,
    height: 15,
    backgroundColor: 'black',
    borderRadius: 30,
  },
  hamburger: {
    width: 5,
    height: 5,
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  tabBar: {
    flex: 0,
    backgroundColor: '#fff',
    height: 20,
    flexDirection: 'column',
  },
  searchBar: {
    flex: 0,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: '85%',
    backgroundColor: 'white',
  },
});

export default DashboardScreen;




// Implement profile functionality
// First/last name API call
// Implement hamburger bar functionality
    // implement hamburger option 1 functionality
    // implement hamburger option 2 functionality
    // implement hamburger option 3 functionality
// Search bar functionality

// Interests tab styling
// interests tab functionality
    // Scroll, fetch and implement data

// New tab styling
// New tab functionality
    // Scroll, fetch and implement data

// All bills tab styling
// All bills tab functionality
    // Scroll, fetch and implement data

// Scrollbar styling
