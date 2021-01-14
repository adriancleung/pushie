import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  FlatList,
  StyleSheet,
  View,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {NotificationRow} from '@app/components';
import {logoutUser, getNotifications} from '@app/services';

const Home = () => {
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
    />
  );

  const loadNotifications = async () => {
    setLoading(true);
    const res = await getNotifications(auth().currentUser.uid);
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
        <View style={styles.splitTop}>
          <View>
            <Text style={styles.title}>pushie</Text>
            <Text style={styles.subtitle}>Notifications</Text>
          </View>
          <View>
            <Icon
              name={'login'}
              size={40}
              style={styles.logoutButton}
              onPress={() => logoutUser()}
            />
          </View>
        </View>
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
  logoutButton: {
    paddingHorizontal: 20,
  },
});

export default Home;
