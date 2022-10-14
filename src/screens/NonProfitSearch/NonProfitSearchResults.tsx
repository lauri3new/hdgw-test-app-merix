import React from 'react';
import { Avatar, Box, FlatList, HStack, Text, VStack } from 'native-base';
import { INonProfit } from '../../interfaces/nonProfit';
import { ListRenderItem, StyleSheet } from 'react-native';

interface Props {
  data: Array<INonProfit>;
}

export const NonProfitSearchResults: React.FC<Props> = ({ data }) => {
  const renderItem: ListRenderItem<INonProfit> = ({ item, index }) => {
    const splitName = item.name.split(' ');
    const isLast = index === data.length - 1;
    const fallback = splitName
      .map(name => name[0])
      .join('')
      .slice(0, 2)
      .toLocaleUpperCase();
    return (
      <>
        <HStack
          ml={5}
          py={3}
          borderBottomWidth={isLast ? 0 : StyleSheet.hairlineWidth}
          borderBottomColor="gray.300"
        >
          <Avatar
            bg="gray.100"
            mr={2}
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
      </>
    );
  };

  const renderListFooter = () => <Box py={10} />;

  const renderListEmpty = () => (
    <VStack px={5}>
      <Text py={5} textAlign="center" color="gray.400">
        No results
      </Text>
    </VStack>
  );

  const keyExtractor = (item: INonProfit) => item.id;

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ListFooterComponent={renderListFooter}
      ListEmptyComponent={renderListEmpty}
    />
  );
};
