/* eslint-disable prettier/prettier */
import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Image, StyleSheet, useWindowDimensions } from 'react-native';
import { useNavigation, NavigationContainer, DrawerActions } from '@react-navigation/native';
import { TabNavigator } from 'react-navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import  Modal  from 'react-native-modal';
import { CustomHamburgerIcon } from '../../components/HamburgerButton/CustomHamburgerIcon';
import Background from '../../../../assets/images/background.png';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import pic from '../../../../assets/images/ProfileImage.png';
import { UserContext } from '../../components/UserContext/UserContext';

function InterestsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* Add API endpoint here*/}
      <Text fontSize={20}>All Interests!</Text>
    </View>
  );
};

function VotesScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* Add API endpoint here*/}
      <Text>Votes!</Text>
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
  const { user } = useContext(UserContext);

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

  const onProfilePressed = () => {
    navigation.navigate('Profile');
    console.warn("Going to profile");
  };
  const onInterestsPressed = () => {
    navigation.navigate('Interests');
    console.warn("Going to interests page");
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Image source={Background} style={[styles.background]} resizeMode="cover"/>

      {/* Header section */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16 }}>
        <TouchableOpacity onPress={onProfilePressed}>
          {/* <Image source={pic} resizeMode='contain'/> */}
          <View style={styles.userInfoContainer}>
            <View style={styles.imageContainer}>
              <Image source={pic} style={{ width: '100%', height: '100%' }} resizeMode='cover' />
            </View>
            <Text style={styles.user}>{user.firstName} {user.lastName}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.hamburgerMenu} onPress={handleHamburgerPress}>
          <View style={styles.hamburger}></View>
          <View style={styles.hamburger}></View>
          <View style={styles.hamburger}></View>
        </TouchableOpacity>
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
          <TouchableOpacity onPress={onInterestsPressed}>
            <Text>Change Interests</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleOptionSelect('Option 2')}>
            <Text>Option 2</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Feed Section */}
        <Tab.Navigator>
          <Tab.Screen name="Interests" component={InterestsScreen}/>
          <Tab.Screen name="Votes" component={VotesScreen}/>
          <Tab.Screen name="All Bills" component={AllBillsScreen}/>
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
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    width: 50, // Adjust size as needed
    height: 50, // Adjust size as needed
    borderRadius: 25, // Half of the width and height to create a circle
    backgroundColor: 'black',
    marginRight: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  user: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
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
    padding: 10,
  },
  hamburger: {
    width: 25,
    height: 3,
    backgroundColor: '#000',
    marginVertical: 3,
    borderRadius: 2,
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
