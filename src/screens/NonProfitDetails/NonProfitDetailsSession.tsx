import { RouteProp } from '@react-navigation/native';
import React from 'react';
import { WebView } from 'react-native-webview';
import { RootStackParamsList } from '../../navigation/root.routing';

interface Props {
  route: RouteProp<RootStackParamsList, 'NonProfitDetailsSession'>;
}

const NonProfitDetailsSession: React.FC<Props> = ({ route }) => {
  const uri = route.params.uri;

  return <WebView source={{ uri }} startInLoadingState enableApplePay />;
};

export default NonProfitDetailsSession;
