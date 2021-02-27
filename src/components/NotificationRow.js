import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {getLocalDateTime} from '@app/util';

const NotificationRow = ({title, shortDescription, timestamp, onPress}) => (
  <TouchableOpacity onPress={onPress} onLongPress={onPress}>
    <View style={styles.notificationRow}>
      <Text style={styles.notificationTitle}>{title}</Text>
      <Text style={styles.notificationShortDescription}>
        {shortDescription}
      </Text>
      <View style={styles.notificationFooter}>
        <Text style={styles.notificationTime}>
          {getLocalDateTime(timestamp)}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  notificationRow: {
    backgroundColor: 'white',
    paddingTop: 5,
    paddingBottom: 5,
    paddingHorizontal: 7,
    borderRadius: 10,
    shadowRadius: 3,
    shadowColor: 'grey',
    shadowOffset: {height: 2, width: 0},
    shadowOpacity: 0.5,
    elevation: 5,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  notificationShortDescription: {
    paddingBottom: 10,
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
