import { request } from '../utils/request';

export const fetchNonProfits = async (params: {
  query: string;
  page: number;
}) => {
  const response = await request.get('/organisations', {
    params,
  });

  return response;
};

export const fetchNonProfitsDetails = async (id: string) => {
  const response = await request.get(`/organisations/${id}`);

  return response;
};
