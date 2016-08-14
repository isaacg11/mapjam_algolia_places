
// Init MapJam map
var map1 = new MJ.map('mapDiv', {
    centerMap: [37.784753, -122.404701],
    zoom: 2.4,
    accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1N2FmNmM5YzUxM2E3MDM2MDAyNzcxNzkiLCJpc3MiOiJtYXBqYW0uY29tIn0.2COM3S6NWaWy7i5RBA9Os6_TzuZPLR87180lLMeyJMA',
    markers:[]
});

// Algolia autocomplete
var placesAutocomplete = places({
  container: document.querySelector('#address-input')
});

// Instantiate a map and platform object:
var platform = new H.service.Platform({
  'app_id': 'gj7iJGrCpaSzZCpfYJXl',
  'app_code': '7-qD-TXlEzuPIqvQtQDA-Q'
});

var counter = 0;
var myMarker;
var address;

// Search Address
var form = document.getElementById('search-form');
form.addEventListener("submit", function(e) {
  e.preventDefault();
  counter = counter + 1;
  if(counter === 1) {
    address = document.getElementById('address-input').value;

    // Create the parameters for the geocoding request
    var geocodingParams = {
      searchText: address
    };

    // Get an instance of the geocoding service
    var geocoder = platform.getGeocodingService();

    // Callback function to process the geocoding response
    var onResult = function(result) {
      var address_lat = result.Response.View[0].Result[0].Location.NavigationPosition[0].Latitude;
      var address_lng = result.Response.View[0].Result[0].Location.NavigationPosition[0].Longitude;

      // MapJam marker with styling, icon, and note
      myMarker = new MJ.marker(map1, {
        latLng: [address_lat, address_lng],
        size: 'xl',  //valid sizes are xs, s, m, l, xl, xxl
        color: '#122337',
        backgroundColor: '#ffffff',
        locationPointColor: '#ffffff',
        ring:true,
        ringColor:'#ffffff',
        iconName: 'fa-search',
        iconColor: '#3383B6',
        note: {
          text: address,
          side: 'left',
          autoHide: false,
          color: '#3379A0',
          textColor: '#ffffff',
        }
      });
    };

    geocoder.geocode(geocodingParams, onResult, function(err) {
      alert(err);
    });
  }
  else {
    address = document.getElementById('address-input').value;

    // Create the parameters for the geocoding request
    var geocodingParams = {
      searchText: address
    };

    // Get an instance of the geocoding service
    var geocoder = platform.getGeocodingService();

    // Callback function to process the geocoding response
    var onResult = function(result) {
      var address_lat = result.Response.View[0].Result[0].Location.NavigationPosition[0].Latitude;
      var address_lng = result.Response.View[0].Result[0].Location.NavigationPosition[0].Longitude;
      MJ.updateMarkerLatLng(map1, myMarker, [address_lat, address_lng]);
      MJ.updateMarker(myMarker,{
        note: {
          text: address
        }
      });
    };

    geocoder.geocode(geocodingParams, onResult, function(err) {
      alert(err);
    });
  }
});
