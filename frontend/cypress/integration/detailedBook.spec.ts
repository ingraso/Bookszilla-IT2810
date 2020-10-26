describe("Detailed book", () => {
  it("Successfully displays", () => {
    cy.visit("/");

    cy.get("#1").click();

    cy.get("#book-details").contains("Favorite");
  });
});

export {};
