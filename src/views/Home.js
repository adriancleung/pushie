import React, {useEffect, useState} from 'react';
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
import {NotificationRow, NotificationModal} from '@app/components';
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
  const [loading, setLoading] = useState(true);

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

  const loadNotifications = async () => {
    setLoading(true);
    try {
      const res = await getNotifications();
      setNotifications(res);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  return (
    <>
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
      <SafeAreaView style={styles.container}>
        <View style={styles.splitTop}>
          <View>
            <Text style={styles.title}>pushie</Text>
            <Text style={styles.subtitle}>Notifications</Text>
          </View>
          <View>
            <Icon
              name={'settings'}
              size={30}
              style={styles.settingsButton}
              onPress={() => navigation.navigate('SettingsStack')}
            />
          </View>
        </View>
        {loading ? (
          <View style={styles.loadingView}>
            <Spinner type={'CircleFlip'} size={100} color={'#0080FF'} />
          </View>
        ) : (
          <FlatList
            contentContainerStyle={styles.flatListView}
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
      </SafeAreaView>
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
    alignItems: 'center',
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
  settingsButton: {
    paddingHorizontal: 20,
  },
  loadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatListView: {
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  separator: {
    paddingVertical: 10,
  },
});

export default Home;
