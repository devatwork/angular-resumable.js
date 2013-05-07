(function() {
	'use strict';

	/**
	 * This module contains the resumable.js service.
	 */
	angular.module('resumable.js-services', [])
		/**
		 * @ngdoc service
		 * @name resumableJsFactory
		 *
		 * @description
		 * Wraps the resumable.js API and adds scope management.
		 */
		.provider('resumableJsFactory', [function() {
			// define the default properties send to resumable.js
			var defaults = {},
				globalOptions = {};

			// The `options({})` allows global configuration of all resumable.js instances.
			//
			//      var app = angular.module('App', ['resumable.js-services'], function(resumableJsFactoryProvider){
			//        resumableJsFactoryProvider.options({target: '/'});
			//      });
			this['options'] = function(value){
				globalOptions = value;
			};

			// return the actual resumableJsFactory that is injected in controllers
			this['$get'] = ['$rootScope', function($rootScope) {
				/**
				 * Constructor of the AngularResumable class.
				 * @param {Object} opts A hash object of the configuration passed to the Resumable.js instance.
				 */
				function AngularResumable(opts) {
					// combine default options with global options and options
					opts = angular.extend({}, defaults, globalOptions, opts);

					// invoke super constructor
					Resumable.call(this, opts);
				}
				AngularResumable.prototype = new Resumable();
				AngularResumable.prototype.constructor = AngularResumable;
				AngularResumable.prototype.on = function(event, callback) {
					self = this;
					Resumable.prototype.on.call(this, event, function() {
						var args = arguments;
						$rootScope.$apply(function() {
							callback.apply(self, args);
						});
					});
				};

				// returnt the public api of the resumableJsFactory.
				return {
					/**
					 * Creates an instance of the {AngularResumable} class.
					 * @param  {Object}           opts A hash object of the configuration passed to the Resumable.js instance.
					 * @return {AngularResumable}      Returns the created {AngularResumable} instance, which wraps {Resumable}.
					 */
					'create': function(opts) {
						return new AngularResumable(opts);
					}
				};
			}];
		}]);
}());