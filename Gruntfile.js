module.exports = function(grunt) {

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		dist: 'dist',
		meta: {
			modules: 'angular.module("angular.resumable", ["resumable.js-services", "resumable.js-directives"]);',
			tplmodules: 'angular.module("angular.resumable.tpls", ["resumable.js-templates"]);',
			all: 'angular.module("angular.resumable", ["angular.resumable.tpls", "resumable.js-services", "resumable.js-directives"]);'
		},
		jshint: {
			files: ['Gruntfile.js','src/**/*.js'],
				options: {
				curly: true,
				immed: true,
				newcap: true,
				noarg: true,
				sub: true,
				boss: true,
				eqnull: true,
				globals: {
					angular: true
				}
			}
		},
		karma: {
			options: {
				configFile: 'karma.conf.js'
			},
			continuous: {
				singleRun: true
			},
			travis: {
				singleRun: true,
				browsers: ['Firefox']
			}
		},
		concat: {
			dist: {
				src: [
					'src/angular-resumable.js-service.js',
					'src/angular-resumable.js-directives.js'
				],
				dest: '<%= dist %>/<%= pkg.name %>-<%= pkg.version %>.js'
			},
			dist_tpls: {
				src: [
					'src/angular-resumable.js-service.js',
					'src/angular-resumable.js-directives.js',
					'src/angular-resumable.js-templates.js'
				],
				dest: '<%= dist %>/<%= pkg.name %>-tpls-<%= pkg.version %>.js'
			}
		},
		uglify: {
			dist:{
				options: {
					banner: '// <%= pkg.name %>-<%= pkg.version %>.js\n<%= meta.modules %>\n'
				},
				src:['<%= dist %>/<%= pkg.name %>-<%= pkg.version %>.js'],
				dest:'<%= dist %>/<%= pkg.name %>-<%= pkg.version %>.min.js'
			},
			dist_tpls:{
				options: {
					banner: '// <%= pkg.name %>-<%= pkg.version %>-tpls.js\n<%= meta.all %>\n'
				},
				src:['<%= dist %>/<%= pkg.name %>-tpls-<%= pkg.version %>.js'],
				dest:'<%= dist %>/<%= pkg.name %>-tpls-<%= pkg.version %>.min.js'
			}
		}
	});

	// Register before and after test tasks so we've don't have to change cli options on the goole's CI server
	grunt.registerTask('before-test', ['jshint']);
	grunt.registerTask('after-test', ['build']);

	grunt.registerTask('test', 'Run tests on singleRun karma server', function() {
		grunt.task.run(process.env.TRAVIS ? 'karma:travis' : 'karma:continuous');
	});

	grunt.registerTask('build', 'Create build files', function() {
		grunt.task.run(['concat', 'uglify']);
	});

	// Default task(s).
	grunt.registerTask('default', ['before-test', 'test', 'after-test']);
};