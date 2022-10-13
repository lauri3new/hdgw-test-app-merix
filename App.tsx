import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { RootRouting } from './src/navigation/root.routing';
import { NativeBaseProvider } from 'native-base';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

const App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer theme={MyTheme}>
        <RootRouting />
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
