import React, { useState } from 'react';
import {
  Input,
  SearchIcon,
  Heading,
  IconButton,
  DeleteIcon,
  Container,
} from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';

export const NonProfitSearch = () => {
  const [value, setValue] = useState('');

  const handleChange = (text: string) => setValue(text);
  const clearInput = () => setValue('');

  return (
    <SafeAreaView>
      <Container px="5" maxWidth="100%">
        <Heading size="2xl" pt="10" pb="5">
          Send donations to any nonprofit worldwide.
        </Heading>
        <Input
          value={value}
          InputLeftElement={<SearchIcon size={5} ml="2" color="black" />}
          InputRightElement={
            value ? (
              <IconButton
                icon={<DeleteIcon color="gray.400" />}
                onPress={clearInput}
              />
            ) : undefined
          }
          placeholder="Search for a nonprofit"
          h="12"
          borderRadius="lg"
          variant="filled"
          bgColor="gray.100"
          focusOutlineColor="black"
          borderWidth="1.5"
          fontSize="md"
          onChangeText={handleChange}
        />
      </Container>
    </SafeAreaView>
  );
};
