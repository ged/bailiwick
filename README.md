# Bailiwick

This is an experimental model toolkit for web applications. It's 
meant to allow for a model that is closer to the Domain Model
pattern.


## Proposed Declaration API


    /* acme/models.js */
    import config from './config.js!';
    import {Model,RESTService} from 'bailiwick';

    export class AcmeModel extends Model {
        static datastore = new RESTService( config.serviceEndpoint )
    }

	export class Role extends AcmeModel {}

    export class User extends AcmeModel {
	
		@oneToMany( 'roles', Role )
		@oneToMany( 'properties', Property )

		constructor() {}
	
	}

	export class Property {
	
		@manyToOne( 'owner', User )
		@oneToMany( 'ledgers', Ledger )

		constructor() {}
	
	}

	export class Ledger {
		@manyToOne( 'property', Property )
	}


## Proposed Usage API

    /* acme/app.js */
    import {User} from './models';
    
    class UserListView {
        constructor() {
            this.users = User.filter({ active: true }).get( 50 ); // Returns a Promise
        }
    });



## Plugin Semantics

Pipe plugins:

val rval = plugin.hook( arg )


