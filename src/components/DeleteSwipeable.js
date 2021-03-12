import React from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
} from 'react-native';

const DeleteSwipeable = (progress, dragX, removeNotification) => {
  const trans = dragX.interpolate({
    inputRange: [Dimensions.get('window').width * -0.3, 0],
    outputRange: [0, Dimensions.get('window').width * 0.3 + 20],
    extrapolate: 'clamp',
  });

  return (
    <TouchableNativeFeedback onPress={() => removeNotification()}>
      <Animated.View
        style={[
          styles.leftAction,
          {
            transform: [{translateX: trans}],
          },
        ]}>
        <Text style={styles.actionText}>Delete</Text>
      </Animated.View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  leftAction: {
    flex: 0.3,
    marginVertical: 5,
    marginRight: 20,
    borderRadius: 10,
    shadowRadius: 3,
    shadowColor: 'grey',
    shadowOffset: {height: 2, width: 0},
    shadowOpacity: 0.5,
    elevation: 5,
    backgroundColor: 'rgb(255, 59, 48)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionText: {
    color: 'white',
    fontSize: 16,
    backgroundColor: 'transparent',
    padding: 10,
  },
  rightAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

export default DeleteSwipeable;
