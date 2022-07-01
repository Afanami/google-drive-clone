describe("Login Page", () => {
  // beforeEach(() => {
  //   cy.visit("https://moogledrive.com");
  // });

  // Visiting website redirects user to login
  it("Redirects to login", () => {
    cy.visit("https://moogledrive.com")
      .url()
      .should("eq", "https://moogledrive.com/login");
  });

  // Forgot password link redirects correctly
  it("Redirects to forgot password page", () => {
    cy.get(`a[href="/forgot-password"]`)
      .click()
      .url()
      .should("eq", "https://moogledrive.com/forgot-password")
      .get(".card-body > h2")
      .should("contain.text", "Password Reset")
      .visit("https://moogledrive.com");
  });

  // Sign up link redirects correctly
  it("Redirects to sign up page", () => {
    cy.get(`a[href="/signup"]`)
      .click()
      .url()
      .should("eq", "https://moogledrive.com/signup")
      .get(".card-body > h2")
      .should("contain.text", "Sign Up")
      .visit("https://moogledrive.com");
  });

  // Typing into email field works as intended
  it("Enter Email", () => {
    cy.get("#email > input")
      .type("e2e@test.com")
      .should("have.value", "e2e@test.com");
  });

  // Typing into password field works as intended
  it("Enter Password", () => {
    cy.get("#password > input")
      .type("e2etest123")
      .should("have.value", "e2etest123");
  });

  // User login works
  it("Logs user in and redirects to google drive page", () => {
    cy.get("button.btn-primary")
      .click()
      .url()
      .should("eq", "https://moogledrive.com/")
      .get(".navbar")
      .should("contain.text", "Google Drive Clone")
      .should("contain.text", "Profile");
  });

  // User logout
  it("Logs user out and redirects to login page", () => {
    cy.get(".nav-link")
      .click()
      .get("button.btn-link")
      .should("contain.text", "Log Out")
      .click()
      .url()
      .should("eq", "https://moogledrive.com/login");
  });
});
