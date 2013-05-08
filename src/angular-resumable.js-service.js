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
				/**
				 * Assign a browse action to one or more DOM nodes. Pass in true to allow directories to be selected (Chrome only).
				 */
				AngularResumable.prototype.assignBrowse = function(domNodes, isDirectory) {
					this.r.assignBrowse(domNodes, isDirectory);
				};
				/**
				 * Listen for event from Resumable.js
				 */
				AngularResumable.prototype.on = function(event, callback) {
					self = this;
					self.r.on.call(this, event, function() {
						var args = arguments;
						safeApply(self.$scope, function() {
							callback.apply(self, args);
						});
					});
				};
				/**
				 * Start or resume uploading.
				 */
				AngularResumable.prototype.upload = function() {
					this.r.upload();
				};
				/**
				 * Pause uploading.
				 */
				AngularResumable.prototype.pause = function() {
					this.r.pause();
				};
				/**
				 * Cancel upload of all {ResumableFile} objects and remove them from the list.
				 */
				AngularResumable.prototype.cancel = function() {
					this.r.cancel();
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