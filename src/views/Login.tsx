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
import messaging from '@react-native-firebase/messaging';
import {LoadingModal, AlertModal} from '../components';
import api from '../services/api';
import {useUser} from '../context/UserContext';
import {storeInKeychain} from '../util';
import {ErrorCode} from '../constants';

type Props = {};

const Login: React.FC<Props> = () => {
  const email = useRef<string | null>(null);
  const password = useRef<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [alertModalVisible, setAlertModalVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const {dispatch} = useUser();

  const onTextChange = (
    ref: React.MutableRefObject<string | null>,
    value: string,
  ) => {
    ref.current = value;
  };

  const validateAndHandleLogin = async () => {
    if (!email.current || !password.current) {
      setAlertMessage('Missing email or password. Please fill both fields.');
      setAlertModalVisible(true);
    } else {
      setLoading(true);
      try {
        const user = await api.register(email.current, password.current);
        const token = await messaging().getToken();
        api.user.withId(user.userId).tokens.add(token);
        const {apiKey} = await api.user.withId(user.userId).apis.get();
        storeInKeychain('api', apiKey);
        dispatch({type: 'UPDATE', value: user});
      } catch (err: any) {
        if (err === 'E-mail already in use') {
          try {
            const user = await api.login(email.current, password.current);
            const token = await messaging().getToken();
            api.user.withId(user.userId).tokens.add(token);
            const {apiKey} = await api.user.withId(user.userId).apis.get();
            storeInKeychain('api', apiKey);
            dispatch({type: 'UPDATE', value: user});
          } catch (loginErr: any) {
            if (loginErr.message === ErrorCode.NETWORK_ERROR) {
              dispatch({type: 'NO_CONNECTION'});
            } else {
              setAlertMessage(loginErr);
              setTimeout(() => setAlertModalVisible(true), 500);
            }
          }
        } else {
          if (err.message === ErrorCode.NETWORK_ERROR) {
            dispatch({type: 'NO_CONNECTION'});
          } else {
            setAlertMessage(JSON.stringify(err));
            setTimeout(() => setAlertModalVisible(true), 500);
          }
        }
      } finally {
        setLoading(false);
      }
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
                style={styles.textInput}
                placeholder={'email address'}
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
                style={styles.textInput}
                placeholder={'password'}
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
                }}
                style={styles.loginButtonContainer}>
                <Text style={styles.loginButtonText}>login or signup</Text>
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
    fontSize: 80,
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
  textInput: {
    padding: 20,
    fontSize: 20,
    color: '#0080ff',
    borderBottomColor: '#0080ff',
    borderBottomWidth: 1,
    width: '70%',
  },
  loginButtonContainer: {
    paddingVertical: 10,
    alignItems: 'center',
    width: '70%',
    borderRadius: 10,
    backgroundColor: '#0080ff',
  },
  loginButtonText: {
    fontSize: 24,
    fontWeight: '400',
    color: '#FFFFFF',
  },
});

export default Login;
