import React from 'react';
import {
  Avatar,
  Box,
  FlatList,
  HStack,
  Spinner,
  Text,
  VStack,
} from 'native-base';
import { INonProfit } from '../../interfaces/nonProfit';
import { ListRenderItem, StyleSheet } from 'react-native';

interface Props {
  data: Array<INonProfit>;
  loading: boolean;
  loadingMore: boolean;
  fetchNextPage: (reset?: boolean) => void;
  resultsTotal?: number;
}

export const NonProfitSearchResults: React.FC<Props> = ({
  data,
  loading,
  fetchNextPage,
  loadingMore,
  resultsTotal,
}) => {
  const renderItem: ListRenderItem<INonProfit> = ({ item, index }) => {
    const splitName = item.name.split(' ');
    const isLast = index === data.length - 1;
    const fallback = splitName
      .map(name => name[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
    return (
      <HStack
        ml={5}
        py={3}
        borderBottomWidth={isLast ? 0 : StyleSheet.hairlineWidth}
        borderBottomColor="gray.300"
        alignItems="center"
      >
        <Avatar
          bg="gray.100"
          mr={2}
          borderRadius="sm"
          source={{ uri: item.logo }}
          _text={{ color: 'gray.400' }}
        >
          {fallback}
        </Avatar>
        <VStack flex={1} pr={2}>
          <Text noOfLines={1} bold>
            {item.name}
          </Text>
          <Text fontSize="xs" color="gray.400">
            {item.address || 'No address data'}
          </Text>
        </VStack>
      </HStack>
    );
  };

  const renderListHeader = () => {
    return loading ? <Spinner pt={2.5} /> : null;
  };

  const renderListFooter = () => {
    return (
      <>
        {loadingMore && <Spinner pt={2.5} />}
        <Box py={10} />
      </>
    );
  };

  const renderListEmpty = () =>
    !loading ? (
      <VStack px={5}>
        <Text py={5} textAlign="center" color="gray.400">
          No results
        </Text>
      </VStack>
    ) : null;

  const keyExtractor = (item: INonProfit) => item.id;

  const onEndReached = () => {
    if (
      !loading &&
      !loadingMore &&
      !!resultsTotal &&
      resultsTotal > data.length
    ) {
      fetchNextPage();
    }
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ListFooterComponent={renderListFooter}
      ListEmptyComponent={renderListEmpty}
      ListHeaderComponent={renderListHeader}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.4}
    />
  );
};
