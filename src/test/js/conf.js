
// ================================================================
// ==  Mocks config info obtained at:                            ==
// ==  http://rest.server.location/config.js                     ==
// ================================================================

//var restHbGeoApiUrl = "http://localhost:9000/api/melfin/" ;
//var restHbGeoApiUrl = "http://localhost:9001/api/hb/geo/" ;
//DIRECT TRANFORMATION FROM 1903 <=> WGS84
//
// 1903 => WGS84 
//http://geodesy.geo.admin.ch/reframe/lv03towgs84?easting=561440.184310663&northing=204769.044093776&format=json
//{"easting": "6.931704420427172", "northing": "46.992859388431334"}
//
// WGS84 => 1903
//http://geodesy.geo.admin.ch/reframe/wgs84tolv03?easting=6.931704420427172&northing=46.992859388431334&format=json
//{"easting": "561440.1848373807", "northing": "204769.04525083603"}

//var restHbGeoApiUrl = "http://geodesy.geo.admin.ch/reframe/" ;


// http://localhost:9000/coordinates/gps/561440.184310663/204769.044093776/0.0
// http://localhost:9000/coordinates/swiss/6.870381148/46.750418879/526.55
var hbGeoApiUrl = "http://localhost:9001/" ;

var clientDebugEnabled = true;
