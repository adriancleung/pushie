import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const NotificationRow = ({title, shortDescription, timestamp}) => (
  <View style={styles.notificationRow}>
    <Text style={styles.notificationTitle}>{title}</Text>
    <Text style={styles.notificationShortDescription}>{shortDescription}</Text>
    <View style={styles.notificationFooter}>
      <Text style={styles.notificationTime}>{timestamp}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  notificationRow: {
    paddingTop: 15,
    paddingBottom: 5,
    paddingHorizontal: 20,
    borderBottomWidth: 0.3,
    borderBottomColor: 'grey',
  },
  notificationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  notificationFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  notificationTime: {
    color: 'grey',
    fontSize: 12,
  },
});

export default NotificationRow;
