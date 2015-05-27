/* -*- javascript -*- */
"use strict";

export var customMatchers = {

	toBeA: function( utils, customEqTesters ) {
		return {
			compare: function( actual, expected ) {
				var result = {
					pass: actual instanceof expected
				};
				if ( result.pass ) {
					result.message = `${actual} is a ${expected.name}`;
				} else {
					result.message = `${actual} is not a ${expected.name}`;
				}

				return result;
			}
		};
	},

	toBeFulfilled: function( utils, customEqTesters ) {
		return {
			compare: function( actual, expected ) {
				var result = {
					pass: actual.isFulfilled()
				};
				if ( result.pass ) {
					result.message = `${actual} is fulfilled`;
				} else {
					result.message = `${actual} is not fulfilled`;
				}

				return result;
			}
		};
	},

	toBeRejected: function( utils, customEqTesters ) {
		return {
			compare: function( actual, expected ) {
				var result = {
					pass: actual.isRejected()
				};
				if ( result.pass ) {
					result.message = `${actual} is rejected`;
				} else {
					result.message = `${actual} is not rejected`;
				}

				return result;
			}
		};
	},

	toBePending: function( utils, customEqTesters ) {
		return {
			compare: function( actual, expected ) {
				var result = {
					pass: actual.isPending()
				};
				if ( result.pass ) {
					result.message = `${actual} is pending`;
				} else {
					result.message = `${actual} is not pending`;
				}

				return result;
			}
		};
	}

};


const EVENT_PHASES = {
	NONE: 0,
	CAPTURING_PHASE: 1,
	AT_TARGET: 2,
	BUBBLING_PHASE: 3
};
Object.seal( EVENT_PHASES );


class FakeProgressEvent {

	// To initialize an event, with type, bubbles, and cancelable, run these steps:
	// 
	// Set the initialized flag.
	// Unset the stop propagation flag, stop immediate propagation flag, and canceled flag.
	// Set the isTrusted attribute to false.
	// Set the target attribute to null.
	// Set the type attribute to type.
	// Set the bubbles attribute to bubbles.
	// Set the cancelable attribute to cancelable.
	constructor( type, eventInitDict={} ) {
		this.flags = {
			stopPropagation: false,
			stopImmediatePropagation: false,
			canceled: false,
			initialized: false,
			dispatch: false
		};

		this.type = type;
		this.target = null;
		this.currentTarget = null;
		this.eventPhase = EVENT_PHASES.NONE;

		this.isTrusted = false;
		this.timeStamp = Date.now().getUTCMilliseconds();

		this.bubbles = false;
		this.cancelable = false;

		for ( var key in eventInitDict ) {
			this[ key ] = eventInitDict[ key ];
		}

		this.flags.initialized = true;
	}

	// void initEvent(DOMString type, boolean bubbles, boolean cancelable);
	initEvent( type, bubbles, cancelable ) {
		if ( this.flags.dispatch ) return;

		this.type = type;
		this.bubbles = bubbles;
		this.cancelable = cancelable;
	}

	// void stopPropagation();
	stopPropagation() {
		this.flags.stopPropagation = true;
	}

	// void stopImmediatePropagation();
	stopImmediatePropagation() {
		this.flags.stopPropagation = this.flags.stopImmediatePropagation = true;
	}

	// void preventDefault();
	preventDefault() {
		if ( this.cancelable ) {
			this.flags.canceled = true;
		}
	}

	// readonly attribute boolean defaultPrevented;
	get defaultPrevented() { return this.flags.canceled; }
}


/*
 * We need to replace a bunch of jasmine-ajax's methods because it currently
 * triggers progress events with no event argument. :(
 */
extend( FakeXMLHttpRequest.prototype, {
	abort: function() {
		this.readyState = 0;
		this.status = 0;
		this.statusText = "abort";
		this.onreadystatechange();
		this.eventBus.trigger('progress');
		this.eventBus.trigger('abort');
		this.eventBus.trigger('loadend');
	},
});


