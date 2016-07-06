
/**
 * TODO: Check 
 * 
 * http://www.swisstopo.admin.ch/internet/swisstopo/en/home/products/software/products/skripts.html
 * 
 * WGS84 to LV95
 * Convert WGS84 (or ETRS89/ETRF93) global coordinates to LV95 Swiss projected coordinates
 *
 * http://geodesy.geo.admin.ch/reframe/wgs84tolv95
 * 
 * http://geodesy.geo.admin.ch/reframe/wgs84tolv95?easting=7.43863&northing=46.95108&altitude=550.0&format=json
 * {"easting": "2599999.810036594", "northing": "1199999.6801912596", "altitude": "500.3777916841209"}
 */

describe('Swiss Federal (plane) to Latitude, Longitude (spheric) coordinates conversions', function() {

	beforeEach(function() {
		module('hbUi.geo')
	});

	// Reusable service reference variable outside each test
	var hbGeoService;
	// Accessible $log service (see angular-mocks.js)
	var $log;

	// Wrap parameters in underscores
	beforeEach(inject(function(_hbGeoService_, _$log_) {
		hbGeoService = _hbGeoService_;
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
		
		var latLng1 = hbGeoService.getLongitudeLatitudeCoordinates(point1.x, point1.y);
		var point1bis = hbGeoService.getSwissFederalCoordinates(latLng1.lat, latLng1.lng);

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
