import React from 'react';
import {
  StatusBar,
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
} from 'react-native';
import {Menlo} from '@app/components';
import {LICENSE_TEXT, LICENSES} from '@app/constants';

const renderLicenseRow = ({item}) => {
  return (
    <View style={styles.license}>
      <Text style={styles.licenseTitle}>{item.id}</Text>
      <Text>
        The following component(s) are licensed under the {item.id} reproduced
        below:{'\n'}
      </Text>
      {LICENSES.filter((license) => license.type === item.id).map((value) => {
        return (
          <View key={value.name} style={styles.licenseView}>
            <Text>{'\u2022'}</Text>
            <Text style={styles.licenseName}>
              {value.name}, {value.copyright}
            </Text>
          </View>
        );
      })}
      <Menlo style={styles.licenseText}>{item.licenseText}</Menlo>
    </View>
  );
};

const License = ({navigation}) => {
  return (
    <>
      <StatusBar barStyle={'light-content'} animated={true} />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Licenses</Text>
          <Button title={'Done'} onPress={() => navigation.goBack()} />
        </View>

        <FlatList
          data={LICENSE_TEXT}
          renderItem={renderLicenseRow}
          keyExtractor={(item) => item.id}
        />
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  license: {
    paddingVertical: 20,
  },
  licenseTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  licenseText: {
    fontSize: 12,
  },
  licenseView: {
    flexDirection: 'row',
    paddingLeft: 10,
  },
  licenseName: {
    flex: 1,
    paddingLeft: 5,
  },
});

export default License;
