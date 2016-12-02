/* -*- javascript -*- */
"use strict";

import {oneToMany} from 'bailiwick';

import {Base} from './base';
import {Property} from './property';


class User extends Base {
	@oneToMany( 'properties', Property ) properties;
}
