// Remove this test if no further functionality is added
describe("Filter", () => {
  it("Checkbox should be checked", () => {
    cy.visit("/");

    cy.get("#language-eng").click();
  });
});

export {};
