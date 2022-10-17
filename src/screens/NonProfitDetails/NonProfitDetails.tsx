import {
  NavigationProp,
  RouteProp,
  useNavigation,
} from '@react-navigation/native';
import {
  Avatar,
  Button,
  FlatList,
  HStack,
  Spinner,
  Text,
  VStack,
} from 'native-base';
import React, { useEffect, useState } from 'react';
import { ListRenderItem } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { fetchNonProfitsDetails } from '../../api/nonProfit.api';
import { INonProfitDetails } from '../../interfaces/nonProfit.interface';
import { RootStackParamsList } from '../../navigation/root.routing';
import { createAvatarFallbackText } from '../../utils/string';
import NonProfitDetailsHeader from './NonProfitDetailsHeader';
import { formatDistance } from 'date-fns';
import { donationSessionRequest } from '../../utils/request';

interface DonationDetails {
  name: string;
  amount: number;
  date: string;
}

interface Props {
  route: RouteProp<RootStackParamsList, 'NonProfitDetails'>;
}

export const NonProfitDetails: React.FC<Props> = ({ route }) => {
  const insets = useSafeAreaInsets();
  const id = route.params.id;
  console.log('🚀 ~ file: NonProfitDetails.tsx ~ line 39 ~ id', id);
  const [loading, setLoading] = useState(true);
  const [loadingDonation, setLoadingDonation] = useState(false);
  const [details, setDetails] = useState<INonProfitDetails>();
  const navigation = useNavigation<NavigationProp<RootStackParamsList>>();

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);

      if (id) {
        try {
          const response = await fetchNonProfitsDetails(id);
          setDetails(response.data.data);
        } catch (error) {
          console.log(error);
        }
      }
      setLoading(false);
    };
    fetch();
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  if (!details) {
    return <Text>Couldn't load the data</Text>;
  }

  const handleDonationPress = async () => {
    setLoadingDonation(true);
    try {
      const response = await donationSessionRequest.post('/donation-sessions', {
        organisationId: details.id,
        language: 'en-GB',
        currency: 'CHF',
        userId: 'sandbox_user_000000CTgmzOgdxoLq1ad9M0QWYr2',
      });

      console.log(
        '🚀 ~ file: NonProfitDetails.tsx ~ line 80 ~ handleDonationPress ~ response.data.data.url',
        response.data.data,
      );

      navigation.navigate('NonProfitDetailsSession', {
        uri: response.data.data.url,
      });
    } catch (error) {
      console.log(error);
    }
    setLoadingDonation(false);
  };

  const renderItem: ListRenderItem<DonationDetails> = ({ item }) => {
    return (
      <VStack>
        <HStack pl={5} pb={5}>
          <Avatar mr={3}>{createAvatarFallbackText(item.name)}</Avatar>
          <VStack>
            <Text bold fontSize="md">
              Donated ${item.amount} USD
            </Text>
            <Text color="gray.400">
              {item.name} •{' '}
              {formatDistance(new Date(item.date), new Date(), {
                addSuffix: true,
              })}
            </Text>
          </VStack>
        </HStack>
      </VStack>
    );
  };

  const keyExtractor = (item: DonationDetails) => item.name;

  const { logo, name, description, address } = details;

  return (
    <>
      <FlatList
        data={[{ name: 'asdf', amount: 5, date: '2022-10-13T12:26:14Z' }]}
        ListHeaderComponent={
          <NonProfitDetailsHeader
            logo={logo}
            name={name}
            overview={description}
            address={address}
          />
        }
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
      <Button
        _pressed={{ opacity: 0.8 }}
        onPress={handleDonationPress}
        position="absolute"
        left={5}
        right={5}
        bottom={insets.bottom + 16}
        bgColor="blue.700"
        size="lg"
        borderRadius="xl"
        _text={{ fontWeight: 'bold' }}
        isLoading={loadingDonation}
      >
        Donate
      </Button>
    </>
  );
};
