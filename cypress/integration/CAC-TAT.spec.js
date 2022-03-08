// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types="Cypress" />

describe("Central de Atendimento ao Cliente TAT", function () {
  beforeEach(() => {
    cy.visit("./src/index.html");
  });
  it("verifica o título da aplicação", function () {
    cy.title().should("be.eq", "Central de Atendimento ao Cliente TAT");
  });

  it("preenche os campos obrigatórios e envia o formulário", function () {
    cy.get("#firstName").type("Maria Eduarda");
    cy.get("#lastName").type("Fantuci");
    cy.get("#email").type("exemplo@exemplo.com");
    const longtext =
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam architecto deserunt in recusandae facere, tempora repellat nisi accusantium atque asperiores aliquam unde magnam esse tempore sed quisquam, voluptate officiis eligendi.Ut rem itaque quo, quibusdam necessitatibus perferendis asperiores voluptatum excepturi veritatis voluptas illum repellendus, facere nesciunt suscipit explicabo exercitationem, eos adipisci sit veniam similique nihil. Esse nulla magni minus officia? Optio hic ullam debitis ipsam odio asperiores officiis incidunt. Quasi iusto cumque similique veniam, omnis non voluptatum cupiditate perspiciatis repellat veritatis corrupti aperiam aut! Aspernatur atque voluptas dolorum quibusdam expedita.";
    cy.get("#open-text-area").type(longtext, { delay: 0 });
    cy.get('button[type="submit"]').click();

    cy.get(".success").should("be.visible");
  });

  it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", function () {
    cy.get("#firstName").type("Maria Eduarda");
    cy.get("#lastName").type("Fantuci");
    cy.get("#email").type("exemplo.exemplo.com");
    cy.get("#open-text-area").type("teste");
    cy.get('button[type="submit"]').click();
    cy.get(".error").should("be.visible");
  });

  it("Campo telefone continua vazio quando preenchido com valor alfa-numérico", function () {
    cy.get("#phone").type("eeessa").should("have.value", "");
  });

  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", function () {
    cy.get("#firstName").type("Maria Eduarda");
    cy.get("#lastName").type("Fantuci");
    cy.get("#email").type("exemplo.exemplo.com");
    cy.get("#open-text-area").type("teste");
    cy.get("#phone-checkbox").click();
    cy.get('button[type="submit"]').click();
    cy.get(".error").should("be.visible");
  });

  it("preenche e limpa os campos nome, sobrenome, email e telefone", function () {
    cy.get("#firstName")
      .type("Maria Eduarda")
      .should("have.value", "Maria Eduarda")
      .clear()
      .should("have.value", "");
    cy.get("#lastName")
      .type("Fantuci")
      .should("have.value", "Fantuci")
      .clear()
      .should("have.value", "");
    cy.get("#email")
      .type("exemplo@exemplo.com")
      .should("have.value", "exemplo@exemplo.com")
      .clear()
      .should("have.value", "");
    cy.get("#phone")
      .type("99999999")
      .should("have.value", "99999999")
      .clear()
      .should("have.value", "");
  });

  it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", function () {
    cy.get('button[type="submit"]').click();
    cy.get(".error").should("be.visible");
  });

  it("envia o formuário com sucesso usando um comando customizado", function () {
    cy.fillMandatoryFieldsAndSubmit();
    cy.get(".success").should("be.visible");
  });

  it("Utilizando o contains para selecionar o button", function () {
    cy.fillMandatoryFieldsAndSubmit();
    cy.contains("button", "Enviar");
  });
  it("seleciona um produto (YouTube) por seu texto", function () {
    cy.get("#product").select("YouTube").should("have.value", "youtube");
  });

  it("seleciona um produto (Mentoria) por seu valor (value)", function () {
    cy.get("#product").select("mentoria").should("have.value", "mentoria");
  });
  it("seleciona um produto (Blog) por seu índice", function () {
    cy.get("#product").select(1).should("have.value", "blog");
  });
  it("seleciona um produto (Blog) por seu índice", function () {
    cy.get("input[type='radio'][value='feedback']")
      .check()
      .should("be.checked");
  });
  it("marca cada tipo de atendimento", function () {
    cy.get('input[type="radio"]')
      .should("have.length", 3)
      .each(function ($radio) {
        cy.wrap($radio).check();
        cy.wrap($radio).should("be.checked");
      });
  });
  it("Marca ambos checkboxes, depois desmarca o último", function () {
    cy.get('input[type="checkbox"]')
      .check()
      .should("be.checked")
      .last()
      .uncheck()
      .should("not.be.checked");
  });
  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", function () {
    cy.fillMandatoryFieldsAndSubmit();
    cy.get("#phone-checkbox").check();
    cy.get('button[type="submit"]').click();
    cy.get(".error").should("be.visible");
  });
  it("seleciona um arquivo da pasta fixtures", function () {
    cy.get("#file-upload")
      .should("not.have.value")
      .selectFile("./cypress/fixtures/example.json")
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal("example.json");
      });
  });
  it("seleciona um arquivo simulando um drag-and-drop", function () {
    cy.get("#file-upload")
      .should("not.have.value")
      .selectFile("./cypress/fixtures/example.json", { action: "drag-drop" })
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal("example.json");
      });
  });
  it("seleciona um arquivo utilizando uma fixture para a qual foi dada um alias", function () {
    cy.fixture("example.json").as("simpleFile");
    cy.get("#file-upload")
      .selectFile("@simpleFile")
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal("example.json");
      });
  });
  it("verifica que a política de privacidade abre em outra aba sem a necessidade de um clique", function () {
    cy.get("a").should("have.attr", "target", "_blank");
  });
  it("acessa a página da política de privacidade removendo o target e então clicando no link", function () {
    cy.get("a").invoke("removeAttr", "target").click();
    cy.contains("Talking About Testing").should("be.visible");
  });

  it.only("exibe mensagem por 3 segundos", function () {
    cy.clock(); // congela o relógio do navegador
    cy.fillMandatoryFieldsAndSubmit();
    cy.get("#phone-checkbox").check();
    cy.get('button[type="submit"]').click();
    cy.get(".error").should("be.visible");
    cy.tick(3000); 
    cy.get(".error").should("not.be.visible");
  });
});
