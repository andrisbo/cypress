describe('Intranet login tests', () => {
    beforeEach(() => {
        cy.visit('/')

    })
  
    it('Login Happy path', () => {
        cy.login(Cypress.env('username'), Cypress.env('password'))
        cy.get("[id='profile'] .bp-tooltip").should('have.attr', 'data-bp-tooltip', 'Andris Boriss')
    })

    it('Login Failed test', () => {
        cy.login(Cypress.env('username')+1, Cypress.env('password'))
        cy.get(".errors").should('contains.text', "Invalid credentials")
    })

    it('Login and logout success test', () => {
        cy.login('andris.boriss',  Cypress.env('password'))
        cy.get(".logout-button").click();
        cy.get("[id='msg']").should('contains.text', "Logout successful")
    })
})



