import React from 'react';
import {Text, StyleSheet, Platform, TextStyle} from 'react-native';

type Props = {
  style: TextStyle;
  children: React.ReactChild;
};

const Menlo: React.FC<Props> = ({style, children}) => {
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
