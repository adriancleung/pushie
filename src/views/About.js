import React from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const About = ({navigation}) => {
  return (
    <>
      <StatusBar barStyle={'dark-content'} animated={true} />
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
          <Text onPress={() => navigation.navigate('Changelog')}>
            Release Notes
          </Text>
          <Text onPress={() => navigation.navigate('License')}>
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
});

export default About;
