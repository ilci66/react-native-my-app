import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

const Home = ({ navigation }) => {
  return (
    <View>
      <Text>This is the home screen</Text>
      <Button
        onPress={() => navigation.navigate('About')}
        title="Go to About"
      />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})
