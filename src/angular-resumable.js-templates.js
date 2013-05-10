(function(angular) {
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
					'<button ng-click="browse()" type="button" class="btn btn-success btn-browse"><i class="icon-plus icon-white"></i> Add files...</button>',
					'<button ng-click="upload()" ng-disabled="uploading || !files || files.length < \'1\'" type="button" class="btn btn-primary btn-upload"><i class="icon-upload icon-white"></i> Start upload</button>',
					'<button ng-click="cancel()" ng-disabled="uploading || !files || files.length < \'1\'" type="button" class="btn btn-warning btn-cancel"><i class="icon-ban-circle icon-white"></i> Cancel upload</button>',
					'<div class="progress progress-striped" ng-class="{\'active\': uploading}" ng-show="r.isUploading()">',
						'<div class="bar" style="width: {{r.progress() * \'100\'}}%;"></div>',
					'</div>',
					'<table class="table table-striped files">',
						'<tr ng-repeat="file in files">',
							'<td>',
								'{{file.fileName}}',
							'</td>',
							'<td>',
								'{{file.size}}',
							'</td>',
							'<td>',
								'<button ng-click="cancelFile(file)" ng-hide="file.progress() == \'1\'" type="button" class="btn btn-warning cancel"><i class="icon-ban-circle icon-white"></i> <span>Cancel</span></button>',
							'</td>',
						'</tr>',
					'</table>',
				'</div>'
			].join(''));
		}]);
}(angular));