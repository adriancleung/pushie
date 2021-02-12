import React from 'react';
import {Text, StyleSheet} from 'react-native';

const Menlo = ({style, children}) => {
  return <Text style={[styles.menloText, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  menloText: {
    fontFamily: 'Menlo',
  },
});

export default Menlo;
