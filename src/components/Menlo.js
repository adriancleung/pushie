import React from 'react';
import {Text, StyleSheet, Platform} from 'react-native';

const Menlo = ({style, children}) => {
  return <Text style={[styles.menloText, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  menloText: {
    ...Platform.select({
      ios: {
        fontFamily: 'Menlo',
      },
      android: {
        fontFamily: 'monospace',
      },
    }),
  },
});

export default Menlo;
