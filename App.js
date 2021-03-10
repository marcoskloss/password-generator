import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import Slider from '@react-native-community/slider'
import Clipboard from 'expo-clipboard'

const charset = 'abcefghijklmnopqrstuvxwyzABCEFGHIJKLMNOPQRSTUVXWYZ0123456789!#$&'

export default function App() {
  const [password, setPassword] = useState('')
  const [size, setSize] = useState(10)

  function generatePassword() {
    let randomNumbers = []
    for (let i = 0; i < size; i++) {
      const random = parseInt(Math.random() * charset.length)
      randomNumbers.push(random)
    }
    
    const passwordChars = randomNumbers.map(number => charset[number])
    const password = passwordChars.join('')
    setPassword(password)
  }

  function copyPassword() {
    Clipboard.setString(password)
    alert('Senha copiada com sucesso!')
  }

  return (
    <View style={styles.container}>
      <Image 
        source={require('./src/assets/logo.png')}
        style={styles.logo}
      />

      <Text style={styles.title}>
        {String(size).length === 1 ? `0${size}` : size } Caracteres
      </Text>

      <View style={styles.area}>
        <Slider
          style={styles.slider}
          minimumValue={5}
          maximumValue={15}
          minimumTrackTintColor='#3DBA66'
          maximumTrackTintColor='#a8a8a8'
          thumbTintColor='#2F955B'
          value={size}
          onValueChange={(value) => setSize(value.toFixed(0))}
        />
      </View>

      <TouchableOpacity 
        style={styles.button}
        onPress={generatePassword}  
      >
        <Text style={styles.buttonText}>Gerar senha</Text>
      </TouchableOpacity>

      {password !== '' && (
        <View style={styles.area}>
          <Text
            style={styles.password}
            onLongPress={copyPassword}  
          >
            {password}
          </Text>
        </View>
      )}

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ECF5EF'
  },

  logo: {
    marginBottom: 60,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    marginBottom: 15,
    color: '#212422'
  },

  area: {
    backgroundColor: 'white',
    marginTop: 15,
    height: 45,
    width: '70%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8
  },

  slider: {
    width: '90%',
  },

  button: {
    marginTop: 32,
    width: '70%',
    height: 50,
    backgroundColor: '#3DBA66',
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15
  },

  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    color: '#ECF5EF'
  },

  password: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.8,
    color: '#212422'
  }
})