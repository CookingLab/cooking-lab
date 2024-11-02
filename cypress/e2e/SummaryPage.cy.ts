describe('Cooking Lab flow tests', () => {
  beforeEach(() => {
    navigateToSummary();
  })
  it('passes', () => {
    //Step1
    //TODO: For each test, simulate an edit of the corresponding step and check if the value is updated in the summary page
    cy.get('[data-testid="cypress-editStep1"]').click();
    cy.url().should('include', '/step1');
    cy.get('.bi-arrow-right-circle-fill').should('exist');
    cy.get('.bi-arrow-left-circle-fill').should('not.exist');
    cy.get('.bi-arrow-right-circle-fill').click();
    cy.url().should('include', '/summary');

    //Step2
    cy.get('[data-testid="cypress-editStep2"]').click();
    cy.url().should('include', '/step2');
    cy.get('.bi-arrow-right-circle-fill').should('exist');
    cy.get('.bi-arrow-left-circle-fill').should('not.exist');
    cy.get('.bi-arrow-right-circle-fill').click();
    cy.url().should('include', '/summary');

    //Step3
    cy.get('[data-testid="cypress-editStep3"]').click();
    cy.url().should('include', '/step3');
    cy.get('.bi-arrow-right-circle-fill').should('exist');
    cy.get('.bi-arrow-left-circle-fill').should('not.exist');
    cy.get('.bi-arrow-right-circle-fill').click();
    cy.url().should('include', '/summary');

    //Step4
    cy.get('[data-testid="cypress-editStep4"]').click();
    cy.url().should('include', '/step4');
    cy.get('.bi-arrow-right-circle-fill').should('exist');
    cy.get('.bi-arrow-left-circle-fill').should('not.exist');
    cy.get('.bi-arrow-right-circle-fill').click();
    cy.url().should('include', '/summary');
  })
})

function navigateToSummary(){
  cy.visit('http://localhost:3000/')
  cy.get('[data-testid="get-started-btn"]').click();
  //Step1
  cy.get('.cooking-lab-btn-option').first().click();
  cy.get('.bi-arrow-right-circle-fill').click();
  //Step2
  cy.get('.meal-type-btn').first().click();
  cy.get('.bi-arrow-right-circle-fill').click();
  //Step3
  cy.get('.bi-arrow-right-circle-fill').click();
  //Step4
  cy.get('.bi-arrow-right-circle-fill').click();

  cy.url().should('include', '/summary');
}
