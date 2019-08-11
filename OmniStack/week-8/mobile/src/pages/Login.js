import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  KeyboardAvoidingView,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet
  } from 'react-native';

import api from '../services/api';
import logo from '../assets/logo.png';

function Login({ navigation }) {
  
  const [user, setUser] = useState('');

  useEffect( () => {
    AsyncStorage.getItem('user').then( user => {
      if(user) {
        navigation.navigate('Main', { user });
      }
    })
  }, [] );

  async function handleLogin() {
    const response = await api.post('/devs', { username: user });
    const { _id } = response.data;
    await AsyncStorage.setItem('user', _id);
    navigation.navigate('Main', { user: _id });
  }

  return (
  <KeyboardAvoidingView
    style={styles.container}
    behavior="padding"
    enabled={ Platform.OS === 'ios' }>
    <Image source={logo} />
    <TextInput
      autoCapitalize="none"
      autoCorrect={false}
      placeholder="Digite seu usuário do Github"
      placeholderTextColor="#999"
      style={styles.input}
      value={user}
      onChangeText={setUser}
      />
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
  </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32
  },

  input: {
    height: 48,
    alignSelf: 'stretch',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 4,
    marginTop: 24,
    paddingHorizontal: 12
  },

  button: {
    height: 48,
    alignSelf: 'stretch',
    backgroundColor: '#DF4723',
    borderRadius: 4,
    marginTop: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16
  }

});

export default Login;