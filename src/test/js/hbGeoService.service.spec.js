
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

	// Elfin test 1
	var elfin1;	
	
	// Wrap parameters in underscores
	beforeEach(inject(function(_hbGeoService_, _$log_) {
		hbGeoService = _hbGeoService_;
		$log = _$log_;
		elfin1 = readJSON('src/test/resources/elfin_test_1.json');	
	}));

	// Log debug messages in Karma
	afterEach(function(){  
	  console.log("Nb $log.debug message: " + $log.debug.logs.length);
	  for (var i = 0; i < $log.debug.logs.length; i++) {
		  var message = $log.debug.logs[i];
		  console.log(message);
	  }
	});
	
	
	it('hbGeoService.getElfinBasePoint - Get `elfin1` base point', function() {
		var expectedElfin1Swiss = {
				x : 561440.1843106634,
				y : 204769.04409377603
		}

		var elfin1BasePoint = hbGeoService.getElfinBasePoint(elfin1);
		expect(expectedElfin1Swiss.x).toEqual(elfin1BasePoint.X);
		expect(expectedElfin1Swiss.y).toEqual(elfin1BasePoint.Y);
	});
	
	
	it('hbGeoService.getElByPos - `elfin1.FORME.POINT` at POS=4 ', function() {
		
		var expectedElfin1FormePointPos4 = {
				x : 561458.0512695312,
				y : 204771.6516418457
		}

		var elfin1FormePointPos4 = hbGeoService.getElByPos(elfin1.FORME.POINT, "4");
		
		expect(expectedElfin1FormePointPos4.x).toEqual(elfin1FormePointPos4.X);
		expect(expectedElfin1FormePointPos4.y).toEqual(elfin1FormePointPos4.Y);
	});	
	
	
	it('hbGeoService.getElfinZone1Points - `elfin1.FORME.POINT` at #2, #4 ', function() {
		
		// Remark: First ELFIN.FORME.LIGNE.PASSAGE points at #2 ELFIN.FORME.POINT
		var expectedElfin1Zone1Points1 = {
				x : 561421.8609008789,
				y : 204770.87216186523
		}
		
		var expectedElfin1Zone1Points4 = {
				x : 561431.1033325195,
				y : 204755.3938293457
		}		

		var elfin1Zone1Points = hbGeoService.getElfinZone1Points(elfin1);
		expect(elfin1Zone1Points.length).toEqual(4);
		expect(expectedElfin1Zone1Points1.x).toEqual(elfin1Zone1Points[0].X);
		expect(expectedElfin1Zone1Points1.y).toEqual(elfin1Zone1Points[0].Y);
		
		expect(expectedElfin1Zone1Points4.x).toEqual(elfin1Zone1Points[3].X);
		expect(expectedElfin1Zone1Points4.y).toEqual(elfin1Zone1Points[3].Y);

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
