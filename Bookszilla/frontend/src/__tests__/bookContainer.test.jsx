import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../redux/store";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BookContainer } from "../containers/BookContainer";
/**
 * This is a unit test that checks if the phonePage state is "home" to
 * begin with, by checking that BookContainer has a className "home".
 */
describe("<BookContainer/>", () => {
  it("should have class 'home'", async () => {
    const client = new ApolloClient({
      uri: "http://localhost:3002/book",
      cache: new InMemoryCache(),
    });
    const { getByTestId } = render(
      <ApolloProvider client={client}>
        <Provider store={store}>
          <React.StrictMode>
            <BookContainer />
          </React.StrictMode>
        </Provider>
      </ApolloProvider>
    );
    const bookDetails = getByTestId("book-container");
    expect(bookDetails).toHaveClass("home");
  });
});
