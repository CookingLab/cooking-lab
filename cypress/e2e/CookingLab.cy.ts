import { MEAL_TYPES, STEP1_CUISINES, STEP1_RANDOM } from '../../src/i18n/constants';

describe('Cooking Lab flow tests', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')
    //Intro message
    cy.get('[data-testid="intro-title"]').should('exist');
    cy.get('[data-testid="intro-motto"]').should('exist');
    cy.get('[data-testid="intro-welcome"]').should('exist');
    cy.get('[data-testid="intro-objective"]').should('exist');
    cy.get('[data-testid="get-started-btn"]').should('exist');
    cy.get('[data-testid="footer-copyright"]').should('exist');
    cy.get('[data-testid="tm-id"]').should('exist');
    cy.get('[data-testid="tc-id"]').should('exist');

    //Step1
    cy.get('[data-testid="get-started-btn"]').should('exist').click();
    cy.url().should('include', '/step1');

    cy.get('[data-testid="step1-title"]').should('exist');
    cy.get('[data-testid="step1-description"]').should('exist');
    STEP1_CUISINES.forEach(cuisine => {
      cy.get('button').contains(cuisine).should('be.visible');
    });
    cy.get('button').contains(STEP1_RANDOM).should('be.visible');

    cy.get('.bi-arrow-right-circle-fill').should('not.exist');
    cy.get('.bi-arrow-left-circle-fill').should('not.exist');
    cy.get('.cooking-lab-btn-option').first().click();
    cy.get('.bi-arrow-right-circle-fill').should('exist');

    //Step2
    cy.get('.bi-arrow-right-circle-fill').click();
    cy.url().should('include', '/step2');

    cy.get('[data-testid="step2-title"]').should('exist');
    cy.get('[data-testid="step2-description"]').should('exist');
    MEAL_TYPES.forEach(meal => {
      cy.get('button').contains(meal.label).should('be.visible');
    });

    cy.get('.bi-arrow-right-circle-fill').should('not.exist');
    cy.get('.bi-arrow-left-circle-fill').should('exist');
    cy.get('.meal-type-btn').first().click();
    cy.get('.bi-arrow-right-circle-fill').should('exist');

    //Step3
    cy.get('.bi-arrow-right-circle-fill').click();
    cy.url().should('include', '/step3');

    cy.get('[data-testid="step3-title"]').should('exist');
    cy.get('[data-testid="step3-optional"]').should('exist');
    cy.get('[data-testid="step3-description"]').should('exist');

    cy.get('.bi-arrow-right-circle-fill').should('exist');
    cy.get('.bi-arrow-left-circle-fill').should('exist');
    cy.get('.dropdown-toggle').click();
    cy.get('.dropdown-item').first().click();
    cy.get('.list-group').contains('balanced');
    cy.get('[data-testid="cypress-clear-btn"]').should('exist');
    cy.get('[data-testid="cypress-clear-btn"]').click();
    cy.get('.list-group').children().should('have.length', 0);

    //Step4
    cy.get('.bi-arrow-right-circle-fill').click();
    cy.url().should('include', '/step4');

    cy.get('[data-testid="step4-title"]').should('exist');
    cy.get('[data-testid="step4-optional"]').should('exist');
    cy.get('[data-testid="step4-description"]').should('exist');

    cy.get('.bi-arrow-right-circle-fill').should('exist');
    cy.get('.bi-arrow-left-circle-fill').should('exist');

    cy.get('[data-testid="cypress-allergies"]').click();
    cy.get('[data-testid="cypress-allergies-menu"]').first().click();
    cy.get('[data-testid="cypress-restrictions"]').click();
    cy.get('[data-testid="cypress-restrictions-menu"]').first().click();

    //Summary
    cy.get('.bi-arrow-right-circle-fill').click();
    cy.url().should('include', '/summary');

    //TODO: Check for labels
    

    //Recipe
    cy.get('[data-testid="cypress-getRecipe"]').should('exist');
    cy.get('[data-testid="cypress-getRecipe"]').click();
    cy.url().should('include', '/recipe');

    //TODO: Check for labels

    //Restart
    cy.get('[data-testid="cypress-restart-btn"]').should('exist');
    cy.get('[data-testid="cypress-restart-btn"]').click();
    cy.url().should('include', '/');
  })
})
