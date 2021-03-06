import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { View, Image, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';

import api from '../services/api';

import logo from '../assets/logo.png';
import iconDislike from '../assets/dislike.png';
import iconLike from '../assets/like.png';
import itsmatch from '../assets/itsamatch.png';
import AsyncStorage from '@react-native-community/async-storage';

function Main({ navigation }) {
  const id = navigation.getParam('user');
  const [users, setUsers] = useState([]); 
  const [matchDev, setMatchDev] = useState(null);

  useEffect( () => {
    async function loadUsers() {
      const response = await api.get('/devs', {
        headers: { user: id }
      })
      setUsers(response.data);
    }
    loadUsers()
  }, [id] )

  useEffect( () => {
    const socket = io('http://localhost:3333/', {
      query: {
        user: id
      }
    }); 

    socket.on('match', dev => {
      setMatchDev(dev)
    });
  }, [id]);

  async function handleLike() {
    const [user, ...rest] = users;
    await api.post(`/devs/${user._id}/likes`, null, {
      headers: { user: id }
    })
    setUsers(rest);
  }

  async function handleDislike() {
    const [user, ...rest] = users;
    await api.post(`/devs/${user._id}/dislikes`, null, {
      headers: { user: id }
    })
    setUsers(rest);
  }

  async function handleLogout() {
    await AsyncStorage.clear();
    navigation.navigate('Login');
  }

  return (
    <SafeAreaView style={css.container}>
      <TouchableOpacity onPress={handleLogout}>
        <Image style={css.logo} source={logo} />
      </TouchableOpacity>
      <View style={css.cardsContainer}>
        { users.length === 0
          ? <Text style={css.empty}>😔</Text>
          : (
            users.map( (user, index) => (
              <View key={user._id} style={[css.card, { zIndex: users.length - index }]}>
                <Image style={css.avatar} source={{ uri: user.avatar }} />
                <View style={css.footer}>
                  <Text style={css.name}>{user.name}</Text>
                  <Text style={css.bio} numberOfLines={3}>{user.bio}</Text>
                </View>
              </View>
            ))
          )
        }
      </View>
      
      <View style={css.buttonsContainer}>
        { users.length > 0 && (
          <TouchableOpacity onPress={handleDislike} style={css.button}>
            <Image style={css.icon} source={iconDislike} />
          </TouchableOpacity>
        )
        }   
        { users.length > 0 && (
          <TouchableOpacity onPress={handleLike} style={css.button}>
            <Image style={css.icon} source={iconLike} />
          </TouchableOpacity>
        )
        }   
        
      </View>

      { matchDev && (
        <View style={css.matchContainer}>
          <Image style={css.matchImage} source={itsmatch} alt="It's a match" />
          <Image source={{ uri: matchDev.avatar }} style={css.matchAvatar} alt={matchDev.name} />
          <Text style={css.matchName}>{matchDev.name}</Text>
          <Text style={css.matchBio}>{matchDev.bio}</Text>
          <TouchableOpacity style={css.matchButton} onPress={() => setMatchDev(null)}>
            <Text style={css.matchButtonText}>FECHAR</Text>
          </TouchableOpacity>
        </View>
      )
      }

    </SafeAreaView>
  )
}

const css = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  logo: {
    marginTop: 24
  },

  cardsContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    maxHeight: 500,
    position: 'relative'
  },

  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    margin: 30,
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },

  avatar: {
    flex: 1,
    height: 300
  },

  footer: {
    backgroundColor: '#FFF',
    paddingVertical: 12,
    paddingHorizontal: 24
  },

  name: {
    fontSize: 16,
    marginVertical: 12,
    fontWeight: 'bold',
    color: '#333'
  },

  bio: {
    color: '#999',
    fontSize: 14,
    marginVertical: 8,
    lineHeight: 20
  },

  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 32
  },

  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 24,
    backgroundColor: '#FFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 2
    }
  },

  icon: {},

  empty: {
    textAlign: 'center',
    fontSize: 72,
  },

  matchContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,.8)',
  },

  matchImage: {
    height: 60,
    resizeMode: 'contain'
  },

  matchAvatar: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 5,
    borderColor: '#FFF',
    marginVertical: 30
  },

  matchName: {
    fontSize: 24,
    color: '#fff'
  },

  matchBio: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 24,
    marginTop: 10,
    textAlign: 'center',
    paddingHorizontal: 30
  },

  matchButton: {
    borderWidth: 0,
    backgroundColor: 'transparent',
  },

  matchButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'rgba(255,255,255,.8)',
    height: 24,
    paddingHorizontal: 24,
    paddingVertical: 24,
    marginVertical: 24
  }

});

export default Main;