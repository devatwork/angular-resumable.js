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
					'<div class="progress progress-striped" ng-class="{\'active\': uploading}">',
						'<div class="bar" style="width: {{r.progress() * \'100\'}}%;"></div>',
					'</div>',
					'<button ng-click="browse()" type="button" class="btn btn-browse">Browse</button>',
					'<button ng-click="cancel()" ng-disabled="!uploading" type="button" class="btn btn-cancel">Cancel</button>',
					'<button ng-click="pause()" ng-disabled="!uploading" type="button" class="btn btn-pause">Pause</button>',
					'<button ng-click="upload()" ng-disabled="uploading || !files || files.length < \'1\'" type="button" class="btn btn-upload">Upload</button>',
				'</div>'
			].join(''));
		}]);
}());