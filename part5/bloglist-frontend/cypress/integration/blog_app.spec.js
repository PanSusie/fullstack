describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3000/api/testing/reset')
    cy.visit('http://localhost:3000')
    const user = {
      username: 'test',
      name: 'tester',
      password: '123'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#login-button').click()
      cy.get('#username').type('test')
      cy.get('#password').type('123')
      cy.get('#login-button').click()

      cy.contains('test logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#login-button').click()
      cy.get('#username').type('test')
      cy.get('#password').type('321')
      cy.get('#login-button').click()

      cy.contains('wrong username or password')
    })
  })


  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.login({ username:'test', password:'123' })
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('.title').type('a blog is created')
      cy.get('.author').type('tester')
      cy.get('.url').type('http://test.com')

      cy.contains('create').click()
      cy.contains('a blog is created')
    })

    describe.only('User create a blog can delete it', function() {
      beforeEach(function() {
        cy.create({ title:'a blog shoule be deleted', author: 'tester', url: 'http://delete-this-blog.com' })
      })

      it('user create a blog can delete it'), function() {
        cy.contains('a blog shoule be deleted').parent().find('view').click
        cy.contains('a blog shoule be deleted').parent().should('contain', 'remove')
        cy.contains('a blog shoule be deleted').parent().find('remove').click

        cy.get('html').should('not.contains','a blog shoule be deleted')

      }

    })




  })


})
