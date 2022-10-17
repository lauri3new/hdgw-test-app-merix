import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NonProfitSearch } from '../screens/NonProfitSearch/NonProfitSearch';
import { NonProfitDetails } from '../screens/NonProfitDetails/NonProfitDetails';
import NonProfitDetailsSession from '../screens/NonProfitDetails/NonProfitDetailsSession';

export type RootStackParamsList = {
  NonProfitSearch: undefined;
  NonProfitDetails: { id: string };
  NonProfitDetailsSession: { uri: string };
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
      <Stack.Screen
        name="NonProfitDetailsSession"
        component={NonProfitDetailsSession}
        options={{
          headerShown: true,
          headerShadowVisible: false,
          headerTitle: '',
        }}
      />
    </Stack.Navigator>
  );
};
