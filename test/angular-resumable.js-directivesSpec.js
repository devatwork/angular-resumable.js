describe('upload form directive', function () {
	var $rootScope,
		element,
		browseButton;

	// prepare/cleanup context
	beforeEach(module('resumable.js-services'));
	beforeEach(module('resumable.js-directives'));
	beforeEach(module('resumable.js-templates'));
	beforeEach(inject(function(_$compile_, _$rootScope_) {
		$compile = _$compile_;
		$rootScope = _$rootScope_;
		$rootScope.numPages = 5;
		$rootScope.currentPage = 3;
		element = $compile('<resumable-upload-form></resumable-upload-form>')($rootScope);
		$rootScope.$digest();
		browseButton = element.find('button');
	}));

	// test template
	it('has a "resumable-upload-form" css class', function() {
		expect(element.hasClass('resumable-upload-form')).toBe(true);
	});

	// test multiple vs. single upload
	describe('hidden browse button', function () {
		it('has a multiple attribute', function() {
			element = $compile('<resumable-upload-form opts="{\'maxFiles\': \'10\'}"></resumable-upload-form>')($rootScope);
			$rootScope.$digest();
			var upload = element.find('input[type="file"]');
			expect(upload.attr('multiple')).toBeDefined();
		});

		it('has no multiple attribute', function() {
			element = $compile('<resumable-upload-form opts="{\'maxFiles\': \'1\'}"></resumable-upload-form>')($rootScope);
			$rootScope.$digest();
			var upload = element.find('input[type="file"]');
			expect(upload.attr('multiple')).not.toBeDefined();
		});
	});
});