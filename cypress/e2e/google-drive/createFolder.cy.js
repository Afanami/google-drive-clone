import { BASE_URL } from "../config.js";

describe("Login Page", () => {
  // Login
  before(() => {
    cy.visit(`${BASE_URL}/`);
    // .url()
    // .get("#email > input")
    // .type("e2e@test.com")
    // .get("#password > input")
    // .type("e2etest123")
    // .get("button.btn-primary")
    // .click();
  });

  // Logout after tests complete
  // after(() => {
  //   cy.visit(`${BASE_URL}/`)

  //     .get(".nav-link")
  //     .should("exist")
  //     .click()
  //     .get("button.btn-link")
  //     .click();
  // });

  // Test clicking folder button works
  it("Folder click brings up modal", () => {
    openModal().should("be.visible");
  });

  // Test closing modal
  it("Modal closes on button click", () => {
    cy.get(".modal-footer > .btn-secondary")
      .click()
      .get(".modal-dialog")
      .should("not.exist");
  });

  // Test click away from modal closes
  it("Modal closes on screen click", () => {
    openModal()
      .get("body")
      .click("left")
      .get(".modal-dialog")
      .should("not.exist");
  });

  // Test folder name input
  it("Folder name input allows text input", () => {
    openModal();
    enterFolderName();
  });

  // Test folder creation
  it("Folder is created on Add Folder click", () => {
    enterFolderNameAndUpdate();

    cy.readFile("cypress/fixtures/folder-name.json").then((folder) => {
      cy.get(".modal-footer > .btn-primary")
        .click()
        .get(".child-folders")
        .should("contain.text", `Test Folder ${folder.folderId}`);
    });
  });
});

const openModal = () => {
  return cy.get("#upload-folder-btn").click().get(".modal-dialog");
};

const enterFolderName = () => {
  cy.readFile("cypress/fixtures/folder-name.json").then((folder) => {
    const nextFolderId = folder.folderId + 1;
    cy.get(".modal-dialog input")
      .clear()
      .type(`Test Folder ${nextFolderId}`)
      .should("have.value", `Test Folder ${nextFolderId}`);
  });
};

const enterFolderNameAndUpdate = () => {
  cy.readFile("cypress/fixtures/folder-name.json").then((folder) => {
    const nextFolderId = folder.folderId + 1;
    cy.get(".modal-dialog input")
      .clear()
      .type(`Test Folder ${nextFolderId}`)
      .should("have.value", `Test Folder ${nextFolderId}`)
      .writeFile(
        "cypress/fixtures/folder-name.json",
        `{ "folderId": ${nextFolderId} }`
      );
  });
};
