/**
 * hbGeoSwissCoordinatesService provides conversion from and to World Geodetic System (WGS) to Swiss Federal Coordinates System(s).
 * 
 * See: Swiss Federal Office of Topography swisstopo 
 * 
 * http://www.swisstopo.admin.ch/internet/swisstopo/en/home/topics/survey/sys/refsys/projections.html (see PDFs under "Documentation")
 * http://www.swisstopo.admin.ch/internet/swisstopo/en/home/apps/calc/navref.html
 * http://www.swisstopo.admin.ch/internet/swisstopo/en/home/products/software/products/m2m.html
 * 
 * References, section 4.1:
 * 
 * http://www.swisstopo.admin.ch/internet/swisstopo/fr/home/topics/survey/sys/refsys/switzerland.parsysrelated1.31216.downloadList.63873.DownloadFile.tmp/swissprojectionfr.pdf
 * http://mapref.org/LinkedDocuments/swiss_projection_en.pdf 
 * 
 */
(function() {

	angular.module('hbUi.geo').factory('hbGeoSwissCoordinatesService', ['Restangular', '$log', function(Restangular, $log) {

		$log.debug(">>> hbGeoSwissCoordinatesService factory start...");
    	
    	var _restHbGeoApi = undefined;
    	
    	var setRestHbGeoApi = function() {

    		var restHbGeoApi = Restangular.withConfig( function(Configurer) {
            	/*
            	   To allow single configuration point on the server side 
            	   hbGeoApiUrl variable is contained in conf.js file dynamically 
            	   created by the server. This URL is a proxy forwarding to actual 
            	   hb-geo-api service which may have different protocol, host and 
            	   port.  
            	*/
            	if (hbGeoApiUrl==null) {
            		$log.error("hbGeoSwissCoordinatesService required hbGeoApiUrl information missing. This information is served dynamically by the HyperBird server, please make sure it is running.");
            	} else {
            		$log.debug("hbGeoSwissCoordinatesService required hbGeoApiUrl: " + hbGeoApiUrl);
            		Configurer.setBaseUrl(hbGeoApiUrl);
//                	var defaultHeadersObj = {};
//                	defaultHeadersObj["Content-Type"] = "application/json";
//                	Configurer.setDefaultHeaders( defaultHeadersObj );            		
            	}
            });
    		
    		// TODO: Clarify
    		_restHbGeoApi = restHbGeoApi.all('');
    		
    	};
    	
    	setRestHbGeoApi();		
		
		return {
                getLongitudeLatitudeCoordinates: function(x_param, y_param) {
                	var restGetQuery = "coordinates/gps/"+x_param+"/"+y_param+"/477.0";
                	$log.debug("REMOTE: restGetQuery = " + restGetQuery);
                	return _restHbGeoApi.one(restGetQuery);
                },
                getLongitudeLatitudeCoordinatesList: function() {
                	var restPostQueryURL = "coordinates/gps/";
                	$log.debug("REMOTE: restPostQueryURL = " + restPostQueryURL);
                	return _restHbGeoApi.all(restPostQueryURL);
                },                
                getSwissFederalCoordinates: function(x_param, y_param) {
                	var restGetQuery = "coordinates/swiss/"+x_param+"/"+y_param+"/527.0";
                	$log.debug("REMOTE: restGetQuery = " + restGetQuery);
                	return _restHbGeoApi.one(restGetQuery);
                },
                getCoordinatesBoundsForRaster: function() {
                	var restPostQueryURL = "coordinates/raster/bounds/"; 
                	$log.debug("REMOTE: restPostQueryURL = " + restPostQueryURL);
                	return _restHbGeoApi.all(restPostQueryURL);
                }
		}
    }]);

})();