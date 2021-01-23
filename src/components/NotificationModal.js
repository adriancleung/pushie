import React from 'react';
import {
  Modal,
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import {getLocalDateTime} from '@app/util';

const NotificationModal = ({visible, item, onBackdropPress}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      presentationStyle={null}
      animationType={'fade'}>
      <TouchableWithoutFeedback
        style={styles.container}
        onPress={() => onBackdropPress(false)}>
        <View style={styles.centerView}>
          <TouchableWithoutFeedback>
            <View style={styles.modalView}>
              <View style={styles.header}>
                <Text style={styles.title}>{item.title}</Text>
              </View>
              <View style={styles.body}>
                <Text style={styles.description}>{item.description}</Text>
              </View>
              <View style={styles.footer}>
                <Text>{getLocalDateTime(item.timestamp)}</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#48484A',
    opacity: 0.8,
  },
  modalView: {
    width: '80%',
    height: '50%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flex: 1,
  },
  body: {
    flex: 4,
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
  },
  description: {
    fontSize: 20,
  },
});

export default NotificationModal;
