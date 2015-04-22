# Bailiwick

This is an experimental model toolkit for web applications. It's 
meant to allow for a model that is closer to the Domain Model
pattern.


## Proposed API


    # acme/models.js
    import Config from 'config';
    import Bailiwick from 'bailiwick';

    export const AcmeServiceStore = new Bailiwick.RESTService( config.serviceEndpoint );

    export class AcmeModel extends Bailiwick.Model {
        constructor( store=AcmeServiceStore, resource='' ) {
            this.store = store;
            this.resource = resource;
        }
    }

    export class User extends AcmeModel {

        constructor( store=AcmeServiceStore ) {
            super( store, 'users' );
        }

    }


    # acme/app.js
    import {User} from './models';
    
    class UserListView {
        constructor() {
            this.users = User.fetchList({ limit: 50 });
        }
    });

