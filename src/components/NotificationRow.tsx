import React from 'react';
import {View, Text, StyleSheet, TouchableNativeFeedback} from 'react-native';
import ContextMenu from 'react-native-context-menu-view';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import DeleteSwipeable from './DeleteSwipeable';
import {prettyPrintTime} from '../util';
import {ContextMenuAction} from '../constants';
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
                title: ContextMenuAction.SHARE,
                systemIcon: 'square.and.arrow.up',
                destructive: false,
              },
              {
                title: ContextMenuAction.DELETE,
                systemIcon: 'trash',
                destructive: true,
              },
            ]}
            onPress={(event) => {
              const {name} = event.nativeEvent;
              switch (name) {
                case ContextMenuAction.DELETE:
                  removeNotification();
                  break;
                case ContextMenuAction.PREVIEW:
                  setNotificationItem();
                  setModalVisible();
                  break;
                case ContextMenuAction.SHARE:
                  onShare();
                  break;
                default:
              }
            }}>
            <View style={styles.context}>
              <Text style={styles.notificationTitle}>{notification.title}</Text>
              <Text style={styles.notificationShortDescription}>
                {notification.shortDescription}
              </Text>
              <View style={styles.notificationFooter}>
                <Text style={styles.label}>{notification.label}</Text>
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
    shadowRadius: 2,
    shadowColor: '#dadada',
    shadowOffset: {height: 1, width: 0},
    shadowOpacity: 1,
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
