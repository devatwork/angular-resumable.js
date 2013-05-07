describe('service spec', function() {
	var provider,
		service;

	// prepare/cleanup context
	beforeEach(module('resumable.js-services'));
	beforeEach(function(){
		module(function(resumableJsProvider) {
			provider = resumableJsProvider;
		});
		inject(function(resumableJs) {
			service = resumableJs;
		});
	});

	// test injection
	it('provider service should be injected', function() {
		expect(provider).toBeDefined();
	});
	it('resumableJs service should be injected', function(){
		expect(service).toBeDefined();
	});
});