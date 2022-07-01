describe("Forgot Password Page", () => {
  // beforeEach(() => {
  //   cy.visit("https://moogledrive.com");
  // });

  // Forgot password page loads correctly
  it("Forgot password page loads", () => {
    cy.visit("https://moogledrive.com")
      .url()
      .should("eq", "https://moogledrive.com/login")
      .get(`a[href="/forgot-password"]`)
      .click()
      .url()
      .should("eq", "https://moogledrive.com/forgot-password")
      .get(".card-body > h2")
      .should("contain.text", "Password Reset");
  });

  // Login link redirects correctly
  it("Redirects to login page", () => {
    cy.get(`a[href="/login"]`)
      .click()
      .url()
      .should("eq", "https://moogledrive.com/login")
      .get(".card-body > h2")
      .should("contain.text", "Log In")
      .go("back");
  });

  // Sign up link redirects correctly
  it("Redirects to sign up page", () => {
    cy.get(`a[href="/signup"]`)
      .click()
      .url()
      .should("eq", "https://moogledrive.com/signup")
      .get(".card-body > h2")
      .should("contain.text", "Sign Up")
      .go("back");
  });

  // Typing into email field works as intended
  it("Enter Email", () => {
    cy.get("#email > input")
      .type("e2e@test.com")
      .should("have.value", "e2e@test.com");
  });

  // Resets password correctly
  it("Resets password", () => {
    cy.get("button.btn-primary")
      .click()
      .intercept({
        method: "POST",
        url: "https://identitytoolkit.googleapis.com/v1/*",
      })
      .as("resetPasswordSuccess")
      .wait("@resetPasswordSuccess")
      .its("response.statusCode")
      .should("eq", 200)
      .get(".alert-success")
      .should("contain.text", "Check your inbox for further instructions");
  });

  // Reset password fails
  it("Reset password fails", () => {
    cy.get("#email > input")
      .clear()
      .type("e2e@doesnotexisttest.com")
      .get("button.btn-primary")
      .click()
      .intercept({
        method: "POST",
        url: "https://identitytoolkit.googleapis.com/v1/*",
      })
      .as("resetPasswordFail")
      .wait("@resetPasswordFail")
      .its("response.statusCode")
      .should("eq", 400)
      .get(".alert-danger")
      .should("contain.text", "Email does not exist");
  });
});
