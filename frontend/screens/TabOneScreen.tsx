import * as React from 'react';
import { StyleSheet, Button } from 'react-native';

// seems unnecessary 
// import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

  const ip =  "192.168.1.151";
  const getDrawings = () => {
    console.log("Will fetch from graphql, need to use apollo");
    
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <Text>This one will serve as my home screen</Text>
      <Text>All the drawings will load here, with the option to filter according to the objects drawn</Text>
      <Button onPress={getDrawings} title="get drawings"></Button>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {/* <EditScreenInfo path="/screens/TabOneScreen.tsx" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
