import React, {useState, useRef} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {getFromKeychain} from '@app/util';

const Api = ({navigation}) => {
  const APIKEY_MASK = '*'.repeat(43);
  const [apiKey, setApiKey] = useState(APIKEY_MASK);
  const apiVisible = useRef(false);

  const showHideApiKey = () => {
    apiVisible.current = !apiVisible.current;
    if (apiVisible.current) {
      getFromKeychain('api')
        .then((value) => {
          if (value) {
            setApiKey(value.password);
          }
        })
        .catch(() => {
          apiVisible.current = false;
        });
    } else {
      apiVisible.current = false;
      setApiKey(APIKEY_MASK);
    }
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
      <Text
        style={styles.apiKey}
        selectable={true}
        onPress={() => showHideApiKey()}>
        {apiKey}
      </Text>
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
  apiKey: {
    paddingVertical: 25,
    fontSize: 20,
    fontFamily: 'Menlo',
  },
});

export default Api;
