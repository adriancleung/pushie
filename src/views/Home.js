import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios';
import {NotificationRow} from '@app/components';
import {logoutUser, getNotifications} from '@app/services';
import {API_URL} from '@env';

const Home = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async () => {
      getNotifications();
    });

    return unsubscribe;
  }, []);

  const renderNotificationRow = ({item}) => (
    <NotificationRow
      title={item.title}
      shortDescription={item.shortDescription}
      timestamp={item.timestamp}
    />
  );

  const loadNotifications = async () => {
    setLoading(true);
    const res = getNotifications(auth().currentUser.uid);
    setNotifications(res);
    setLoading(false);
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  return (
    <>
      <StatusBar barStyle={'dark-content'} />
      <SafeAreaView style={styles.container}>
        <Text style={styles.title} onPress={() => logoutUser()}>pushie</Text>
        <Text style={styles.subtitle}>Notifications</Text>
        <FlatList
          refreshing={loading}
          onRefresh={() => loadNotifications()}
          data={notifications}
          renderItem={renderNotificationRow}
          keyExtractor={(notificationItem) => notificationItem.id}
        />
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
});

export default Home;
