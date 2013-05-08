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
			this['$get'] = [function() {
				/**
				 * Constructor of the AngularResumable class.
				 * @param  {Scope} $scope The scope on which {AngularResumable} will operate.
				 * @param {Object} opts   A hash object of the configuration passed to the Resumable.js instance.
				 */
				function AngularResumable($scope, opts) {
					// invoke super constructor
					this.$scope = $scope;

					// combine default options with global options and options
					opts = angular.extend({}, defaults, globalOptions, opts);

					// create the resumable
					this.r = new Resumable(opts);
					this.opts = this.r.opts;
				}
				AngularResumable.prototype.on = function(event, callback) {
					self = this;
					self.r.on.call(this, event, function() {
						var args = arguments;
						self.$scope.$apply(function() {
							callback.apply(self, args);
						});
					});
				};
				AngularResumable.prototype.assignBrowse = function(domNodes, isDirectory) {
					this.r.assignBrowse(domNodes, isDirectory);
				};

				// return the public api of the resumableJsFactory.
				return {
					/**
					 * Creates an instance of the {AngularResumable} class.
					 * @param  {Scope}            $scope The scope on which {AngularResumable} will operate.
					 * @param  {Object}           opts   A hash object of the configuration passed to the Resumable.js instance.
					 * @return {AngularResumable}        Returns the created {AngularResumable} instance, which wraps {Resumable}.
					 */
					'create': function($scope, opts) {
						return new AngularResumable($scope, opts);
					}
				};
			}];
		}]);
}());