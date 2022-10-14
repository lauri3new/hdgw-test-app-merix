import React, { useEffect, useRef, useState } from 'react';
import {
  Input,
  SearchIcon,
  Heading,
  IconButton,
  DeleteIcon,
  Container,
  useSafeArea,
} from 'native-base';
import { request } from '../../utils/request';
import { INonProfit } from '../../interfaces/nonProfit';
import debounce from 'lodash.debounce';
import { NonProfitSearchResults } from './NonProfitSearchResults';
import { TextInput } from 'react-native';

export const NonProfitSearch = () => {
  const [query, setQuery] = useState('');
  const [data, setData] = useState<Array<INonProfit>>([]);
  const debouncedHandleChange = debounce((text: string) => setQuery(text), 200);
  const inputRef = useRef<TextInput>();
  const safeAreaProps = useSafeArea({ safeAreaTop: true });

  const clearInput = () => {
    setQuery('');
    inputRef.current?.clear();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await request.get('/organisations', {
          params: { query },
        });
        setData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (query) {
      fetchData();
    } else {
      setData([]);
    }
  }, [query]);

  return (
    <>
      <Container px="5" maxWidth="100%" {...safeAreaProps}>
        <Heading size="2xl" pt="10" pb="5">
          Send donations to any nonprofit worldwide.
        </Heading>
        <Input
          ref={inputRef}
          InputLeftElement={<SearchIcon size={5} ml="2" color="black" />}
          InputRightElement={
            query ? (
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
          onChangeText={debouncedHandleChange}
        />
      </Container>
      <NonProfitSearchResults data={data} />
    </>
  );
};
