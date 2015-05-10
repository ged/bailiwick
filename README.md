# Bailiwick

This is an experimental model toolkit for web applications. It's 
meant to allow for a model that is closer to the Domain Model
pattern.


## Proposed API


    # acme/models.js
    import config from './config.js!';
    import {Model,RESTService} from 'bailiwick';

    class AcmeService extends RESTService {
        static baseURL = config.serviceEndpoint;
    }

    export class AcmeModel extends Model {
        datastore = new AcmeService();
    }

    export class User extends AcmeModel {}


    # acme/app.js
    import {User} from './models';
    
    class UserListView {
        constructor() {
            this.users = User.filter({ active: true }).get( 50 ); // Returns a Promise
        }
    });

