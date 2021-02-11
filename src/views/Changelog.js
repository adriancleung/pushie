import React, {useEffect, useState} from 'react';
import {
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Markdown from 'react-native-markdown-display';
import axios from 'axios';
import {CHANGELOG_URL} from '@app/constants';

const Changelog = ({navigation}) => {
  const [data, setData] = useState('Cannot retrieve latest release notes :(');

  useEffect(() => {
    axios
      .get(CHANGELOG_URL)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  });

  return (
    <>
      <StatusBar barStyle={'light-content'} animated={true} />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Release Notes</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.closeButton}>Done</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <Markdown style={mdStyles}>{data}</Markdown>
        </ScrollView>
      </View>
    </>
  );
};

const mdStyles = StyleSheet.create({
  heading1: {
    display: 'none',
  },
  heading2: {
    color: 'white',
    paddingTop: 20,
    fontSize: 30,
    fontWeight: 'bold',
  },
  heading3: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  link: {
    color: '#0080FF',
    textDecorationLine: 'none',
  },
  body: {
    fontSize: 18,
    color: 'white',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgb(28, 28, 30)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeButton: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'rgb(0, 132, 255)',
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: '900',
    color: 'white',
  },
});

export default Changelog;
