describe('service spec', function() {
	var provider,
		factory,
		instance,
		scope;

	// prepare/cleanup context
	beforeEach(module('resumable.js-services'));
	beforeEach(function(){
		module(function(resumableJsFactoryProvider) {
			provider = resumableJsFactoryProvider;
		});
		inject(function(_$rootScope_, resumableJsFactory) {
			factory = resumableJsFactory;
			scope = _$rootScope_;
		});
	});
	afterEach(function(){
		clearGlobalOptions();
	});

	// test injection
	it('provider service should be injected', function() {
		expect(provider).toBeDefined();
	});
	it('resumableJsFactory service should be injected', function(){
		expect(factory).toBeDefined();
	});

	// test with global options
	describe('Given global option', function() {
		var useWithGlobalOptions = function(global, opts) {
			beforeEach(function(){
				setGlobalOptions(global);
				createInstance(opts);
			});
		};

		describe('target: /', function() {
			useWithGlobalOptions({target: '/'}, {});

			it('the instance should have equal target', function() {
				expect(instance.opts.target).toBe('/');
			});
		});

		describe('target: /test', function() {
			useWithGlobalOptions({target: '/test'}, {});

			it('the instance should have equal target', function() {
				expect(instance.opts.target).toBe('/test');
			});
		});

		describe('and local override', function() {
			describe('target: /', function() {
				useWithGlobalOptions({target: '/'}, {target: '/local'});

				it('the instance should have local target', function() {
					expect(instance.opts.target).toBe('/local');
				});
			});

			describe('target: /test', function() {
				useWithGlobalOptions({target: '/test'}, {target: '/local'});

				it('the instance should have equal target', function() {
					expect(instance.opts.target).toBe('/local');
				});
			});
		});
	});

	// helpers
	var setGlobalOptions = function(opts) {
		provider.options(opts);
	};
	var clearGlobalOptions = function() {
		provider.options({});
	};
	var createInstance = function(opts) {
		instance = factory.create(scope, opts);
		expect(instance).toBeDefined();
	};
});