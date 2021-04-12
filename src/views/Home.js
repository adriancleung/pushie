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
} from '@app/components';
import {
  deleteNotification,
  getNotifications,
  getUserApiKey,
} from '@app/services';
import {storeInKeychain} from '@app/util';

const Home = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [notificationItem, setNotificationItem] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [allNotifications, setAllNotifications] = useState([]);
  const [labels, setLabels] = useState([]);
  const [loading, setLoading] = useState(true);
  const bottomSheetModalRef = useRef(null);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async () => {
      loadNotifications();
    });

    getUserApiKey()
      .then(async (value) => {
        await storeInKeychain('api', value);
      })
      .catch((err) => {
        console.error(err);
      });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeNotification = async (item) => {
    deleteNotification(item)
      .then(() => {
        setNotifications(notifications.filter((o) => o.id !== item.id));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onShare = async (item) => {
    try {
      await Share.share(
        {
          message: `${item.title}\n${
            item.description ? item.description : item.shortDescription
          }`,
        },
        {
          subject: item.title,
          tintColor: '#0080FF',
        },
      );
    } catch (err) {
      console.error(err);
    }
  };

  const renderNotificationRow = ({item}) => (
    <NotificationRow
      item={item}
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

  const getLabels = (data) => {
    const uniqueLabels = [
      ...new Set(
        data.map((item) =>
          item.label === undefined ? 'No Label' : item.label,
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
    const filteredNotifications = allNotifications.filter((notification) => {
      return filteredLabels.includes(notification.label);
    });
    setNotifications(filteredNotifications);
  };

  const loadNotifications = async () => {
    setLoading(true);
    try {
      const res = await getNotifications();
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
          item={notificationItem}
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
              keyExtractor={(item) => item.id}
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
