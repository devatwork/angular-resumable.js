(function() {
	'use strict';

	/**
	 * Safe apply
	 * Source: https://coderwall.com/p/ngisma
	 */
	function safeApply(scope, fn) {
		var phase = scope.$root.$$phase;
		if(phase == '$apply' || phase == '$digest') {
			if(fn && (typeof(fn) === 'function')) {
				fn();
			}
		} else {
			scope.$apply(fn);
		}
	}

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
			this['$get'] = [function() {
				// return the public api of the resumableJsFactory.
				return {
					/**
					 * Creates an instance of the {AngularResumable} class.
					 * @param  {Scope}            $scope The scope on which {AngularResumable} will operate.
					 * @param  {Object}           opts   A hash object of the configuration passed to the Resumable.js instance.
					 * @return {AngularResumable}        Returns the created {AngularResumable} instance, which wraps {Resumable}.
					 */
					'create': function($scope, opts) {
						// combine default options with global options and options
						opts = angular.extend({}, defaults, globalOptions, opts);

						// create the resumable
						var r = new Resumable(opts);

						// monkey patch the on event method
						var oldOn = r.on;
						r.on = function(event, callback) {
							oldOn.call(this, event, function() {
								var args = arguments;
								safeApply($scope, function() {
									callback.apply(self, args);
								});
							});
						};

						// return the patched instance
						return r;
					}
				};
			}];
		}]);
}());