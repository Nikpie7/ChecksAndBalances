/* eslint-disable prettier/prettier */
import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';

const CustomHamburgerIcon = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.line}/>
        <View style={styles.line}/>
        <View style={styles.line}/>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 30,
    height: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  line: {
    width: '100%',
    height: 4,
    backgroundColor: 'black',
    borderRadius: 2,
  },
});

export default CustomHamburgerIcon;