# Bailiwick

This is an experimental model toolkit for web applications. It's meant to allow for a model that is closer to the Domain Model pattern. It's been factored out of working domain models in several web applications to make it as practical and useful as possible while avoiding chrome plating and the geegaws that sometimes accompany such frameworks or toolkits.

As of this writing, it's far from ready for production use. These are the things which must be done, at a minimum, before it's ready for a 1.0 release:

1. Testing. I started the library test-first, but it was difficult to stick to that and still base the code on refactored application code. It has a testing setup, but it's fragile. Cross-compilation and heavy use of promises make it extremely difficult to figure out sometimes why failures happen. I may need to just burn it down and start over, especially if I can find a less-finicky setup than Karma+Jasmine for ES6 testing. Or maybe I just need to level up my Javascript testing skills.
2. Flesh out the API. There are several big features which I think are necessary for any domain model library which are current not implemented. I'm hoping by using the library in a couple of different scenarios to factor the rest of the functionality out of the working code like the rest of it has been.
3. Work out the ES6 issues. Browers' support for ES6 is currently very spotty, and Babel (which is otherwise an amazing piece of software) doesn't always handle the mixed support for some features and not others really well. I'll need to either find workarounds for these or just wait until ES6 support is more ubiquitous.


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


## Proposed Additional API

### Associations

This will allow auto-generation of methods on model objects that return other related model objects.

	import {manyToMany} from 'bailiwick';

	export class User extends AcmeModel {
	
		@manyToMany('roles');
		
	}

	export class Role extends AcmeModel {
	
		@manyToMany('members', User);
	
	}

	let user = null, userRoles = [];

	User.get( 23 ).then( user23 => {
		user = user23;
		return this.getRoles().then( roles => userRoles.push(...roles) );
	});


### Schema Declaration

This will allow model classes to (optionally) pre-define their API without needing to fetch a record from the datastore first. This will make it easier to construct new instances, provide defaults, etc.

	import {schema} from 'bailiwick';
	
	@schema({
		firstName: null,
		lastName: null,
		login: null,
		roles: []
	})
	export class User extends AcmeModel {}
	
Or maybe:

	export class User extends AcmeModel {
		@schema({
			firstName: null,
			lastName: null,
			login: null,
			roles: []
		});
	}


### Validation Utilities

This will be a library of decorators that can be used to declare common validations for attributes (e.g., present, type, minLength, maxLength, matchesPattern, etc.).

This would be basically the same as the User in the Current API example:

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
	

