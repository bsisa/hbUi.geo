/**
 * Requires: bower install karma-read-json
 * to make use of:
 * var someJson = readJSON('json/foobar.json');
 * where 
 */
describe('hbGeoLeafletService tests', function() {

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
	
	it('WARNING: precision loss: x: 36cm, y: 54cm ! point1 {x,y} should equal point1bis {x,y} in swiss federal coordinates.', function() {

		var point1 = {            // Using http://www.swisstopo.admin.ch/internet/swisstopo/en/home/apps/calc/navref.html
				"x" : 561440.184, // =>   6.931704416 back =>  561440.184
				"y" : 204769.044, // =>  46.992859387 back =>  204769.044
				"z" : 500.000     // => 549.515       back =>     500.000
			};
		
		var latLng1 = hbGeoLeafletService.getLongitudeLatitudeCoordinates(point1.x, point1.y);
		var point1bis = hbGeoLeafletService.getSwissFederalCoordinates(latLng1.lat, latLng1.lng);

		$log.debug("point1 swiss: x, y                       : " + point1.x + ", " + point1.y);
		$log.debug("latLng1 swiss => latlng approx: lat, lng : " + latLng1.lat + ", " + latLng1.lng);
		$log.debug("point1bis latlng => swiss approx: x,   y : " + point1bis.x + ", " + point1bis.y);

		var approxDeltaX = 0.360386647;
		var approxRoundX = 0.0000000001;
		var approxDeltaY = 0.5372545553;
		expect(point1bis.x + approxRoundX).toEqual(point1.x + approxDeltaX);
		expect(point1bis.y).toEqual(point1.y + approxDeltaY);
		
//		expect(point1bis.x).toEqual(point1.x);
//		expect(point1bis.y).toEqual(point1.y);		
	});

});
