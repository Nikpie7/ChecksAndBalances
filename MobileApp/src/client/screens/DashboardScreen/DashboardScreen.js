/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import  Modal  from 'react-native-modal';
import { CustomHamburgerIcon } from '../../components/HamburgerButton/CustomHamburgerIcon';

const DashboardScreen = () => {
  const navigation = useNavigation();
  const [isProfileModalVisible, setProfileModalVisible] = useState(false);
  const [isHamburgerModalVisible, setHamburgerModalVisible] = useState(false);

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

  // ... rest of the code ...

  return (
    <View style={{ flex: 1 }}>
      {/* SafeAreaView to handle notches and other safe area insets */}
      <SafeAreaView style={{ flex: 1 }}>
        {/* Header section */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16 }}>
          {/**/}
          <TouchableOpacity onPress={handleProfilePress}>
            {<Image source={require('../../components/ProfileImage/ProfileImage.png')} style={{ width: 30, height: 30 }} />}
          </TouchableOpacity>

          <Text style= {{fontWeight: 500, flex: 1, fontSize: 20}}>
            Hello, *insert user*
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

        {/* ... rest of the code ... */}
      </SafeAreaView>
    </View>
  );
};

export default DashboardScreen;




// Display profile icon, implement profile functionality
// Display first/last name
// Implement hamburger bar functionality
    // implement hamburger option 1 functionality
    // implement hamburger option 2 functionality
    // implement hamburger option 3 functionality
// Search bar display
// Search bar functionality

// Interests tab display
// interests tab functionality
    // Scroll, fetch and implement data

// New tab display
// New tab functionality
    // Scroll, fetch and implement data

// All bills tab display
// All bills tab functionality
    // Scroll, fetch and implement data

// Scrollbar functionality


// import React, { useState } from "react";
// import { ScrollView, View, Text, StatusBar, SafeAreaView, StyleSheet, RCTImageView} from "react-native";
// import { useNavigation } from '@react-navigation/native';
// // import ProfileImage from '../../components/ProfileImage/ProfileImage.png';

// const ProfileImage = require('../../components/ProfileImage/ProfileImage.png').default;
// JSON.stringify(ProfileImage);

// const DashboardScreen = () => {
//   const [items, setItems] = useState([
//     {
//       title: "Item 1",
//       content: "This is the content of item 1.",
//       key: "item1",
//     },
//     {
//       title: "Item 2",
//       content: "This is the content of item 2.",
//       key: "item2",
//     },
//     {
//       title: "Item 3",
//       content: "This is the content of item 3.",
//       key: "item3",
//     },
//     {
//         title: "Item 4",
//         content: "This is the content of item 4.",
//         key: "item4",
//     },
//     {
//         title: "Item 5",
//         content: "This is the content of item 5.",
//         key: "item5",
//     },
//     {
//         title: "Item 6",
//         content: "This is the content of item 6.",
//         key: "item6",
//     },
//     {
//         title: "Item 7",
//         content: "This is the content of item 7.",
//         key: "item7",
//     },
//     {
//         title: "Item 8",
//         content: "This is the content of item 8.",
//         key: "item8",
//     },
//     {
//         title: "Item 9",
//         content: "This is the content of item 9.",
//         key: "item9",
//     },
//   ]);

//   // const [scrollY, setScrollY] = useState(0);

//   // scrollEnabled={true} onScroll={(event) => setScrollY(event.nativeEvent.contentOffset.y)}
//   return (
//     <SafeAreaView style={styles.container} scrollEnabled={true} onScroll={(event) => setScrollY(event.nativeEvent.contentOffset.y)}>
//       <RCTImageView 
//         style={styles.imageView}
//         source={{ uri: ProfileImage}}
//       />
//       <ScrollView style={styles.ScrollView}>
//         {items.map((item) => (
//           <View key={item.id}>
//             <Text style={styles.textTitle}>{item.title}</Text>
//             <Text style={styles.text}>{item.content}</Text>
//           </View>
//         ))}
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       paddingTop: StatusBar.currentHeight,
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//     scrollView: {
//       backgroundColor: 'pink',
//       marginHorizontal: 20,
//     },
//     textTitle: {
//       fontSize: 50,
//     },
//     text: {
//       fontSize: 30,
//     },
//     imageView: {
//       width: 100,
//       height: 100,
//     },
//   });

// export default DashboardScreen;
