import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NonProfitSearch } from '../screens/NonProfitSearch/NonProfitSearch';
import { NonProfitDetails } from '../screens/NonProfitDetails/NonProfitDetails';

export type RootStackParamsList = {
  NonProfitSearch: undefined;
  NonProfitDetails: { id: string };
};

const Stack = createNativeStackNavigator<RootStackParamsList>();

export const RootRouting = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="NonProfitSearch"
        component={NonProfitSearch}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NonProfitDetails"
        component={NonProfitDetails}
        options={{
          headerShown: true,
          headerShadowVisible: false,
          headerTitle: '',
        }}
      />
    </Stack.Navigator>
  );
};
