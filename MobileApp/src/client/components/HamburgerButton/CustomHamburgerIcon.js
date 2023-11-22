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
    flex: 0,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 50,
    right: 50,
  },
  line: {
    width: '100%',
    height: 4,
    backgroundColor: 'black',
    borderRadius: 2,
  },
});

export default CustomHamburgerIcon;