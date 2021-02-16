class LoginPage {
  loginUser(userEmail, userPassword) {
    cy.get('#email').type(userEmail)
    cy.get('#password').type(userPassword)
    this.clickSubmit()
  }

  clickSubmit() {
    cy.get('.btn-brand').click()
  }

  dashboardCourseList() {
    return cy.get('.listing-courses')
  }

  loginFailureError() {
    return cy.get('#login-failure-alert')
  }
}

export default LoginPage
