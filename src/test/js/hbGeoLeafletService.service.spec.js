/**
 * Requires: bower install karma-read-json
 * to make use of:
 * var someJson = readJSON('json/foobar.json');
 * where 
 */
describe('NO TEST YET - hbGeoLeafletService tests', function() {

	beforeEach(function() {
		module('hbUi.geo')
	});

	// Reusable service reference variable outside each test
	var hbGeoLeafletService;
	// Accessible $log service (see angular-mocks.js)
	var $log;
	// Elfin test 1
	var elfin1 = readJSON('src/test/resources/elfin_test_1.json');
	
	// Wrap parameters in underscores
	beforeEach(inject(function(_hbGeoLeafletService_, _$log_) {
		hbGeoLeafletService = _hbGeoLeafletService_;
		$log = _$log_;
	}));

	// Log debug messages in Karma
	afterEach(function(){  
	  console.log("Nb $log.debug message: " + $log.debug.logs.length);
	  for (var i = 0; i < $log.debug.logs.length; i++) {
		  var message = $log.debug.logs[i];
		  console.log(message);
	  }
	});
	
//	it('Get `elfin1` base point', function() {
//		var expectedElfin1Swiss = {
//				x : "561440.1843106634",
//				y : "204769.04409377603"
//		}
//
//		//hbGeoLeafletService.
//		expect(expectedElfin1Swiss.x).toEqual();
//	});

});
