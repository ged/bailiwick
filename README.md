# Bailiwick

[![Build Status](https://semaphoreci.com/api/v1/ged/bailiwick/branches/master/badge.svg)](https://semaphoreci.com/ged/bailiwick)

This is an experimental model toolkit for web applications. It's meant to allow for a model that is closer to the Domain Model pattern. It's been factored out of working domain models in several web applications to make it as practical and useful as possible while avoiding chrome plating and the geegaws that sometimes accompany such frameworks or toolkits.

The code is getting close to being useful for production code. There are a few things left to work out before I'd feel comfortable saying it's 1.0, but I'm using it in a few applications now and really enjoying it.

I think I've ironed out the testing and packaging, but I'm still unsure of what the best way to package an ES6 library for NPM is.

The things left to work on are:

* Association mutators (e.g., addAssociatedObject, removeAssociatedObject, etc.)
* Consider adding additional association types (manyToMany, oneToOne, ?). I think these will be necessary once associations add mutator methods.
* Test coverage
* Documentation


## Requirements

1. fetch -- this library uses the `isomorphic-fetch` library for testing.


## Current API


    /* acme/models.js */
    import config from './config.js!';
    import {Model, RESTService, validator, ValidationError} from 'bailiwick';

    export class AcmeModel extends Model {
        static get datastore() {
            return new RESTService( config.serviceEndpoint );
        }
    }

    export class Role extends AcmeModel {
        @validator('name')
        validateName() {
            if ( !this.name || this.name === '' ) {
                throw new ValidationError( 'is not present', 'name' );
            }
            
            return Role.where({ name: this.name }).get().
                then( existing => {
                    if ( existing.id !== this.id ) {
                        throw new ValidationError('is not unique', 'name');
                    }
                }).
                catch( () => true ); // Simplified
        }
    }

    export class User extends AcmeModel {
    
        @validator('firstName')
        validateFirstName() {
            if ( !this.firstName || this.firstName === '' ) {
                throw new ValidationError( 'is not present', 'firstName' );
            }
            return true;
        }
    
        @validator('lastName')
        validateLastName() {
            if ( !this.lastName || this.lastName === '' ) {
                throw new ValidationError( 'is not present', 'lastName' );
            }
            return true;
        }
    
        @validator('login')
        validateLastName() {
            if ( !this.login || this.login === '' ) {
                throw new ValidationError( 'is not present', 'login' );
            }
            else if ( this.login.length < 6 ) {
                throw new ValidationError( 'is too short (min 6 characters)', 'login' );
            }
            return User.where({ login: this.login }).get().
                then( existing => {
                    if ( existing.id !== this.id ) {
                        throw new ValidationError('is not unique', 'login');
                    }
                }).
                catch( () => true ); // Simplified
        }
    
    }


    let smiths = [],
        adminRole = null;

    User.where({ lastName: 'Smith' }).get().
        then( users => smiths.push(...users) ).
        catch( err => console.error("Couldn't fetch Smiths: ", err) );
    Role.where({ name: 'admin' }).get().
        then( role => adminRole = role ).
        catch( err => console.error("Couldn't fetch admin role: ", err) );

    let newUser = new User({
        firstName: 'Jen',
        lastName: 'Smith',
        login: 'jsmith'
    });
    newUser.save().
        then( savedUser => smiths.push(savedUser) ).
        catch( err => {
            console.error( "Couldn't save the user: ", err );
            if ( err instanceof ValidationError ) {
                form.errors = newUser.errors; // Instance of bailiwick.ValidationErrors
            }
        })


### Associations

This allows auto-generation of methods on model objects that return other related model objects.

    import {oneToMany, manyToOne} from 'bailiwick';

    @oneToMany('orders', Order)
    export class User extends AcmeModel {}

    @manyToOne('customer', () => User)
    export class Order extends AcmeModel {
    
    
    }

    let user = null, orders = [];

    User.get( 23 ).then( result => {
        user = result;
        return user.getOrders().
            then( results => orders.push(...results) );
    });


### Schema Declaration

This will allow model classes to (optionally) pre-define their API without needing to fetch a record from the datastore first. This is used when constructing new instances so you don't have to provide every field:

    import {schema} from 'bailiwick';
    
    @schema({
        firstName: null,
        lastName: null,
        login: null,
        roles: []
    })
    export class User extends AcmeModel {}
    
  let u = new User({ firstName: 'Lana', lastName: 'Del Rey' });


### Validation Utilities

This provides decorators that can be used to declare validation functions for attributes.

    import {validator} from 'bailiwick';

    export class User extends AcmeModel {
      @validator('type')
      validateLogin() {
          if ( !this.login ) {
            throw new Error("login must be set");
          } else if ( this.login !~ /^[a-z]\w{2,16}$/ ) {
              throw new Error( `invalid login: ${this.login}` );
          }
      }    
    }

Validator methods are called by the `validate` method, which returns a Promise the resolves iff all of its validators run with no errors being raised.

The `validate` method is called automatically by `create`, `update`, and `replace`.

I'm planning on adding some canned validation functions for common checks:

    import {
        validatesPresence,
        validatesMinLength,
        validatesType,
        validatesUnique
    } from 'bailiwick';
    
    export class User extends AcmeModel {
        @validatesPresence( 'firstName', 'lastName', 'login' );
        @validatesType( String, 'firstName', 'lastName', 'login' );
        @validatesMinLength( 6, 'login' );
        @validatesUnique( 'login' );
    }
    


## Author

- Michael Granger <ged@faeriemud.org>


## License

Copyright (c) 2015-2020, Michael Granger
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice,
  this list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice,
  this list of conditions and the following disclaimer in the documentation
  and/or other materials provided with the distribution.

* Neither the name of the author/s, nor the names of the project's
  contributors may be used to endorse or promote products derived from this
  software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

