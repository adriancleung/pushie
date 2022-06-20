import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  FlatList,
  StyleSheet,
  View,
  Share,
  Platform,
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Spinner from 'react-native-spinkit';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {
  NotificationRow,
  NotificationModal,
  LabelFilterModal,
} from '../components';
import {Notification} from '../types/notification';
import {Label} from '../types/label';
import api from '../services/api';
import {useUser} from '../context/UserContext';
import {ErrorCode} from '../constants';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';

type Props = {
  navigation: any;
};

const Home: React.FC<Props> = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [notificationItem, setNotificationItem] = useState<Notification>();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [allNotifications, setAllNotifications] = useState<Notification[]>([]);
  const [labels, setLabels] = useState<Label[]>([]);
  const [loading, setLoading] = useState(true);
  const [isListEnd, setIsListEnd] = useState(false);
  const [isListLoading, setIsListLoading] = useState(false);
  const [page, setPage] = useState(1);
  const bottomSheetModalRef = useRef<BottomSheetModalMethods>(null);

  const {state: user, dispatch} = useUser();

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async () => {
      loadMoreNotifications();
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeNotification = async (notification: Notification) => {
    api.user
      .withId(user.userId)
      .notifications.withId(notification.id)
      .delete()
      .then(() => {
        setNotifications(
          notifications.filter((o: Notification) => o.id !== notification.id),
        );
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onShare = async (notification: Notification) => {
    try {
      await Share.share(
        {
          message: `${notification.title}\n${
            notification.description
              ? notification.description
              : notification.shortDescription
          }`,
        },
        {
          subject: notification.title,
          tintColor: '#0080FF',
        },
      );
    } catch (err) {
      console.error(err);
    }
  };

  const renderNotificationRow: React.FC<{item: Notification}> = ({item}) => {
    return (
      <NotificationRow
        notification={item}
        onPress={() => {
          setNotificationItem(item);
          setModalVisible(true);
        }}
        removeNotification={() => removeNotification(item)}
        setNotificationItem={() => setNotificationItem(item)}
        setModalVisible={() => setModalVisible(true)}
        onShare={() => onShare(item)}
      />
    );
  };

  const getLabels = (all: Notification[]) => {
    const uniqueLabels = [
      ...new Set(
        all.map((one) =>
          one.label === (undefined || null) ? 'No Label' : one.label,
        ),
      ),
    ].map((label) => {
      return {
        label: label,
        value: true,
      };
    });
    setLabels(uniqueLabels);
  };

  const filterLabels = () => {
    const filteredLabels = labels
      .filter((label) => label.value === true)
      .map((item) =>
        item.label === 'No Label' ? undefined || null : item.label,
      );
    const filteredNotifications = allNotifications.filter(
      (notification: Notification) => {
        return filteredLabels.includes(notification.label);
      },
    );
    setNotifications(filteredNotifications);
  };

  const initalLoadOrResetList = async () => {
    setLoading(true);
    setIsListEnd(false);
    setPage(1);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
    try {
      const res = (await api.user.withId(user.userId).notifications.get(1))
        .notifications;
      setNotifications(res);
      setAllNotifications(res);
      getLabels(res);
    } catch (err: any) {
      console.error(err);
      if (err.message === ErrorCode.NETWORK_ERROR) {
        dispatch({type: 'NO_CONNECTION'});
      }
    }
  };

  const loadMoreNotifications = async () => {
    setIsListLoading(true);
    try {
      const res = (await api.user.withId(user.userId).notifications.get(page))
        .notifications;
      if (res.length > 0) {
        setNotifications(notifications.concat(res));
        setAllNotifications(allNotifications.concat(res));
        getLabels(notifications.concat(res));
      } else {
        setIsListEnd(true);
      }
    } catch (err: any) {
      console.error(err);
      if (err.message === ErrorCode.NETWORK_ERROR) {
        dispatch({type: 'NO_CONNECTION'});
      }
    } finally {
      setIsListLoading(false);
    }
  };

  const fetchMoreNotifications = () => {
    if (!isListEnd && !isListLoading) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    if (page > 1) {
      loadMoreNotifications();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    initalLoadOrResetList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const EmptyListComponent = (
    <View style={styles.emptyListView}>
      <Icon
        name={'notifications'}
        color={'#AAAAAA'}
        size={80}
        style={styles.emptyListIcon}
      />
      <Text style={styles.emptyListText}>You have no notifications!</Text>
    </View>
  );

  return (
    <>
      <BottomSheetModalProvider>
        <StatusBar
          barStyle={'dark-content'}
          animated={true}
          backgroundColor={'white'}
        />
        <NotificationModal
          visible={modalVisible}
          notification={notificationItem}
          onBackdropPress={(value) => setModalVisible(value)}
        />
        <View style={styles.container}>
          <SafeAreaView>
            <View style={styles.splitTop}>
              <View>
                <Text style={styles.title}>pushie</Text>
                <Text style={styles.subtitle}>Notifications</Text>
              </View>
              <View style={styles.headerButtons}>
                <View style={styles.buttonView}>
                  <Icon
                    name={'settings'}
                    size={30}
                    onPress={() => navigation.navigate('SettingsStack')}
                  />
                </View>
                <View style={styles.buttonView}>
                  <Icon
                    name={'label'}
                    size={30}
                    onPress={() => bottomSheetModalRef.current?.present()}
                  />
                </View>
              </View>
            </View>
          </SafeAreaView>
          {loading ? (
            <View style={styles.loadingView}>
              <Spinner type={'CircleFlip'} size={100} color={'#0080FF'} />
            </View>
          ) : (
            <FlatList
              contentContainerStyle={styles.flatListView}
              showsVerticalScrollIndicator={false}
              refreshing={loading}
              onRefresh={initalLoadOrResetList}
              data={notifications}
              renderItem={renderNotificationRow}
              keyExtractor={(item: Notification) => item.id}
              onEndReachedThreshold={1}
              onEndReached={fetchMoreNotifications}
              ListEmptyComponent={EmptyListComponent}
              ItemSeparatorComponent={() => {
                return <View style={styles.separator} />;
              }}
            />
          )}
        </View>

        <LabelFilterModal
          ref={bottomSheetModalRef}
          labels={labels}
          onChange={() => filterLabels()}
        />
      </BottomSheetModalProvider>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  splitTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    paddingHorizontal: 20,
    fontSize: 50,
    ...Platform.select({
      ios: {
        fontWeight: '900',
      },
      android: {
        fontWeight: '900',
        fontFamily: 'sans-serif-black',
      },
    }),
    color: '#0080ff',
  },
  subtitle: {
    paddingHorizontal: 20,
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  headerButtons: {
    paddingHorizontal: 20,
  },
  loadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatListView: {
    paddingTop: 10,
    paddingBottom: 30,
    flexGrow: 1,
  },
  emptyListView: {
    flex: 1,
    marginBottom: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyListIcon: {
    paddingBottom: 30,
  },
  emptyListText: {
    color: '#AAAAAA',
    fontSize: 20,
    fontWeight: '300',
  },
  separator: {
    paddingVertical: 2,
  },
});

export default Home;
