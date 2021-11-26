import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

const Home = ({ navigation }) => {

  const getReq = () => {
    console.log("sending get request")
    // it's probably failing because of the ssl 
    fetch('http://localhost:3001/', )
    // fetch('https://jsonplaceholder.typicode.com/posts',)
      .then(response => {
        // console.log("response",response)
        // return response.text();
        return response.json();
      })
      .then(data => {
        console.log("data ==>",typeof data,data.slice(0,2))
        // setMerchants(data);
      })
      .catch(error => console.log(error))
  }

  return (
    <View>
      <Text>This is the home screen</Text>
      <Button
        onPress={() => navigation.navigate('About')}
        title="Go to About"
      />
      <Button 
        onPress={() => getReq()}
        title="Make a get request"
      />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})
