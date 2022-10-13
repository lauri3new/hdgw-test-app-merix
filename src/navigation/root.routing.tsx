import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NonProfitSearch } from '../screens/NonProfitSearch/NonProfitSearch';

const Stack = createNativeStackNavigator();

export const RootRouting = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="NonProfitSearch" component={NonProfitSearch} />
    </Stack.Navigator>
  );
};
