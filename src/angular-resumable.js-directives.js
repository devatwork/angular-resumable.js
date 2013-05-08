(function() {
	'use strict';

	/**
	 * This module contains the resumable.js directives.
	 */
	angular.module('resumable.js-directives', ['resumable.js-services'])
		/**
		 * @ngdoc directive
		 * @name resumableUploadForm
		 *
		 * @description
		 * Renders a simple upload form powered by resumable.js.
		 *
		 * @element html
		 */
		.directive('resumableUploadForm', ['resumableJsFactory', function(resumableJsFactory) {
			return {
				'link': function(scope, element, attrs) {
				},
				'restrict': 'E',
				'replace': true,
				'scope': {
				},
				'templateUrl': 'template/resumable.js/upload-form.html'
			};
		}]);
}());