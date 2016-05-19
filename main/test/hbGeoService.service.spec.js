describe('coordinatesConversions', function () {

  beforeEach(module('hbUi.geo'));

  var $service;

  beforeEach(inject(function(_$service_){
    $service = _$service_;
  }));

  describe('swiss coordinates to latLng and back', function () {
		it('point1 should equal point1bis both in swiss federal coordinates', function () {
			
			var hbGeoService = $service('hbGeoService', { $log: $log });

        	var point1 = {"x" : 550000.85, "y" : 150002.65};
        	var latLng1 = hbGeoService.getLongitudeLatitudeCoordinates(point1.x, point1.y);
        	
        	$log.debug("    >>>>>>>>>>>>>>>>>>>>>>>>>>>>    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<    ");
        	$log.debug("point1                : " + angular.toJson(point1));
        	$log.debug("point1  => latLng1    : " + angular.toJson(latLng1));
        	var point1bis = hbGeoService.getSwissFederalCoordinates(latLng1.lat, latLng1.lng);
        	$log.debug("latLng1 => point1bis  : " + angular.toJson(point1bis));

        	$log.debug("    >>>>>>>>>>>>>>>>>>>>>>>>>>>>    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<    ");			

			expect(point1bis.lat).toBe(point1.lat);
			expect(point1bis.lng).toBe(point1.lng);
		});	
	});

});