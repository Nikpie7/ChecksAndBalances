import React, { useState, useEffect } from 'react';
import { View, TextInput, Animated, StyleSheet } from 'react-native';

const FloatingLabelInput = ({ label, value, onChangeText, secureTextEntry, style }) => {
  const [isFocused, setIsFocused] = useState(false);
  const animatedIsFocused = new Animated.Value(value === '' ? 0 : 1);

  useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: isFocused || value !== '' ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [animatedIsFocused, isFocused, value]);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const labelStyle = {
    position: 'absolute',
    left: 5, // Adjust this value based on your styling requirements
    top: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [isFocused || value !== '' ? 0 : 16, -10], // Update the initial position
    }),
    fontSize: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [isFocused || value !== '' ? 16 : 16, 14], // Adjust the initial font size
    }),
    color: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: ['#666', '#000'],
    }),
  };

  return (
    <View style={{ paddingTop: 7 }}>
      <Animated.Text style={labelStyle}>{label}</Animated.Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        secureTextEntry={secureTextEntry}
        style={[styles.input, style]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 2,
    borderColor: '#ccc',
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 20,
  },
});

export default FloatingLabelInput;
