import React from "react";
import ReactDOM from "react-dom/client";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
  HttpLink,
  from,
} from "@apollo/client";
import { App } from "./App/App.tsx";
import "./index.css";

const httpLink = new HttpLink({ uri: "http://localhost:3000/graphql" });

const authLink = new ApolloLink((operation, forward) => {
  const auth = localStorage.getItem("AUTH_TOKEN_APPOINTMED");

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      Authorization: 'Bearer ' + auth,
    },
  }));

  return forward(operation);
});

const client = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
