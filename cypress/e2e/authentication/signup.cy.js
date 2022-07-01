import { BASE_URL } from "../config.js";

describe("Sign Up Page", () => {
  // beforeEach(() => {
  //   cy.visit("https://moogledrive.com");
  // });

  // Signup page loads correctly
  it("Sign up page loads", () => {
    cy.visit(`${BASE_URL}`)
      .url()
      .should("eq", `${BASE_URL}/login`)
      .get(`a[href="/signup"]`)
      .click()
      .url()
      .should("eq", `${BASE_URL}/signup`)
      .get(".card-body > h2")
      .should("contain.text", "Sign Up");
  });

  // Login link redirects correctly
  it("Redirects to login page", () => {
    cy.get(`a[href="/login"]`)
      .click()
      .url()
      .should("eq", `${BASE_URL}/login`)
      .get(".card-body > h2")
      .should("contain.text", "Log In")
      .go("back");
  });

  // Typing into email field works as intended
  it("Enter Email", () => {
    enterEmail();
  });

  // Typing into password field works as intended
  it("Enter Password", () => {
    enterInput("#password > input", "e2etest123");
  });

  // Typing into password confirm field works as intended
  it("Confirm Password", () => {
    enterInput("#password-confirm > input", "e2etest123");
  });

  // Sign up request fails
  it("Sign up user fails", () => {
    enterInput("#password > input", "e2etest123");
    enterInput("#password-confirm > input", "e2etest1234");

    cy.get("button.btn-primary")
      .click()
      .get(".alert-danger")
      .should("contain.text", "Passwords do not match");
  });

  // Sign up request works as intended and directs user to dashboard
  it("Sign up user", () => {
    enterInput("#password > input", "e2etest123");
    enterInput("#password-confirm > input", "e2etest123");

    cy.get("button.btn-primary")
      .click()
      .url()
      .should("eq", `${BASE_URL}/`)
      .get(".navbar")
      .should("contain.text", "Google Drive Clone")
      .should("contain.text", "Profile")
      .get(".nav-link")
      .click()
      .get("button.btn-link")
      .should("contain.text", "Log Out")
      .click()
      .url()
      .should("eq", `${BASE_URL}/login`);
  });
});

const enterEmail = () => {
  cy.readFile("cypress/fixtures/new-user.json").then((user) => {
    const nextUserId = user.userId + 1;
    cy.get("#email > input")
      .clear()
      .type(`e2e${nextUserId}@test.com`)
      .should("have.value", `e2e${nextUserId}@test.com`)
      .writeFile(
        "cypress/fixtures/new-user.json",
        `{ "userId": ${nextUserId} }`
      );
  });
};

const enterInput = (element, value) => {
  cy.get(element).clear().type(value).should("have.value", value);
};
