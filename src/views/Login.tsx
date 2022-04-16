import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {LoadingModal, AlertModal} from '../components';
import api from '../services/api';
import {useUser} from '../context/UserContext';

const Login = () => {
  const email = useRef();
  const password = useRef();
  const [loading, setLoading] = useState(false);
  const [alertModalVisible, setAlertModalVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const {dispatch} = useUser();

  const onTextChange = (ref: React.RefObject<any>, value: string) => {
    ref.current = value;
  };

  const validateAndHandleLogin = async () => {
    if (!email.current || !password.current) {
      setAlertMessage('Missing email or password. Please fill both fields.');
      setAlertModalVisible(true);
    } else {
      setLoading(true);
      try {
        const user = await api.login(email.current, password.current);
        dispatch({type: 'UPDATE', value: user});
      } catch (err: any) {
        setLoading(false);
        setAlertMessage(err.message);
        setTimeout(() => setAlertModalVisible(true), 500);
      }

      // handleLogin(email.current, password.current).catch((err) => {
      //   setLoading(false);
      //   setAlertMessage(err.message);
      //   setTimeout(() => setAlertModalVisible(true), 500);
      // });
    }
  };

  return (
    <>
      <StatusBar
        barStyle={'dark-content'}
        animated={true}
        backgroundColor={'white'}
      />
      <AlertModal
        visible={alertModalVisible}
        onBackdropPress={(value) => setAlertModalVisible(value)}>
        {alertMessage}
      </AlertModal>
      <LoadingModal visible={loading} />
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <View style={styles.thirds}>
              <Text style={styles.title}>pushie</Text>
            </View>
            <View style={styles.thirds}>
              <TextInput
                style={styles.username}
                placeholder={'Email Address'}
                placeholderTextColor={'#0080ff'}
                autoComplete={'email'}
                autoCorrect={false}
                autoCapitalize={'none'}
                enablesReturnKeyAutomatically={true}
                keyboardType={'email-address'}
                returnKeyType={'next'}
                onChangeText={(value) => onTextChange(email, value)}
              />
              <TextInput
                style={styles.password}
                placeholder={'Password'}
                placeholderTextColor={'#0080ff'}
                autoComplete={'password'}
                autoCorrect={false}
                autoCapitalize={'none'}
                enablesReturnKeyAutomatically={true}
                secureTextEntry={true}
                returnKeyType={'go'}
                onChangeText={(value) => onTextChange(password, value)}
                onSubmitEditing={() => {
                  validateAndHandleLogin();
                }}
              />
            </View>
            <View style={styles.thirds}>
              <TouchableOpacity
                onPress={() => {
                  validateAndHandleLogin();
                }}>
                <Text style={styles.loginButton}>Login or Signup</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thirds: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 90,
    ...Platform.select({
      ios: {
        fontWeight: '900',
      },
      android: {
        fontWeight: '900',
        fontFamily: 'sans-serif-black',
      },
    }),
    color: '#0080ff',
  },
  username: {
    padding: 20,
    fontSize: 20,
    color: '#0080ff',
    borderBottomColor: '#0080ff',
    borderBottomWidth: 1,
    width: '70%',
  },
  password: {
    padding: 20,
    fontSize: 20,
    color: '#0080ff',
    borderBottomColor: '#0080ff',
    borderBottomWidth: 1,
    width: '70%',
  },
  loginButton: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0080ff',
  },
});

export default Login;
