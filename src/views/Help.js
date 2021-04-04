import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Menlo} from '@app/components';

const Help = ({navigation}) => {
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
          <Text style={styles.headerTitle}>How to Use</Text>
        </View>
        <View style={styles.headerThirds} />
      </View>
      <Text style={styles.howToText}>
        1. Create a <Menlo style={styles.menloText}>POST</Menlo> request to{' '}
        <Menlo style={styles.menloText}>
          https://api.adrianleung.dev/pushie/notify
        </Menlo>{' '}
        and set the header{' '}
        <Menlo style={styles.menloText}>pushie-api-key</Menlo> to you API key.
        {'\n\n'}2. In the JSON body, include a{' '}
        <Menlo style={styles.menloText}>title</Menlo>,{' '}
        <Menlo style={styles.menloText}>shortDescription</Menlo>,{' '}
        <Menlo style={styles.menloText}>description</Menlo> (optional) and{' '}
        <Menlo style={styles.menloText}>label</Menlo> (optional).
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
  howToText: {
    paddingVertical: 25,
    fontSize: 20,
    padding: 10,
    textAlign: 'justify',
  },
  menloText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Help;
