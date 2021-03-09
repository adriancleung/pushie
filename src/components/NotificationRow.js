import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import ContextMenu from 'react-native-context-menu-view';
import {getLocalDateTime} from '@app/util';
import {CONTEXT_SHARE, CONTEXT_DELETE, CONTEXT_PREVIEW} from '@app/constants';

const NotificationRow = ({
  item,
  onPress,
  removeNotification,
  setNotificationItem,
  setModalVisible,
  onShare,
}) => (
  <TouchableOpacity onPress={onPress} onLongPress={onPress}>
    <View style={styles.notificationRow}>
      <ContextMenu
        previewBackgroundColor={'white'}
        actions={[
          {
            title: CONTEXT_SHARE,
            systemIcon: 'square.and.arrow.up',
            destructive: false,
          },
          {title: CONTEXT_DELETE, systemIcon: 'trash', destructive: true},
        ]}
        onPress={(event) => {
          const {name} = event.nativeEvent;
          if (name === CONTEXT_DELETE) {
            removeNotification();
          } else if (name === CONTEXT_PREVIEW) {
            setNotificationItem();
            setModalVisible();
          } else if (name === CONTEXT_SHARE) {
            onShare();
          }
        }}>
        <View style={styles.context}>
          <Text style={styles.notificationTitle}>{item.title}</Text>
          <Text style={styles.notificationShortDescription}>
            {item.shortDescription}
          </Text>
          <View style={styles.notificationFooter}>
            <Text style={styles.notificationTime}>
              {getLocalDateTime(item.timestamp)}
            </Text>
          </View>
        </View>
      </ContextMenu>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  notificationRow: {
    backgroundColor: 'white',
    borderRadius: 10,
    shadowRadius: 3,
    shadowColor: 'grey',
    shadowOffset: {height: 2, width: 0},
    shadowOpacity: 0.5,
    elevation: 8,
  },
  context: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingHorizontal: 7,
    borderRadius: 10,
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
