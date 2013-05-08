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

					// add listeners
					scope.r.on('fileAdded', function(file) {
						scope.files.push(file);
					});
					scope.r.on('progress', function() {
						// just listen in order to trigger the $apply
					});
					scope.r.on('uploadStart', function() {
						scope.uploading = true;
					});
					scope.r.on('complete', function() {
						scope.uploading = false;
					});
					scope.r.on('pause', function() {
						console.log('paused');
						scope.uploading = false;
					});
					scope.r.on('cancel', function() {
						console.log('canceled');
						scope.uploading = false;
					});

					/**
					 * Open the file browser window.
					 */
					scope.browse = function() {
						uploadButton.click();
					};
					/**
					 * Start or resume uploading.
					 */
					scope.upload = function() {
						scope.r.upload();
					};
					/**
					 *  Pause uploading.
					 */
					scope.pause = function() {
						scope.r.pause();
					};
					/**
					 *  Cancel upload of all {ResumableFile} objects and remove them from the list.
					 */
					scope.cancel = function() {
						scope.r.cancel();
						scope.files = [];
					};
					/**
					 * Cancels the upload of the given file.
					 * @param {ResumableFile} file The file for which to cancel the upload.
					 */
					scope.cancelFile = function(file) {
						file.abort();
						scope.files.splice(scope.files.indexOf(file), 1);
					};

					// attach the browse elements
					scope.r.assignBrowse(uploadButton);

					// init the scope
					scope.files = [];
					scope.uploading = false;
				},
				'restrict': 'E',
				'replace': true,
				'scope': {
				},
				'templateUrl': 'template/resumable.js/upload-form.html'
			};
		}]);
}());