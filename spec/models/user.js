/* -*- javascript -*- */
"use strict";

import {oneToMany} from '../../src/index';

import {Base} from './base';
import {Property} from './property';


export class User extends Base {
	@oneToMany( 'properties', Property ) properties;
}
