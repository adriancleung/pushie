import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Menlo} from '@app/components';
import {logoutUser} from '@app/services';
import {getData} from '@app/util';
import {name, version} from '../../package.json';

const Settings = ({navigation}) => {
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    getData('@apiKey')
      .then((value) => setApiKey(value))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <StatusBar barStyle={'dark-content'} />
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
          <View style={styles.headerThirds} />
        </View>
        <View style={styles.body}>
          <View style={styles.settings}>
            <View style={styles.settingItem}>
              <Text style={styles.settingKey}>API Key</Text>
              <Text style={styles.settingValue} selectable={true}>
                {apiKey}
              </Text>
            </View>
            <View style={styles.settingItem}>
              <Text style={styles.settingKey}>How to Use:</Text>
              <Text style={styles.howToText}>
                1. Create a <Menlo>POST</Menlo> request to{' '}
                <Menlo>https://api.adrianleung.dev/pushie/notify</Menlo> and set
                the header <Menlo>pushie-api-key</Menlo> to the API key listed
                above.{'\n\n'}2. In the JSON body, include a{' '}
                <Menlo>title</Menlo>, <Menlo>shortDescription</Menlo>, and{' '}
                <Menlo>description</Menlo>.
              </Text>
            </View>
          </View>
          <View style={styles.footer}>
            <TouchableOpacity onPress={() => logoutUser()}>
              <Text style={styles.logoutButton}>Logout</Text>
            </TouchableOpacity>
            <Text>{name}</Text>
            <Text>{version}</Text>
          </View>
        </View>
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
    fontSize: 20,
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
  logoutButton: {
    fontSize: 20,
    color: 'red',
    paddingVertical: 10,
  },
  footer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingVertical: 20,
  },
});

export default Settings;
