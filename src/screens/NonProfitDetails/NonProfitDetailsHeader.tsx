import { Box, Image, Text, VStack } from 'native-base';
import React, { useState } from 'react';
import { createAvatarFallbackText } from '../../utils/string';

interface Props {
  logo: string | null;
  name: string;
  address: string;
  overview: string;
}

export const NonProfitDetailsHeader: React.FC<Props> = ({
  logo,
  name,
  address,
  overview,
}) => {
  const [showMore, setShowMore] = useState(false);
  const shouldSlicedOverview = overview.length > 120;
  const slicedOverview = shouldSlicedOverview
    ? `${overview.slice(0, 120)}... `
    : overview;
  const description = showMore ? `${overview} ` : slicedOverview;

  return (
    <VStack>
      <Box>
        <Box alignItems="center">
          {logo ? (
            <Image
              source={{ uri: logo || undefined }}
              alt="logo"
              width="112"
              height="112"
              bgColor="gray.100"
            />
          ) : (
            <Box
              borderRadius="md"
              flex={1}
              width="112"
              height="112"
              bgColor="gray.100"
              justifyContent="center"
              alignItems="center"
            >
              <Text fontSize="4xl" color="gray.400">
                {createAvatarFallbackText(name)}
              </Text>
            </Box>
          )}
        </Box>
        <Box alignItems="center" px={5}>
          <Text
            bold
            fontSize="2xl"
            textAlign="center"
            pt={6}
            pb={2}
            lineHeight={28}
          >
            {name}
          </Text>
          {!!address && (
            <Text color="gray.400" fontSize="md">
              {address}
            </Text>
          )}
          <Box w="100%" borderWidth={0.5} borderColor="gray.300" my={5} />
        </Box>
      </Box>
      {!!overview && (
        <Box px={5} pb={5}>
          <Text bold fontSize="lg" pb={2}>
            Overview
          </Text>
          <Text fontSize={17} color="gray.500">
            <Text>{description}</Text>
            {shouldSlicedOverview && (
              <Text
                color="blue.400"
                numberOfLines={undefined}
                onPress={() => setShowMore(!showMore)}
              >
                {showMore ? 'Less' : 'More'}
              </Text>
            )}
          </Text>
        </Box>
      )}
      <Box px={5}>
        <Text fontSize="lg" pb={5} bold>
          Recent donations
        </Text>
      </Box>
    </VStack>
  );
};

export default NonProfitDetailsHeader;
