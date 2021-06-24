Cypress.Commands.add('login', (loggingUser) => {
    cy.request('POST','http://localhost:3001/api/login',loggingUser)
    .then(function (response){
        localStorage.setItem('loggedBlogUser',JSON.stringify(response.body))
        cy.visit('http://localhost:3000')    
    })
  })
  
Cypress.Commands.add('createBlog',(body) => {
    const headers = {
        'Authorization' : `bearer ${JSON.parse(localStorage.getItem('loggedBlogUser')).token}`
    }
    cy.request({
        method: 'POST',
        url: 'http://localhost:3001/api/blogs',
        body,
        headers})
    cy.visit('http://localhost:3000')
})