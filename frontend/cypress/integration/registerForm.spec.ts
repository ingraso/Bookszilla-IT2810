describe("Register form", () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.sessionStorage.clear();
    });
  });

  it("Can type username, password and password confirmation", () => {
    cy.visit("/");

    cy.get("#register-button").click();

    cy.get("#username-input")
      .focus()
      .type("myUsername")
      .should("have.value", "myUsername");

    cy.get("#password-input")
      .focus()
      .type("myPassword")
      .should("have.value", "myPassword");

    cy.get("#confirm-password-input")
      .focus()
      .type("myPassword")
      .should("have.value", "myPassword");
  });

  it("Password and confirm password not corresponding should respond in unsuccessful register", () => {
    cy.visit("/");

    cy.get("#register-button").click();

    cy.get("#username-input").focus().type("myUsername");

    cy.get("#password-input").focus().type("myPassword");

    cy.get("#confirm-password-input").focus().type(`NOTmyPassword`);

    cy.get("#user-submit").click();

    cy.get("#popup").should(
      "contain",
      "Password and Confirmed password do not match!"
    );
  });

  it("Not filling in all fields responds in unsuccessful register", () => {
    cy.visit("/");

    cy.get("#register-button").click();

    cy.get("#password-input").focus().type("myPassword");

    cy.get("#confirm-password-input").focus().type(`myPassword`);

    cy.get("#user-submit").click();

    cy.get("#popup").should("contain", "Please fill out all fields.");
  });
});

export {};
