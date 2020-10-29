import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./redux/store";
import * as serviceWorker from "./serviceWorker";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import InitData from "./assets/initializeData";

const client = new ApolloClient({
  uri: "http://localhost:3002/book",
  cache: new InMemoryCache(),
});

//Only true if there is no data in the database, and you wish to initialize the data.
let initializeData: boolean = false;
const falseInitializeData = () => {
  initializeData = false;
};

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <React.StrictMode>
        <InitData
          initializeData={initializeData}
          falseInitializeData={falseInitializeData}
        />
        <App />
      </React.StrictMode>
    </Provider>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
