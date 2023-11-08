// Display profile icon, implement profile functionality
// Display first/last name
// Display hamburger bar, implement functionality
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


import React, { useState } from "react";
import { ScrollView, View, Text, StatusBar, SafeAreaView, StyleSheet} from "react-native";
import { useNavigation } from '@react-navigation/native';

const DashboardScreen = () => {
  const [items, setItems] = useState([
    {
      title: "Item 1",
      content: "This is the content of item 1.",
      key: "item1",
    },
    {
      title: "Item 2",
      content: "This is the content of item 2.",
      key: "item2",
    },
    {
      title: "Item 3",
      content: "This is the content of item 3.",
      key: "item3",
    },
    {
        title: "Item 4",
        content: "This is the content of item 4.",
        key: "item4",
    },
    {
        title: "Item 5",
        content: "This is the content of item 5.",
        key: "item5",
    },
    {
        title: "Item 6",
        content: "This is the content of item 6.",
        key: "item6",
    },
    {
        title: "Item 7",
        content: "This is the content of item 7.",
        key: "item7",
    },
    {
        title: "Item 8",
        content: "This is the content of item 8.",
        key: "item8",
    },
    {
        title: "Item 9",
        content: "This is the content of item 9.",
        key: "item9",
    },
  ]);

  // scrollEnabled={true} onScroll={(event) => setScrollY(event.nativeEvent.contentOffset.y)}
  return (
    <SafeAreaView style={styles.container}>
        <ScrollView style={styles.ScrollView}>
        {items.map((item) => (
            <View key={item.id}>
            <Text style={styles.textTitle}>{item.title}</Text>
            <Text style={styles.text}>{item.content}</Text>
            </View>
        ))}
        </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
    },
    scrollView: {
      backgroundColor: 'pink',
      marginHorizontal: 20,
    },
    textTitle: {
      fontSize: 50,
    },
    text: {
      fontSize: 30,
    },
  });

export default DashboardScreen;