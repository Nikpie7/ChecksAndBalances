/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Image, StyleSheet, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import  Modal  from 'react-native-modal';
import { CustomHamburgerIcon } from '../../components/HamburgerButton/CustomHamburgerIcon';
import Logo from '../../../../assets/images/logo.png';
import Background from '../../../../assets/images/background.png';

const DashboardScreen = () => {
  const navigation = useNavigation();
  const [isProfileModalVisible, setProfileModalVisible] = useState(false);
  const [isHamburgerModalVisible, setHamburgerModalVisible] = useState(false);

  const congress = 118;

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

  }

  return (
    <View style={styles.flex}>
      <Image source={Background} style={[styles.background]} resizeMode="cover"/>
      <SafeAreaView style={{ flex: 1 }}>
        {/* Header section */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16 }}>
          {/**/}

          <Image source={Logo} style={[styles.logo, {height: height * 0.1}]} resizeMode="contain"/>

          {/* <TouchableOpacity onPress={handleProfilePress}>
            {<Image source={require('../../components/ProfileImage/ProfileImage.png')} style={{ width: 30, height: 30, padding: 20 }} />}
          </TouchableOpacity> */}

          {/* <Text style= {{fontWeight: 500, flex: 1, fontSize: 16}}>
            Hello, *insert user later*
          </Text> */}
        </View>
        <View>
          <TextInput
            placeholder="Search..."
            style={{ flex: 0, height: 35, borderColor: 'gray', borderWidth: 2, borderRadius: 8, paddingHorizontal: 8, width: '85%', backgroundColor: 'white'}}
          />

          {/* Hamburger Menu */}
          <TouchableOpacity onPress={handleHamburgerPress}>
            {<Text source={ CustomHamburgerIcon } style={{ flex: 0, height: 40, borderColor: 'gray', borderWidth: 2, borderRadius: 8, paddingHorizontal: 8 }}/>}
          </TouchableOpacity>
        </View>
        

        {/* Modal for Profile Options */}
        <Modal isVisible={isProfileModalVisible} onBackdropPress={toggleProfileModal}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => handleOptionSelect('Option 1')}>
              <Text>Option 1</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleOptionSelect('Option 2')}>
              <Text>Option 2</Text>
            </TouchableOpacity>
          </View>
        </Modal>

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

        {/* Tab Bar */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#eee', paddingVertical: 8 }}>
          {/* Tabs */}
          <TouchableOpacity onPress={() => handleTabChange('Interests')}>
            <Text>Interests</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleTabChange('Votes')}>
            <Text>Votes</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleTabChange('All Bills')}>
            <Text>All Bills</Text>
          </TouchableOpacity>
        </View>

        {/* Feed Section */}
        <ScrollView style={{ flex: 1, paddingHorizontal: 16 }}>
          <View key="legislationList-row" style={styles.billBackground}>
              <Text style={styles.titleText}>{getBillTitles}</Text>
              <Text>House Judiciary Committee</Text>
          </View>
          <Text> {'\n'} </Text>
          <View key="legislationList-row" style={styles.billBackground} >
              <Text style={styles.titleText}>Bill 2</Text>
              <Text>House Judiciary Committee</Text>
          </View>
          <Text> {'\n'} </Text>
          <View key="legislationList-row" style={styles.billBackground}>
              <Text style={styles.titleText}>Bill 3</Text>
              <Text>House Judiciary Committee</Text>
          </View>
          <Text> {'\n'} </Text>
          <View key="legislationList-row" style={styles.billBackground}>
              <Text style={styles.titleText}>Bill 4</Text>
              <Text>House Judiciary Committee</Text>
          </View>
          <Text> {'\n'} </Text>
          <View key="legislationList-row" style={styles.billBackground}>
              <Text style={styles.titleText}>Bill 5</Text>
              <Text>House Judiciary Committee</Text>
          </View>
          <Text> {'\n'} </Text>
          <View key="legislationList-row" style={styles.billBackground}>
              <Text style={styles.titleText}>Bill 6</Text>
              <Text>House Judiciary Committee</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
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
  flex: {
      flex: 1,
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
