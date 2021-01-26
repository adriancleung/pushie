import React from 'react';
import {
  Modal,
  StyleSheet,
  View,
  Text,
  Animated,
  Easing,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import {getLocalDateTime} from '@app/util';

const translateX = new Animated.Value(0);
const translateY = new Animated.Value(0);
const scaleX = new Animated.Value(Dimensions.get('window').width * 3);
const scaleY = new Animated.Value(5);

const NotificationModal = ({visible, item, onBackdropPress}) => {
  return (
    <Modal visible={visible} transparent={true}>
      <TouchableWithoutFeedback
        style={styles.container}
        onPress={() => onBackdropPress(!visible)}>
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
            onHandlerStateChange={({nativeEvent}) => {
              if (
                Math.abs(nativeEvent.velocityY) > 1500 &&
                nativeEvent.oldState === State.ACTIVE
              ) {
                Animated.timing(translateY, {
                  toValue:
                    nativeEvent.velocityY > 0
                      ? translateY._value + 5000
                      : translateY._value - 5000,
                  easing: Easing.linear(),
                  duration: 150,
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
            }}>
            <Animated.View style={styles.modalView}>
              <TouchableWithoutFeedback>
                <View style={styles.modalContent}>
                  <View style={styles.header}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Icon
                      name={'close'}
                      size={30}
                      onPress={() => onBackdropPress(!visible)}
                    />
                  </View>
                  <View style={styles.body}>
                    <Text style={styles.description}>
                      {item.description
                        ? item.description
                        : item.shortDescription}
                    </Text>
                  </View>
                  <View style={styles.footer}>
                    <Text>{getLocalDateTime(item.timestamp)}</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 128, 255, 0.7)',
  },
  modalView: {
    width: '80%',
    height: '40%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    transform: [
      {
        perspective: 900,
        rotateY: Animated.divide(translateX, scaleX),
        translateY: Animated.divide(translateY, scaleY),
      },
    ],
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
    flex: 4,
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
  },
  description: {
    fontSize: 20,
  },
});

export default NotificationModal;
