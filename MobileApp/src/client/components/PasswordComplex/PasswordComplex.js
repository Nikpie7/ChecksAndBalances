import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

const PasswordComplex = ({ password }) => {
  const hasLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
  return (
    <View style={styles.container}>
        <View style={styles.indicators}>
          <View style={[styles.indicator, { backgroundColor: hasLength ? 'green' : 'red' }]}>
            <Text style={styles.indicatorText}>{' > 8'}</Text>
          </View>
          <View style={[styles.indicator, { backgroundColor: hasUppercase ? 'green' : 'red' }]}>
            <Text style={styles.indicatorText}>{'Uppercase'}</Text>
          </View>
          <View style={[styles.indicator, { backgroundColor: hasLowercase ? 'green' : 'red' }]}>
            <Text style={styles.indicatorText}>{'Lowercase'}</Text>
          </View>
          <View style={[styles.indicator, { backgroundColor: hasSpecialChar ? 'green' : 'red' }]}>
            <Text style={styles.indicatorText}>{'Special'}</Text>
          </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  indicators: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  indicator: {
    width: 72,
    height: 25,
    borderRadius: 12,
    marginHorizontal: 3.25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorText: {
    fontSize: 13,
    color: 'white',
    textAlign: 'center',
  },
});

export default PasswordComplex;
