// Karma configuration
// Generated on Thu May 19 2016 17:00:28 GMT+0200 (CEST)

module.exports = function(config) {
  config.set({
	  
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'bower_components/karma-read-json/karma-read-json.js', // Test only
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js', // Test only
      'bower_components/leaflet/dist/leaflet.js',
      'bower_components/restangular/dist/restangular.js',
      'bower_components/underscore/underscore.js',      
      //'src/test/resources/*.json',
      {pattern: 'src/test/resources/*.json', included: false},
      'src/test/js/conf.js',
      'src/test/js/**/*.spec.js',
      'target/dist/hbUi.geo-0.0.1.js'
    ],

    // list of files to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'html'],
    
    htmlReporter: {
      outputFile: 'target/test-reports/hbUi.geo.units.html',
			
      // Optional 
      pageTitle: 'hbUi.geo Tests',
      subPageTitle: 'hbUi.geo AngularJS module provides GIS JS client functionalities relying on hb-geo-api microservice.'
    },    

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome', 'Firefox', 'PhantomJS'],

    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,
    
    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
