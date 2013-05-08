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
					'<ul class="unstyled">',
						'<li ng-repeat="file in files">{{file.fileName}} ({{file.size}} bytes)</li>',
					'</ul>',
					'<button ng-click="browse()" type="button" class="btn btn-browse">Browse</button>',
				'</div>'
			].join(''));
		}]);
}());