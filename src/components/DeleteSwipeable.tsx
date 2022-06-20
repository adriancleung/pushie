import React from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';

type Props = {
  dragX: Animated.AnimatedInterpolation;
  removeNotification: () => void;
};

const DeleteSwipeable: React.FC<Props> = ({dragX, removeNotification}) => {
  const trans = dragX.interpolate({
    inputRange: [Dimensions.get('window').width * -0.3, 0],
    outputRange: [0, Dimensions.get('window').width * 0.3],
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
        <View style={styles.leftActionView}>
          <Text style={styles.actionText}>Delete</Text>
        </View>
      </Animated.View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  leftAction: {
    flex: 0.3,
  },
  leftActionView: {
    flex: 1,
    marginVertical: 5,
    marginRight: 20,
    borderRadius: 10,
    shadowRadius: 2,
    shadowColor: '#dadada',
    shadowOffset: {height: 1, width: 0},
    shadowOpacity: 1,
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
