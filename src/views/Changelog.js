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
import Spinner from 'react-native-spinkit';
import axios from 'axios';
import {CHANGELOG_URL} from '@app/constants';

const Changelog = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState('');

  useEffect(() => {
    setLoading(true);
    axios
      .get(CHANGELOG_URL)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch(() => {
        setData('##Cannot retrieve latest release notes :(');
        setLoading(false);
      });
  }, []);

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
        {loading ? (
          <View style={styles.spinner}>
            <Spinner type={'CircleFlip'} size={100} color={'#0080FF'} />
          </View>
        ) : (
          <ScrollView>
            <Markdown style={mdStyles}>{data}</Markdown>
          </ScrollView>
        )}
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
    paddingHorizontal: 10,
    backgroundColor: 'rgb(28, 28, 30)',
  },
  header: {
    marginVertical: 10,
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
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Changelog;
