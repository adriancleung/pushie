import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

type Props = {
  navigateTo: string;
  icon: string;
  title: string;
};

const SettingRow: React.FC<Props> = ({navigateTo, icon, title}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate(navigateTo)}>
      <View style={styles.item}>
        <Icon name={icon} style={styles.icon} />
        <Text style={styles.title}>{title}</Text>
      </View>
      <Icon name={'chevron-right'} size={30} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    paddingRight: 10,
    fontSize: 30,
  },
  title: {
    fontSize: 20,
  },
});

export default SettingRow;
