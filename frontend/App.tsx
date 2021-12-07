import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { 
  ApolloClient, 
  InMemoryCache, 
  ApolloProvider 
} from '@apollo/client';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';


// const client = new ApolloClient({
//   uri: '192.168.1.151:3001/graphql',
//   cache: new InMemoryCache()
// });


export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        {/* <ApolloProvider client={client}> */}
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        {/* </ApolloProvider> */}
      </SafeAreaProvider>
    );
  }
}
