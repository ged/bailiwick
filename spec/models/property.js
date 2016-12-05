/* -*- javascript -*- */
"use strict";

import {manyToOne} from 'bailiwick';

import {Base} from './base';
import {User} from './user';


export class Property extends Base {
	@manyToOne( 'owner', User ) owner;
}
