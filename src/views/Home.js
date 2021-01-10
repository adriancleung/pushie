import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {NotificationRow} from '@app/components';
import axios from 'axios';

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

  const saveTokenToFirestore = async (token) => {
    axios.post('http://10.10.10.73:3001/notify/token', {token});
  };

  const getNotifications = async () => {
    setLoading(true);
    const ref = await axios.get('http://10.10.10.73:3001/notify');
    setNotifications(ref.data);
    setLoading(false);
  };

  useEffect(() => {
    messaging()
      .getToken()
      .then((token) => saveTokenToFirestore(token));
    getNotifications();
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>pushie</Text>
        <Text style={styles.subtitle}>Notifications</Text>
        <FlatList
          refreshing={loading}
          onRefresh={() => getNotifications()}
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
