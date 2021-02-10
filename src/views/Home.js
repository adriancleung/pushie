import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  FlatList,
  StyleSheet,
  View,
  Share,
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Spinner from 'react-native-spinkit';
import ContextMenu from 'react-native-context-menu-view';
import {NotificationRow, NotificationModal} from '@app/components';
import {deleteNotification, getNotifications} from '@app/services';
import {CONTEXT_DELETE, CONTEXT_PREVIEW, CONTEXT_SHARE} from '@app/constants';

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
          removeNotification(item);
        } else if (name === CONTEXT_PREVIEW) {
          setNotificationItem(item);
          setModalVisible(true);
        } else if (name === CONTEXT_SHARE) {
          onShare(item);
        }
      }}>
      <NotificationRow
        title={item.title}
        shortDescription={item.shortDescription}
        timestamp={item.timestamp}
        onPress={() => {
          setNotificationItem(item);
          setModalVisible(true);
        }}
      />
    </ContextMenu>
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
      <StatusBar barStyle={'dark-content'} animated={true} />
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
            refreshing={loading}
            onRefresh={() => loadNotifications()}
            data={notifications}
            renderItem={renderNotificationRow}
            keyExtractor={(item) => item.id}
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
