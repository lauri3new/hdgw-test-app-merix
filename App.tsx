import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootRouting } from './src/navigation/root.routing';

const App = () => {
  return (
    <NavigationContainer>
      <RootRouting />
    </NavigationContainer>
  );
};

export default App;
