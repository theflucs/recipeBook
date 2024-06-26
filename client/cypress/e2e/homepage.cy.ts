describe('initial ui elements render', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it("should display the correct app title", () => {
    cy.title().should("include", "Recipe Book");
  });
  it("should have the correct homepage title", () => {
    cy.get('#homepage-title').should('be.visible');
  });
  it("should have the correct homepage subtitle", () => {
    cy.get('#homepage-subtitle').should('be.visible');
  });
  it('should display the search input field', () => {
    cy.get('#search-bar').should('be.visible');
  });

  it('should display the "Reset Filters" button', () => {
    cy.get('#reset-filters-button')
      .contains('Reset Filters')
      .should('be.visible');
  });
});

});
