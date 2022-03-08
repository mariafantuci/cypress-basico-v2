Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function () {
    cy.get("#firstName").type("Maria Eduarda");
    cy.get("#lastName").type("Fantuci");
    cy.get("#email").type("exemplo@exemplo.com");
    cy.get("#open-text-area").type("teste");
    cy.get('button[type="submit"]').click();
})