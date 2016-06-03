
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

describe('Swiss Federal (plane) to Latitude, Longitude (spheric) coordinates conversions - Using REMOTE...', function() {

	beforeEach(function() {
		module('hbUi.geo')
	});

	
	// Reusable service reference variable outside each test
	var hbGeoSwissCoordinatesService;
	// Accessible $log service (see angular-mocks.js)
	var $log;	

	// Wrap the parameter in underscores
	beforeEach(inject(function(_hbGeoSwissCoordinatesService_, _$log_) {
		hbGeoSwissCoordinatesService = _hbGeoSwissCoordinatesService_;
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
	
	

	it('REMOTE IMPL -- point1 {x,y} should equal point1bis {x,y} in swiss federal coordinates', function() {

		var point1 = {            // Using http://www.swisstopo.admin.ch/internet/swisstopo/en/home/apps/calc/navref.html
				"x" : 561440.184, // =>   6.931704413 back =>  561440.184
				"y" : 204769.044, // =>  46.992859383 back =>  204769.044
				"z" : 477.000     // => 526.513       back =>     477.000
			};
		
		$log.debug("REMOTE: point1 to convert : " + point1.x + ", " + point1.y);
		
		//hbGeoSwissCoordinatesService.getLongitudeLatitudeCoordinates().get({"easting" : point1.x, "northing" : point1.y, "format" : "json"}).then(
		hbGeoSwissCoordinatesService.getLongitudeLatitudeCoordinates(point1.x, point1.y).get().then(
				function(latLng1) {

					//$log.debug("REMOTE: latLng result                            : " + latLng1.easting + ", " + easting.northing);
					
//					var point1bis = hbGeoSwissCoordinatesService.getSwissFederalCoordinates(latLng1.lat, latLng1.lng);

					$log.debug("2) REMOTE: point1 swiss: x, y                       : " + point1.x + ", " + point1.y);
					$log.debug("2) REMOTE: latLng1 swiss => latlng approx: lat, lng : " + latLng1.lat + ", " + latLng1.lng);
//					$log.debug("REMOTE: point1bis latlng => swiss approx: x,   y : " + point1bis.x + ", " + point1bis.y);
					
//					expect(latLng1.)
//					expect(point1bis.x).toEqual(point1.x);
//					expect(point1bis.y).toEqual(point1.y);						
					
				}, 
				function(response) {
					$log.debug("REMOTE: FAILURE WITH response = " + angular.toJson(response));
				}
			);
		
		$log.debug("REMOTE: end...");
	});

});
