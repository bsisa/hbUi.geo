
describe('coordinatesConversions', function() {

	beforeEach(function() {
		module('hbUi.geo')
	});

	// Defined out reference variable outside
	var hbGeoService;

	// Wrap the parameter in underscores
	beforeEach(inject(function(_hbGeoService_) {
		hbGeoService = _hbGeoService_;
	}));

	it('point1 should equal point1bis both in swiss federal coordinates',
			function() {

				var point1 = {
					"x" : 550000.85,
					"y" : 150002.65
				};
				var latLng1 = hbGeoService.getLongitudeLatitudeCoordinates(
						point1.x, point1.y);
				var point1bis = hbGeoService.getSwissFederalCoordinates(
						latLng1.lat, latLng1.lng);

				// expect(point1bis.lat).toBe(point1.lat);
				expect(point1bis.lat).toEqual(point1.lat);
				// expect(point1bis.lng).toBe(point1.lng);
				expect(point1bis.lng).toEqual(point1.lng);
			});

});
