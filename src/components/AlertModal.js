import React from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  TouchableOpacity,
} from 'react-native';

const AlertModal = ({visible, onBackdropPress, children}) => {
  return (
    <Modal visible={visible} transparent={true} animationType={'slide'}>
      <TouchableWithoutFeedback
        style={styles.container}
        onPress={() => onBackdropPress(!visible)}>
        <View style={styles.centerView}>
          <TouchableWithoutFeedback>
            <View style={styles.modalView}>
              <View style={styles.textView}>
                <Text style={styles.alertText}>{children}</Text>
              </View>
              <TouchableOpacity
                style={styles.buttonView}
                onPress={() => onBackdropPress(!visible)}>
                <Text style={styles.closeButton}>OK</Text>
              </TouchableOpacity>
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
  },
  modalView: {
    width: '80%',
    height: '20%',
    backgroundColor: '#0080FF',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textView: {
    flex: 3,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'white',
  },
  buttonView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  closeButton: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default AlertModal;
