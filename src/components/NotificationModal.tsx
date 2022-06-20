import React from 'react';
import {
  Modal,
  StyleSheet,
  View,
  Text,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  StatusBar,
  Platform,
  GestureResponderEvent,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  GestureHandlerStateChangeNativeEvent,
  PanGestureHandler,
  PanGestureHandlerEventExtra,
  State,
} from 'react-native-gesture-handler';
import {getLocalDateTime} from '../util';
import {Notification} from '../types/notification';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;
const translateX = new Animated.Value(0);
const translateY = new Animated.Value(0);
const scaleX = new Animated.Value(screenWidth * 3);
const scaleY = new Animated.Value(5);

type Props = {
  visible: boolean;
  notification: Notification | undefined;
  onBackdropPress: (arg0: boolean) => void;
};

const NotificationModal: React.FC<Props> = ({
  visible,
  notification,
  onBackdropPress,
}) => {
  const swipeToDismiss = (
    nativeEvent: GestureHandlerStateChangeNativeEvent &
      PanGestureHandlerEventExtra,
  ) => {
    if (
      Math.abs(nativeEvent.velocityY) > 1500 &&
      nativeEvent.oldState === State.ACTIVE
    ) {
      Animated.timing(translateY, {
        toValue:
          nativeEvent.velocityY > 0
            ? translateY._value + screenHeight * scaleY._value
            : translateY._value - screenHeight * scaleY._value,
        duration: 250,
        useNativeDriver: true,
      }).start(() => onBackdropPress(!visible));
    } else if (nativeEvent.oldState === State.ACTIVE) {
      Animated.spring(translateY, {
        toValue: translateY._value,
        useNativeDriver: true,
      }).start();
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  };

  const dismissOnBackdrop = (event: GestureResponderEvent) => {
    Animated.timing(translateY, {
      toValue: screenHeight * 2,
      duration: 250,
      useNativeDriver: true,
    }).start(() => onBackdropPress(!visible));
  };

  return (
    <Modal visible={visible} transparent={true} animationType={'fade'}>
      <StatusBar
        barStyle={'dark-content'}
        animated={false}
        backgroundColor={'rgba(0, 128, 255, 0.5)'}
        translucent={false}
      />
      <TouchableWithoutFeedback
        style={styles.container}
        onPress={(event) => dismissOnBackdrop(event)}>
        <View style={styles.centerView}>
          <PanGestureHandler
            onGestureEvent={Animated.event(
              [
                {
                  nativeEvent: {
                    translationX: translateX,
                    translationY: translateY,
                  },
                },
              ],
              {useNativeDriver: true},
            )}
            onHandlerStateChange={({nativeEvent}) =>
              swipeToDismiss(nativeEvent)
            }>
            <Animated.View style={styles.modalView}>
              <TouchableWithoutFeedback>
                <View style={styles.modalContent}>
                  <View style={styles.header}>
                    <View style={styles.titleView}>
                      <Text style={styles.title}>{notification?.title}</Text>
                    </View>
                    <View style={styles.closeView}>
                      <Icon
                        name={'close'}
                        size={30}
                        onPress={(event) => dismissOnBackdrop(event)}
                      />
                    </View>
                  </View>
                  <View style={styles.body}>
                    <Text style={styles.description}>
                      {notification?.description
                        ? notification?.description
                        : notification?.shortDescription}
                    </Text>
                  </View>
                  <View style={styles.footer}>
                    <Text style={styles.labelText}>{notification?.label}</Text>
                    <Text>{getLocalDateTime(notification?.timestamp)}</Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </Animated.View>
          </PanGestureHandler>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerView: {
    flex: 1,
    paddingBottom: 30,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 128, 255, 0.5)',
  },
  modalView: {
    width: '90%',
    height: '40%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    shadowColor: '#dadada',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 5,
    ...Platform.select({
      ios: {
        transform: [
          {perspective: 900},
          {rotateY: Animated.divide(translateX, scaleX)},
          {translateY: Animated.divide(translateY, scaleY)},
        ],
      },
      android: {
        transform: [
          {perspective: 900},
          {translateY: Animated.divide(translateY, scaleY)},
        ],
      },
    }),
  },
  modalContent: {
    width: '100%',
    height: '100%',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  body: {
    flex: 3,
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  labelText: {
    color: '#0080FF',
    textTransform: 'uppercase',
    fontWeight: '300',
  },
  titleView: {
    flex: 9,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  closeView: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    ...Platform.select({
      ios: {
        fontWeight: '900',
      },
      android: {
        fontWeight: '900',
        fontFamily: 'sans-serif-black',
      },
    }),
  },
  description: {
    fontSize: 20,
  },
});

export default NotificationModal;
