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
  const bottomSheetModalRef = useRef(null);

  const {state: user} = useUser();

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async () => {
      loadNotifications();
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

  const getLabels = (allLabels: Label[]) => {
    const uniqueLabels = [
      ...new Set(
        allLabels.map((label) =>
          label.label === undefined ? 'No Label' : label.label,
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
      .map((item) => (item.label === 'No Label' ? undefined : item.label));
    const filteredNotifications = allNotifications.filter(
      (notification: Notification) => {
        return filteredLabels.includes(notification.label);
      },
    );
    setNotifications(filteredNotifications);
  };

  const loadNotifications = async () => {
    setLoading(true);
    try {
      // const res = await getNotifications();
      const res = (await api.user.withId(user.userId).notifications.get())
        .notifications;
      setNotifications(res);
      setAllNotifications(res);
      getLabels(res);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              onRefresh={() => loadNotifications()}
              data={notifications}
              renderItem={renderNotificationRow}
              keyExtractor={(item: Notification) => item.id}
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
    backgroundColor: 'white',
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
  },
  separator: {
    paddingVertical: 5,
  },
});

export default Home;
