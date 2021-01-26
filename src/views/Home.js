import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  FlatList,
  StyleSheet,
  View,
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Spinner from 'react-native-spinkit';
import {NotificationRow, NotificationModal} from '@app/components';
import {getNotifications} from '@app/services';

const Home = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [notificationItem, setNotificationItem] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async () => {
      loadNotifications();
    });

    return unsubscribe;
  }, []);

  const renderNotificationRow = ({item}) => (
    <NotificationRow
      title={item.title}
      shortDescription={item.shortDescription}
      timestamp={item.timestamp}
      onPress={() => {
        setNotificationItem(item);
        setModalVisible(true);
      }}
    />
  );

  const loadNotifications = async () => {
    setLoading(true);
    const res = await getNotifications();
    setNotifications(res);
    setLoading(false);
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  return (
    <>
      <StatusBar barStyle={'dark-content'} />
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
              onPress={() => navigation.navigate('Settings')}
            />
          </View>
        </View>
        {loading ? (
          <View style={styles.loadingView}>
            <Spinner type={'CircleFlip'} size={100} color={'#0080FF'} />
          </View>
        ) : (
          <FlatList
            refreshing={loading}
            onRefresh={() => loadNotifications()}
            data={notifications}
            renderItem={renderNotificationRow}
            keyExtractor={(notificationItem) => notificationItem.id}
          />
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
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
    fontWeight: '900',
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
});

export default Home;
