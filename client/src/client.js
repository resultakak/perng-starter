import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { AUTH_TOKEN, GRAPHQL_URL } from "./components/constants";

const httpLink = createHttpLink({
  uri: GRAPHQL_URL,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  fetchOptions: {
    mode: "no-cors",
  },
  cache: new InMemoryCache(),
  name: "DemoSite",
  version: "1.0",
});

export default client;
