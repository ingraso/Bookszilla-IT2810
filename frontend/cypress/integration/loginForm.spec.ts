/**
 * Recommended by Cypress
 * (https://docs.cypress.io/guides/guides/network-requests.html#Stub-Responses)
 * to have one true end-to-end test.
 */

describe("Login form", () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.sessionStorage.clear();
    });
  });

  it("Can type username and password", () => {
    cy.visit("/");

    cy.get("#sign-in-button").click();

    cy.get("input[name=username]")
      .focus()
      .type("myUsername")
      .should("have.value", "myUsername");

    cy.get("#password-input")
      .focus()
      .type("myPassword")
      .should("have.value", "myPassword");
  });

  it("Can successfully sign in and see username in profile", () => {
    cy.visit("/");

    cy.get("#sign-in-button").click();

    cy.get("#username-input").focus().type("test");

    cy.get("#password-input").focus().type(`test{enter}`);

    cy.get("header").should("contain", "PROFILE");

    cy.get("#profile").click();

    cy.get("body").should("contain", "test");

    cy.get("#sign-out-button").click();
  });

  it("Wrong username or password should respond in unsuccessful sign in", () => {
    cy.visit("/");

    cy.get("#sign-in-button").click();

    cy.get("#username-input").focus().type("hello");

    cy.get("#password-input").focus().type(`NOTworld{enter}`);

    cy.get("#popup").should("contain", "Invalid username or password");
  });
});

export {};
