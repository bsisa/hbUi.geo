
describe('Coordinates conversions', function() {

	beforeEach(function() {
		module('hbUi.geo')
	});

	// Defined out reference variable outside
	var hbGeoService;

	// Wrap the parameter in underscores
	beforeEach(inject(function(_hbGeoService_) {
		hbGeoService = _hbGeoService_;
	}));

	it('point1 {x,y} should equal point1bis {x,y} in swiss federal coordinates',
			function() {

				var point1 = {
					"x" : 550000.85,
					"y" : 150002.65
				};
				var latLng1 = hbGeoService.getLongitudeLatitudeCoordinates(
						point1.x, point1.y);
				var point1bis = hbGeoService.getSwissFederalCoordinates(
						latLng1.lat, latLng1.lng);

				expect(point1bis.x).toEqual(point1.x);
				expect(point1bis.y).toEqual(point1.y);
				
			});

});
