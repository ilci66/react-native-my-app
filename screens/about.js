import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

const About = ({ navigation }) => {
  return (
    <View>
      <Text>This is the About screen</Text>
      <Button onPress={() => navigation.navigate('Home')} title="Go back home" />
    </View>
  )
}

export default About

const styles = StyleSheet.create({})
