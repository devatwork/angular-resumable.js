(function() {
	'use strict';

	/**
	 * This module contains the resumable.js service.
	 */
	angular.module('resumable.js-services', [])
		/**
		 * @ngdoc service
		 * @name resumableJsService
		 *
		 * @description
		 * Wraps the resumable.js API and adds scope management.
		 */
		.provider('resumableJs', [function() {
			// define the default properties send to resumable.js
			var defaults = {},
				globalOptions = {};

			// The `options({})` allows global configuration of all resumable.js instances.
			//
			//      var app = angular.module('App', ['resumable.js-services'], function(resumableJsProvider){
			//        resumableJsProvider.options({target: '/'});
			//      });
			this.options = function(value){
				globalOptions = value;
			};

			// return the actual resumableJs service that is injected in controllers
			this.$get = [function() {
				return {
				};
			}];
		}]);
}());