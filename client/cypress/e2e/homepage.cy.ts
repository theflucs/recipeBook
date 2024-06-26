describe("Check app title", () => {
  it("should have the correct app title", () => {
    cy.visit('/')
    cy.title().should("include", "Recipe Book");
  });
});
