import { useQuery, gql } from "@apollo/client";

const GET_DATA = gql`
  query GetData {
  oftcreateds(first: 10) {
    id
    param0
    param1
    param2
    param3
    param4
    transactionHash
  }
  }
`;

export const useGraphQLQuery = () => {
  const { loading, error, data } = useQuery(GET_DATA);
  
  return { loading, error, data };
};