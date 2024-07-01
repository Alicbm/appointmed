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
import { AuthProvider } from "./AuthContext/index.tsx";

const httpLink = new HttpLink({ uri: "http://localhost:3000/graphql" });

const authLink = new ApolloLink((operation, forward) => {
  const auth = localStorage.getItem("AUTH_TOKEN_APPOINTMED");
  const data = auth !== null && JSON.parse(auth)

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      Authorization: 'Bearer ' + data?.access_token,
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
      <AuthProvider>
        <App />
      </AuthProvider>
    </ApolloProvider>
  </React.StrictMode>
);
