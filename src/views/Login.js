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
import {LoadingModal} from '@app/components';
import {handleLogin} from '@app/services';

const Login = () => {
  const email = useRef();
  const password = useRef();
  const [loading, setLoading] = useState(false);

  const onTextChange = (ref, value) => {
    ref.current = value;
  };

  return (
    <>
      <StatusBar barStyle={'dark-content'} />
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <LoadingModal visible={loading} />
            <View style={styles.thirds}>
              <Text style={styles.title}>pushie</Text>
            </View>
            <View style={styles.thirds}>
              <TextInput
                style={styles.username}
                placeholder={'Email Address'}
                placeholderTextColor={'#0080ff'}
                autoCompleteType={'email'}
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
                autoCompleteType={'password'}
                autoCorrect={false}
                autoCapitalize={'none'}
                enablesReturnKeyAutomatically={true}
                secureTextEntry={true}
                returnKeyType={'go'}
                onChangeText={(value) => onTextChange(password, value)}
                onSubmitEditing={() => {
                  setLoading(true);
                  handleLogin(email.current, password.current);
                }}
              />
            </View>
            <View style={styles.thirds}>
              <TouchableOpacity
                onPress={() => {
                  setLoading(true);
                  handleLogin(email.current, password.current);
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
    marginTop: StatusBar.currentHeight || 0,
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
    fontWeight: '900',
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
