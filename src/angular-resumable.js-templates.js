(function() {
	'use strict';

	/**
	 * This module provides default templates for the resumable.js directives.
	 */
	angular.module('resumable.js-templates', [])
		/**
		 * Configures the template for the resumableUploadForm directive.
		 */
		.run(['$templateCache', function($templateCache) {
			$templateCache.put('template/resumable.js/upload-form.html', [
				'<div class="resumable-upload-form">',
					'TODO',
				'</div>'
			].join(''));
		}]);
}());