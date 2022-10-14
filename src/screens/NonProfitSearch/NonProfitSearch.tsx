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
import { INonProfit } from '../../interfaces/nonProfit.interface';
import debounce from 'lodash.debounce';
import { NonProfitSearchResults } from './NonProfitSearchResults';
import { TextInput } from 'react-native';
import { fetchNonProfits } from '../../api/nonProfit.api';

export const NonProfitSearch = () => {
  const [query, setQuery] = useState('');
  const [data, setData] = useState<Array<INonProfit>>([]);
  const [page, setPage] = useState(1);
  const [resultsTotal, setResultsTotal] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const debouncedHandleChange = debounce((text: string) => setQuery(text), 200);
  const inputRef = useRef<TextInput>();
  const safeAreaProps = useSafeArea({ safeAreaTop: true });

  const clearInput = () => {
    setQuery('');
    inputRef.current?.clear();
  };

  const fetchNextPage = async () => {
    setLoadingMore(true);
    try {
      const response = await fetchNonProfits({
        query,
        page: page + 1,
      });
      setPage(page + 1);
      setData(d => [...d, ...response.data.data]);
    } catch (error) {
      console.log(error);
    }
    setLoadingMore(false);
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await fetchNonProfits({
          query,
          page: 1,
        });
        setPage(1);
        setData(response.data.data);
        setResultsTotal(response.data.totalResults);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    if (query) {
      setLoading(true);
      fetch();
    } else {
      setData([]);
      setLoading(false);
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
      <NonProfitSearchResults
        data={data}
        loading={loading}
        fetchNextPage={fetchNextPage}
        loadingMore={loadingMore}
        resultsTotal={resultsTotal}
      />
    </>
  );
};
