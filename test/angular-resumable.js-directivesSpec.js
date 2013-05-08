describe('upload form directive', function () {
	var $rootScope,
		element;

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
	}));

	it('has a "resumable-upload-form" css class', function() {
		expect(element.hasClass('resumable-upload-form')).toBe(true);
	});
});