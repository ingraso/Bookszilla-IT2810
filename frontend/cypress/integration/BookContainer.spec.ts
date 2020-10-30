import { BookContainer } from "../../src/Containers/BookContainer";
import * as mockData from "../../src/assets/book_data.json";
import { mount } from "cypress-react-unit-test";

/*describe("SearchField and Sort component", () => {
  it("it only displays books fitting the search parameters when clicked", () => {
    mount(<SearchField />);
    cy.get('@Button')
  });
});

describe("User component", () => {
  it("it shows a list of users", () => {
    const fakeResponse = [{ name: "John Doe" }, { name: "Kevin Mitnick" }];

    cy.stub(window, 'fetch').resolves({
      json: () => Promise.resolve(fakeResponse)
    })

    mount(<Users />)
    cy.get('li').should('have.length', 2)
    cy.contains('li', 'John Doe')
    cy.contains('li', 'Kevin Mitnick')
  });
  */