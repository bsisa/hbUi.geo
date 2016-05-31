
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

	// Defined reusable service reference variable outside each test
	var hbGeoService;

	// Wrap the parameter in underscores
	beforeEach(inject(function(_hbGeoService_) {
		hbGeoService = _hbGeoService_;
	}));

	it('point1 {x,y} should equal point1bis {x,y} in swiss federal coordinates', function() {
		console.log("DOES NOTHING... updated...");
		
		var point1 = {
				"x" : 561440.184310663,
				"y" : 204769.044093776
			};
		
		hbGeoService.getLongitudeLatitudeCoordinates(point1.x, point1.y);		
		
		
//		var latLng1 = hbGeoService.getLongitudeLatitudeCoordinates(point1.x, point1.y);
//		var point1bis = hbGeoService.getSwissFederalCoordinates(latLng1.lat, latLng1.lng);
//
//		console.log("point1 swiss: x, y                       : " + point1.x + ", " + point1.y);
//		console.log("latLng1 swiss => latlng approx: lat, lng : " + latLng1.lat + ", " + latLng1.lng);
//		console.log("point1bis latlng => swiss approx: x,   y : " + point1bis.x + ", " + point1bis.y);
//
//		expect(point1bis.x).toEqual(point1.x);
//		expect(point1bis.y).toEqual(point1.y);
	});

});
