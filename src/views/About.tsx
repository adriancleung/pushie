import React from 'react';
import {View, Text, StyleSheet, StatusBar, Linking} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';
import {PRIVACY_POLICY_URL} from '../constants';

type Props = {
  navigation: any;
};

const About: React.FC<Props> = ({navigation}) => {
  return (
    <>
      <StatusBar
        barStyle={'dark-content'}
        animated={true}
        backgroundColor={'white'}
      />
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
            <Text style={styles.headerTitle}>About</Text>
          </View>
          <View style={styles.headerThirds} />
        </View>
        <View style={styles.body}>
          <Text
            style={styles.itemText}
            onPress={() => navigation.navigate('Changelog')}>
            Release Notes
          </Text>
          <Text
            style={styles.itemText}
            onPress={async () => {
              if (await InAppBrowser.isAvailable()) {
                StatusBar.setBarStyle('light-content');
                await InAppBrowser.open(PRIVACY_POLICY_URL, {
                  dismissButtonStyle: 'done',
                  animated: true,
                  modalEnabled: true,
                  modalPresentationStyle: 'formSheet',
                  enableBarCollapsing: true,
                });
                StatusBar.setBarStyle('dark-content');
              } else {
                Linking.openURL('https://adrianleung.dev/pushie/privacy');
              }
            }}>
            Privacy Policy
          </Text>
          <Text
            style={styles.itemText}
            onPress={() => navigation.navigate('License')}>
            Open Source Libraries
          </Text>
        </View>
      </View>
    </>
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
  body: {
    paddingVertical: 25,
  },
  itemText: {
    paddingVertical: 10,
  },
});

export default About;
