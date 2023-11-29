/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React, { useState, useRef, useContext } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Image, StyleSheet, useWindowDimensions } from 'react-native';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { TabNavigator } from 'react-navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import  Modal  from 'react-native-modal';
import { CustomHamburgerIcon } from '../../components/HamburgerButton/CustomHamburgerIcon';
import Logo from '../../../../assets/images/logo.png';
import Background from '../../../../assets/images/background.png';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BillTable from '../../components/BillTable/BillTable';
import RepTable from '../../components/BillTable/RepTable';
import { UserContext } from '../../components/UserContext/UserContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';
import BillModal from '../../components/BillModal/BillModal';
import RepBillTable from '../../components/BillTable/RepBillTable';

function InterestsScreen() {
  const queryClient = new QueryClient();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* <BillModal /> */}
        <QueryClientProvider client={queryClient}>
          <BillTable />
        </QueryClientProvider>
      {/* <Text fontSize={20}>All Interests!</Text> */}
    </View>
  );
}

function RepresentativesScreen() {
  const queryClient = new QueryClient();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* <BillModal /> */ }
        <QueryClientProvider client={queryClient}>
          <RepBillTable/>
        </QueryClientProvider>
        <Text>Bills by representative</Text>
    </View>
  );
}

function MyRepresentativesScreen() {
  const queryClient = new QueryClient();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* <BillModal /> */}
        <QueryClientProvider client={queryClient}>
          <RepTable />
        </QueryClientProvider>
      {/* <Text fontSize={20}>All Interests!</Text> */}
    </View>
  );
}

const NavigationView = ({ onCloseDrawer, onLogOutPressed, onInterestsPressed }) => (
  <View style={styles.navigationContainer}>
    <TouchableOpacity style={styles.closeButton} onPress={onCloseDrawer}>
      {/* Icon for close button */}
      <Icon name="close" size={30} color="black" />
    </TouchableOpacity>
    <View style={styles.drawerButtons}>
      <TouchableOpacity style={styles.drawerButton} onPress={onInterestsPressed}>
        <Text>Change Interests</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.drawerButtons}>
      <TouchableOpacity style={styles.drawerButton} onPress={onLogOutPressed}>
        <Text>Log Out</Text>
      </TouchableOpacity>
    </View>

  </View>
);

const DashboardScreen = () => {
  // const { user } = useContext(UserContext);
  const navigation = useNavigation();
  const [isProfileModalVisible, setProfileModalVisible] = useState(false);
  const [isHamburgerModalVisible, setHamburgerModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");
  const [displayBillModal, setDisplayBillModal] = useState(false);
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
  // const [typeOfBill, setTypeOfBill] = useState('interests');

  const Tab = createBottomTabNavigator();

  const {height} = useWindowDimensions();

  // const toggleTypeOfBill = () => {
  //   setTypeOfBill(!typeOfBill);
  // }

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

  // const onProfilePressed = () => {
  //   navigation.navigate('Profile');
  //   console.warn("Going to profile");
  // };
  // const onInterestsPressed = () => {
  //   closeDrawer();
  //   setTimeout(() => {
  //   navigation.navigate('Interests');
  //   }, 300);
  //   console.warn("Going to interests page");
  // }

  // const onLogOutPressed = () => {
  //   closeDrawer();
  //   setTimeout(() => {
  //   setLogoutModalVisible(true);
  //   }, 300);
  // }
  // const onLogOutCancelPressed = () => {
  //   setLogoutModalVisible(false);
  // }
  // const onLogOutConfirmPressed = () => {
  //   Keychain.resetGenericPassword();
  //   navigation.navigate('SignIn');
  // }

  // const closeDrawer = () => {
  //   if (drawer.current) {
  //     drawer.current.closeDrawer();
  //   }
  // };

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
          <Tab.Screen name="Bills by Interest" component={InterestsScreen} />
          <Tab.Screen name="Bills by Representative" component={RepresentativesScreen} />
          <Tab.Screen name="My Representatives" component={MyRepresentativesScreen}/>
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
