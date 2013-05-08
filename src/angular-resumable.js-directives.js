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
					// create a file upload button
					var uploadButton = angular.element('<input type="file" style="display:none;">');
					element.append(uploadButton);

					// create the resumable object
					var opts = angular.extend({}, scope.$eval(attrs.opts));
					scope.r = resumableJsFactory.create(scope, opts);

					// listen for new files
					scope.r.on('fileAdded', function(file) {
						scope.files.push(file);
					});

					// this method opens the browse dialog
					scope.browse = function() {
						uploadButton.click();
					};

					// attach the browse elements
					scope.r.assignBrowse(uploadButton);

					// init the scope
					scope.files = [];
				},
				'restrict': 'E',
				'replace': true,
				'scope': {
				},
				'templateUrl': 'template/resumable.js/upload-form.html'
			};
		}]);
}());