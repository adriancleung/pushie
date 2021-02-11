import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  View,
  Text,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {SettingRow} from '@app/components';
import {logoutUser} from '@app/services';

const Settings = ({navigation}) => {
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
          <SettingRow
            title={'API Key'}
            navigateTo={'API Key'}
            icon={'vpn-key'}
          />
          <SettingRow
            title={'How to Use'}
            navigateTo={'Help'}
            icon={'help-outline'}
          />
          <SettingRow
            title={'About'}
            navigateTo={'AboutStack'}
            icon={'info-outline'}
          />
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
  logoutButton: {
    alignSelf: 'flex-end',
  },
});

export default Settings;
