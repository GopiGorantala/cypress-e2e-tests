import LoginPage from '../pages/login_page'

describe('Login tests', function () {
  const loginPage = new LoginPage()

  beforeEach(function () {
    cy.visit(Cypress.env('login_url'))
  })

  it('should show empty field login failure error', function () {
    // Login as normal user
    loginPage.clickSubmit()
    loginPage.loginFailureError().should('contain.text', 'We couldn\'t sign you in.')
    loginPage.loginFailureError().should('contain.text', 'Please enter your Email.')
    loginPage.loginFailureError().should('contain.text', 'Please enter your Password.')
  })

  it('should show invalid email or password login failure error', function () {
    // Login as normal user
    loginPage.loginUser('incorrect@email.com', 'incorrect-password')
    loginPage.loginFailureError().should('contain.text', 'We couldn\'t sign you in.')
    loginPage.loginFailureError().should('contain.text', 'Email or password is incorrect.')
  })

  it('user can successfully login and redirected to dashboard', function () {
    // Login as normal user
    loginPage.loginUser(Cypress.env('LMS_USER_EMAIL'), Cypress.env('LMS_USER_PASSWORD'))
    loginPage.dashboardCourseList().should('exist')
  })
})
