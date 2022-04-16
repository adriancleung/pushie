import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Animated,
  Easing,
  Vibration,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-simple-toast';
import {getFromKeychain, storeInKeychain} from '../util';
import api from '../services/api';
import {useUser} from '../context/UserContext';

type Props = {
  navigation: any;
};

const Api: React.FC<Props> = ({navigation}) => {
  const spinAnim = new Animated.Value(0);
  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['90deg', '450deg'],
  });
  var stopAnimation = false;
  var result: string;

  const APIKEY_MASK = '*'.repeat(43);
  const [apiKey, setApiKey] = useState(APIKEY_MASK);
  const apiVisible = useRef(false);

  const {state: user} = useUser();

  const showHideApiKey = () => {
    apiVisible.current = !apiVisible.current;
    if (apiVisible.current) {
      getFromKeychain()
        .then((value) => {
          if (value) {
            setApiKey(value.password);
          }
        })
        .catch(() => {
          apiVisible.current = false;
          setApiKey(APIKEY_MASK);
        });
    } else {
      apiVisible.current = false;
      setApiKey(APIKEY_MASK);
    }
  };

  const copyToClipboard = () => {
    if (!apiVisible.current) {
      getFromKeychain()
        .then((value) => {
          if (value) {
            Clipboard.setString(value.password);
            Vibration.vibrate(500);
            Toast.show('Copied!', Toast.SHORT);
          }
        })
        .catch((err) => console.error(err));
    } else {
      Clipboard.setString(apiKey);
      Vibration.vibrate(500);
      Toast.show('Copied!', Toast.SHORT);
    }
  };

  const spinner = Animated.timing(spinAnim, {
    toValue: 1,
    duration: 1500,
    easing: Easing.linear,
    useNativeDriver: true,
  });

  const loopAnimation = () => {
    if (stopAnimation) {
      if (apiVisible.current) {
        setApiKey(result);
      }
      spinner.reset();
      return;
    }
    spinner.start(() => loopAnimation());
  };

  const handleRefreshApiKey = () => {
    loopAnimation();
    api.user
      .withId(user.userId)
      .apis.refresh()
      .then((value) => {
        storeInKeychain('api', value)
          .then(() => {
            if (apiVisible.current) {
              result = value;
            }
            stopAnimation = true;
          })
          .catch((err) => {
            console.error(err);
            stopAnimation = true;
          });
      })
      .catch((err) => {
        console.error(err);
        stopAnimation = true;
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerThirds}>
          <Icon
            name={'chevron-left'}
            size={30}
            onPress={() => navigation.goBack()}
          />
        </View>
        <View style={styles.headerThirds}>
          <Text style={styles.headerTitle}>API Key</Text>
        </View>
        <View style={styles.headerThirds} />
      </View>
      <View style={styles.apiView}>
        <Text
          style={styles.apiKey}
          selectable={true}
          onPress={() => showHideApiKey()}>
          {apiKey}
        </Text>
        <Icon
          name={'content-copy'}
          size={30}
          style={styles.copyButton}
          onPress={() => copyToClipboard()}
        />
        <Animated.View style={{transform: [{rotate: spin}]}}>
          <Icon
            name={'autorenew'}
            size={30}
            onPress={() => handleRefreshApiKey()}
          />
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerThirds: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  apiView: {
    paddingVertical: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  apiKey: {
    paddingRight: 10,
    flexShrink: 1,
    fontSize: 20,
    fontFamily: 'Menlo',
  },
  copyButton: {
    paddingRight: 10,
  },
});

export default Api;
