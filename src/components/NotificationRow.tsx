import React from 'react';
import {View, Text, StyleSheet, TouchableNativeFeedback} from 'react-native';
import ContextMenu from 'react-native-context-menu-view';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import DeleteSwipeable from './DeleteSwipeable';
import {prettyPrintTime} from '../util';
import {CONTEXT_SHARE, CONTEXT_DELETE, CONTEXT_PREVIEW} from '../constants';
import {Notification} from '../types/notification';

type Props = {
  notification: Notification;
  onPress: () => void;
  removeNotification: () => void;
  setNotificationItem: () => void;
  setModalVisible: () => void;
  onShare: () => void;
};

const NotificationRow: React.FC<Props> = ({
  notification,
  onPress,
  removeNotification,
  setNotificationItem,
  setModalVisible,
  onShare,
}) => {
  return (
    <Swipeable
      renderRightActions={(progress, dragX) => (
        <DeleteSwipeable
          dragX={dragX}
          removeNotification={removeNotification}
        />
      )}
      childrenContainerStyle={styles.swipeableChild}>
      <TouchableNativeFeedback onPress={onPress} onLongPress={() => null}>
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
              <Text style={styles.notificationTitle}>{notification.title}</Text>
              <Text style={styles.notificationShortDescription}>
                {notification.shortDescription}
              </Text>
              <View style={styles.notificationFooter}>
                <Text style={styles.label}>{notification.labels}</Text>
                <Text style={styles.notificationTime}>
                  {prettyPrintTime(notification.timestamp)}
                </Text>
              </View>
            </View>
          </ContextMenu>
        </View>
      </TouchableNativeFeedback>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  notificationRow: {
    backgroundColor: 'white',
    borderRadius: 10,
    shadowRadius: 3,
    shadowColor: 'grey',
    shadowOffset: {height: 2, width: 0},
    shadowOpacity: 0.5,
    elevation: 5,
  },
  swipeableChild: {
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  context: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingHorizontal: 7,
    borderRadius: 10,
  },
  notificationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  notificationShortDescription: {
    fontSize: 14,
    paddingBottom: 10,
  },
  notificationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    alignSelf: 'flex-end',
    fontSize: 10,
    color: '#0080FF',
    textTransform: 'uppercase',
    fontWeight: '300',
  },
  notificationTime: {
    color: 'grey',
    fontSize: 12,
  },
});

export default NotificationRow;