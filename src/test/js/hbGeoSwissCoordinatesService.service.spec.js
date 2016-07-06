
/**
 * WARNING: These tests ARE NOT EFFECTIVE ! 
 * 
 * The hbGeoSwissCoordinatesService.getLongitudeLatitudeCoordinates fails silently, expect are never 
 * reached... Further investigations shows going further in that direction requires so much plumbing
 * related to the test context that is misses completely the final goal of testing the library as 
 * close as possible to production context. 
 * 
 * Test context requires its own expertise irrelevant to the runtime execution context and brings in
 * its own problems which do not exists in runtime execution context.  
 * 
 * TODO: WE WANT END TO END TEST HERE, NEED TO MOVE TO SOMETHING LIKE http://www.protractortest.org/
 * 
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
		//angular.mock.module('hbUi.geo')
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
		
		$log.debug("REMOTE 1): point1 to convert : " + point1.x + ", " + point1.y);
		
		// Get GPS for swiss coordinates
		hbGeoSwissCoordinatesService.getLongitudeLatitudeCoordinates(point1.x, point1.y).get().then(
				function(latLng1) {
					$log.debug("2) REMOTE: point1 swiss: x, y                       : " + point1.x + ", " + point1.y);
					$log.debug("2) REMOTE: latLng1.xEastingLng = " + latLng1.xEastingLng + ", latLng1.yNorthingLat = " + latLng1.yNorthingLat);
					// Get swiss coordinates back from GPS in order to check for deviation.
					hbGeoSwissCoordinatesService.getSwissFederalCoordinates(latLng1.xEastingLng,latLng1.yNorthingLat).get().then(
							function(point1bis) {
            					$log.debug("REMOTE 2.2): point1bis.xEastingLng = " + point1bis.xEastingLng + ", point1bis.yNorthingLat = " + point1bis.yNorthingLat);
            	            	$log.debug("REMOTE 2.2): point1bis" + angular.toJson(point1bis));
            	            	expect(point1bis.xEastingLng).toEqual(point1.x);
            	            	expect(point1bis.yNorthingLat).toEqual(point1.y);
							}, 
            				function(response) {
            					$log.debug("REMOTE 2.2): FAILURE WITH response = " + angular.toJson(response));
            				}
            			);					
				}, 
				function(response) {
					//$log.debug("REMOTE: FAILURE WITH response = " + angular.toJson(response));
					$log.debug("REMOTE 2): FAILURE WITH response = " + response);
				}
			);
		
		$log.debug("REMOTE: 3) end...");
	});

});
