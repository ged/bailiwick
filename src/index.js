/**
 * Bailiwick -- A more domain-ish model toolkit.
 * $Id$
 *
 * Authors
 * - Michael Granger <ged@FaerieMUD.org>
 */

import Promise from 'bluebird';
import 'babel/polyfill';

/**
 * The default namespace
 */

export var VERSION = '0.0.1.dev';

export * from './model';
export * from './datastore';
export * from './criteria';

export * from './null-datastore';
export * from './rest-service';

export * from './errors';
