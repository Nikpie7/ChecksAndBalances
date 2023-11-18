/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Image, StyleSheet, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import  Modal  from 'react-native-modal';
import { CustomHamburgerIcon } from '../../components/HamburgerButton/CustomHamburgerIcon';
import Logo from '../../../../assets/images/logo.png';

const DashboardScreen = () => {
  const navigation = useNavigation();
  const [isProfileModalVisible, setProfileModalVisible] = useState(false);
  const [isHamburgerModalVisible, setHamburgerModalVisible] = useState(false);

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

  // ... rest of the code ...

  return (
    <View style={{ flex: 1 }}>
      {/* SafeAreaView to handle notches and other safe area insets */}
      <SafeAreaView style={{ flex: 1 }}>
        {/* Header section */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16 }}>
          {/**/}

          <Image source={Logo} style={[styles.logo, {height: height * 0.3}]} resizeMode="contain"/>

          <TouchableOpacity onPress={handleProfilePress}>
            {<Image source={require('../../components/ProfileImage/ProfileImage.png')} style={{ width: 30, height: 30 }} />}
          </TouchableOpacity>

          <Text style= {{fontWeight: 500, flex: 1, fontSize: 16}}>
            Hello, *insert user later*
          </Text>

          <TextInput
            placeholder="Search..."
            style={{ flex: 1, height: 30, borderColor: 'gray', borderWidth: 2, borderRadius: 8, paddingHorizontal: 8 }}
          />

          {/* Hamburger Menu */}
          <TouchableOpacity onPress={handleHamburgerPress}>
            {<Text source={ CustomHamburgerIcon } style={{ flex: 1, height: 30, borderColor: 'gray', borderWidth: 2, borderRadius: 8, paddingHorizontal: 8 }}/>}
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
          {/* Add your feed items based on the selected tab and user settings */}
          <Text>Feed items go here and here Feed items go here and here Feed items go here and here Feed items go here and here
          Feed items go here and here Feed items go here and here Feed items go here and here Feed items go here and here
          Feed items go here and here Feed items go here and here Feed items go here and here Feed items go here and here
          Feed items go here and here Feed items go here and here Feed items go here and here Feed items go here and here
          Feed items go here and here Feed items go here and here Feed items go here and here Feed items go here and here
          Feed items go here and here Feed items go here and here Feed items go here and here Feed items go here and here
          Feed items go here and here Feed items go here and here Feed items go here and here Feed items go here and here
          Feed items go here and here Feed items go here and here Feed items go here and here Feed items go here and here
          Feed items go here and here Feed items go here and here Feed items go here and here Feed items go here and here
          Feed items go here and here Feed items go here and here Feed items go here and here Feed items go here and here
          Feed items go here and here Feed items go here and here Feed items go here and here Feed items go here and here
          Feed items go here and here Feed items go here and here Feed items go here and here Feed items go here and here
          Feed items go here and here Feed items go here and here Feed items go here and here Feed items go here and here
          Feed items go here and here Feed items go here and here Feed items go here and here Feed items go here and here
          Feed items go here and here Feed items go here and here Feed items go here and here Feed items go here and here
          Feed items go here and here Feed items go here and here Feed items go here and here Feed items go here and here
          Feed items go here and here Feed items go here and here Feed items go here and here Feed items go here and here
          Feed items go here and here Feed items go here and here Feed items go here and here Feed items go here and here
          Feed items go here and here Feed items go here and here Feed items go here and here Feed items go here and here
          Feed items go here and here Feed items go here and here Feed items go here and here Feed items go here and here
          Feed items go here and here Feed items go here and here Feed items go here and here Feed items go here and here
          Feed items go here and here Feed items go here and here Feed items go here and here Feed items go here and here
          Feed items go here and here Feed items go here and here Feed items go here and here Feed items go here and here
          Feed items go here and here Feed items go here and here Feed items go here and here Feed items go here and here
          Feed items go here and here Feed items go here and here Feed items go here and here Feed items go here and here
          Feed items go here and here Feed items go here and here Feed items go here and here Feed items go here and here
          </Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  root:{
      alignItems: 'center',
      padding: 20,
  },
  logo: {
      width: '70%',
      maxWidth: 300,
      maxHeight: 200,
  },
  text: {
      fontSize: 32,
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
