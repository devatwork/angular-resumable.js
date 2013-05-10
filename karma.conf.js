// base path, that will be used to resolve files and exclude
basePath = '';


// list of files / patterns to load in the browser
files = [
  JASMINE,
  JASMINE_ADAPTER,

  // libraries
  'node_modules/jquery/tmp/*.js',
  'lib/resumable.js',
  'lib/angular.js',
  'lib/angular-mocks.js',

  // our app
  'dist/*.min.js',

  // tests
  'test/*.js'
];

// generate js files from html templates
preprocessors = {
  'tpl/*.html': 'html2js'
};

// list of files to exclude
exclude = [];


// test results reporter to use
// possible values: dots || progress
reporters = ['progress'];


// web server port
port = 9876;


// cli runner port
runnerPort = 9100;


// enable / disable colors in the output (reporters and logs)
colors = true;


// level of logging
// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
logLevel = LOG_INFO;


// enable / disable watching file and executing tests whenever any file changes
autoWatch = true;


// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari
// - PhantomJS
browsers = ['Chrome'];


// Continuous Integration mode
// if true, it capture browsers, run tests and exit
singleRun = false;
