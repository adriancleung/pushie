import React, {useRef} from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  StyleSheet,
  Button,
} from 'react-native';
import {handleLogin} from '@app/services';

const Login = () => {
  const email = useRef();
  const password = useRef();

  const onTextChange = (ref, value) => {
    ref.current = value;
  };

  return (
    <>
      <StatusBar barStyle={'dark-content'} />
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>pushie</Text>
        <TextInput
          style={styles.username}
          placeholder={'Email Address'}
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
          autoCompleteType={'password'}
          autoCorrect={false}
          autoCapitalize={'none'}
          enablesReturnKeyAutomatically={true}
          secureTextEntry={true}
          returnKeyType={'go'}
          onChangeText={(value) => onTextChange(password, value)}
          onSubmitEditing={() => handleLogin(email.current, password.current)}
        />
        <Button
          title={'Login or Signup'}
          onPress={() => handleLogin(email.current, password.current)}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    padding: 20,
    fontSize: 50,
    fontWeight: '900',
    color: '#0080ff',
  },
  username: {
    padding: 10,
    fontSize: 20,
  },
  password: {
    padding: 10,
    fontSize: 20,
  },
});

export default Login;
