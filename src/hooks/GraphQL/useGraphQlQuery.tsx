import { useQuery, gql } from "@apollo/client";

const GET_DATA = gql`
  query GetData {
    oftcreateds(first: 5) {
      id
      tokenAddress
      name
      symbol
      eids
      deployId
    }
  }
`;

export const useGraphQLQuery = () => {
  const { loading, error, data } = useQuery(GET_DATA);
  return { loading, error, data };
};
