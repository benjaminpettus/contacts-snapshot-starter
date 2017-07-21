const chai = require('chai')
const expect = chai.expect
const Users = require('../../../src/db/users')
const DbContacts = require('../../../src/db/contacts')

describe( 'database queries', () => {

  context( 'find user', () => {

    it( 'should find a single user by username', ( done ) => {
      const username = 'me'
      Users.findByUsername( username )
        .then( result => {
          expect(result.id).to.eql(1)
        })
        .then( done, done )
      })

    it( 'should find a single user by id', ( done ) => {
      const id = 1
      Users.findUserById( id )
        .then( result => {
          expect(result.id).to.eql(1)
          expect(result.username).to.eql('me')
        })
        .then( done, done )
      })
    })

  context('contacts', () => {

    it( 'should return all contacts', (done) => {
      DbContacts.getContacts()
      .then( result => {
        expect(result[0].first_name).to.eql('Jared')
      })
      .then( done, done )
    })

  })

  })
