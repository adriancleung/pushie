import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Menlo} from '@app/components';
import {logoutUser} from '@app/services';
import {getFromKeychain} from '@app/util';

const Settings = ({navigation}) => {
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
    <>
      <StatusBar barStyle={'dark-content'} animated={true} />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerThirds}>
            <Icon
              name={'arrow-back'}
              size={30}
              onPress={() => navigation.goBack()}
            />
          </View>
          <View style={styles.headerThirds}>
            <Text style={styles.headerTitle}>Settings</Text>
          </View>
          <View style={styles.headerThirds}>
            <Icon
              style={styles.logoutButton}
              name={'lock-outline'}
              size={30}
              onPress={() => logoutUser()}
            />
          </View>
        </View>
        <ScrollView>
          <View style={styles.body}>
            <View style={styles.settings}>
              <View style={styles.settingItem}>
                <Text style={styles.settingKey}>API Key</Text>
                <Text
                  style={styles.settingValue}
                  selectable={true}
                  onPress={() => showHideApiKey()}>
                  {apiKey}
                </Text>
              </View>
              <View style={styles.settingItem}>
                <Text style={styles.settingKey}>How to Use:</Text>
                <Text style={styles.howToText}>
                  1. Create a <Menlo style={styles.menloText}>POST</Menlo>{' '}
                  request to{' '}
                  <Menlo style={styles.menloText}>
                    https://api.adrianleung.dev/pushie/notify
                  </Menlo>{' '}
                  and set the header{' '}
                  <Menlo style={styles.menloText}>pushie-api-key</Menlo> to the
                  API key listed above.{'\n\n'}2. In the JSON body, include a{' '}
                  <Menlo style={styles.menloText}>title</Menlo>,{' '}
                  <Menlo style={styles.menloText}>shortDescription</Menlo>, and{' '}
                  <Menlo style={styles.menloText}>description</Menlo>.
                </Text>
              </View>
              <TouchableOpacity
                style={styles.settingItem}
                onPress={() => navigation.navigate('Changelog')}>
                <Text style={styles.settingKey}>Release Notes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.settingItem}
                onPress={() => navigation.navigate('License')}>
                <Text style={styles.settingKey}>Open Source Libraries</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
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
  header: {
    padding: 10,
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
  body: {
    flex: 1,
  },
  settings: {
    paddingVertical: 20,
    flex: 5,
  },
  settingItem: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  settingKey: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  settingValue: {
    fontSize: 20,
    fontFamily: 'Menlo',
  },
  howToText: {
    fontSize: 20,
    padding: 10,
    textAlign: 'justify',
  },
  menloText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutButton: {
    alignSelf: 'flex-end',
  },
  footer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingVertical: 20,
  },
});

export default Settings;
