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
import firestore from '@react-native-firebase/firestore';
import { fetchNonProfitsDetails } from '../../api/nonProfit.api';
import { INonProfitDetails } from '../../interfaces/nonProfit.interface';
import { RootStackParamsList } from '../../navigation/root.routing';
import { createAvatarFallbackText } from '../../utils/string';
import NonProfitDetailsHeader from './NonProfitDetailsHeader';
import { formatDistance } from 'date-fns';
import { donationSessionRequest } from '../../utils/request';
import { TEST_USER_ID } from '../../utils/consts';

interface DonationDetails {
  id: string;
  name?: string;
  amount: number;
  date: string;
  currencyCode: string;
}

interface Props {
  route: RouteProp<RootStackParamsList, 'NonProfitDetails'>;
}

export const NonProfitDetails: React.FC<Props> = ({ route }) => {
  const insets = useSafeAreaInsets();
  const id = route.params.id;
  const [loading, setLoading] = useState(true);
  const [loadingDonation, setLoadingDonation] = useState(false);
  const [details, setDetails] = useState<INonProfitDetails>();
  const navigation = useNavigation<NavigationProp<RootStackParamsList>>();
  const [donations, setDonations] = useState<Array<DonationDetails>>([]);
  console.log(
    '🚀 ~ file: NonProfitDetails.tsx ~ line 46 ~ donations',
    donations,
  );

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

  useEffect(() => {
    const subscriber = firestore()
      .collection('donation')
      .where('data.eventData.organisationId', '==', id)
      .onSnapshot(querySnapshot => {
        const data = querySnapshot.docs.map(doc => {
          console.log(
            '🚀 ~ file: NonProfitDetails.tsx ~ line 77 ~ data ~ doc.data().data',
            doc.data().data,
          );
          const item = doc.data().data;
          return {
            id: doc.id,
            name: item.eventData?.firstName || 'Anonymous',
            amount: item.eventData?.amount,
            date: item.eventData?.createdAt,
            currencyCode: item.eventData.currencyCode,
          };
        });
        console.log(
          '🚀 ~ file: NonProfitDetails.tsx ~ line 85 ~ data ~ data',
          data,
        );

        setDonations(data);
      });

    return () => subscriber();
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
        userId: TEST_USER_ID,
      });

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
          <Avatar mr={3}>{createAvatarFallbackText(item?.name || '-')}</Avatar>
          <VStack>
            <Text bold fontSize="md">
              Donated {(item.amount / 100).toFixed(2)} {item.currencyCode}
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

  const keyExtractor = (item: DonationDetails, index: number) =>
    `${item?.name}-${index}`;

  const { logo, name, description, address } = details;

  return (
    <>
      <FlatList
        data={donations}
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
        ListEmptyComponent={<Text textAlign={'center'}>No donations yet</Text>}
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
