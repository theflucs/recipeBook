import { Option, Recipe } from "../../src/types/api";

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

describe('ensure getRecipes API call is made with correct query parameters', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/recipes**').as('getRecipes');
    cy.visit('/');
  });

  it('should get recipes with the correct query parameters', () => {
    cy.wait('@getRecipes').then((interception) => {
      expect(interception).to.not.be.undefined;
      expect(interception.request.url).to.include('_page=0');
      expect(interception.request.url).to.include('_limit=6');
      expect(interception.request.url).to.include('_expand[]=cuisine');
      expect(interception.request.url).to.include('_expand[]=difficulty');
      expect(interception.request.url).to.include('_expand[]=diet');

      if (interception.response) {
        expect(interception.response.statusCode).to.be.oneOf([200, 304]);

        if (interception.response.statusCode === 200) {
          expect(interception.response.body).to.be.an('array').and.not.empty;
          interception.response.body.forEach((recipe: Recipe) => {
            expect(recipe).to.have.property('id').that.is.a('string').and.not.empty;
            expect(recipe).to.have.property('name').that.is.a('string').and.not.empty;
            expect(recipe).to.have.property('ingredients').that.is.an('array');
            expect(recipe).to.have.property('instructions').that.is.a('string').and.not.empty;
            expect(recipe).to.have.property('cuisineId').that.is.a('string').and.not.empty;
            expect(recipe).to.have.property('dietId').that.is.a('string').and.not.empty;
            expect(recipe).to.have.property('difficultyId').that.is.a('string').and.not.empty;
            expect(recipe).to.have.property('image').that.is.a('string').and.not.empty;
          });
        }
      }
    });
  });
});

describe('Ensure all filters API calls are made when visiting the homepage', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/recipes?_page=0&_limit=6&_expand[]=cuisine&_expand[]=difficulty&_expand[]=diet').as('getRecipes');
    cy.intercept('GET', '**/cuisines').as('getCuisines');
    cy.intercept('GET', '**/difficulties').as('getDifficulties');
    cy.intercept('GET', '**/diets').as('getDiets');
    cy.visit('/');
  });

  it('should get cuisines successfully', () => {
    cy.wait('@getCuisines').then((interception) => {
      expect(interception).to.not.be.undefined;

      if (interception.response) {
        expect(interception.response.statusCode).to.be.oneOf([200, 304]);

        if (interception.response.statusCode === 200) {
          expect(interception.response.body).to.be.an('array').and.not.empty;
          interception.response.body.forEach((cuisine: Option) => {
            expect(cuisine).to.have.property('id').that.is.a('string').and.not.empty;
            expect(cuisine).to.have.property('name').that.is.a('string').and.not.empty;
          });
        }
      }
    });
  });

  it('should get difficulties successfully', () => {
    cy.wait('@getDifficulties').then((interception) => {
      expect(interception).to.not.be.undefined;

      if (interception.response) {
        expect(interception.response.statusCode).to.be.oneOf([200, 304]);

        if (interception.response.statusCode === 200) {
          expect(interception.response.body).to.be.an('array').and.not.empty;
          interception.response.body.forEach((difficulty: Option) => {
            expect(difficulty).to.have.property('id').that.is.a('string').and.not.empty;
            expect(difficulty).to.have.property('name').that.is.a('string').and.not.empty;
          });
        }
      }
    });
  });

  it('should get diets successfully', () => {
    cy.wait('@getDiets').then((interception) => {
      expect(interception).to.not.be.undefined;

      if (interception.response) {
        expect(interception.response.statusCode).to.be.oneOf([200, 304]);

        if (interception.response.statusCode === 200) {
          expect(interception.response.body).to.be.an('array').and.not.empty;
          interception.response.body.forEach((diet: Option) => {
            expect(diet).to.have.property('id').that.is.a('string').and.not.empty;
            expect(diet).to.have.property('name').that.is.a('string').and.not.empty;
          });
        }
      }
    });
  });
});
