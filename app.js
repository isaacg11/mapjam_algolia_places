

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

// Global variables
var openStreetMapGeocoder = GeocoderJS.createGeocoder('openstreetmap');
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

    //Geocoding
    openStreetMapGeocoder.geocode(address, function(result) {
      if(result.length === 0) {
        toastr.info("Sorry, address not found");
      }
      else {
        var address_lat = result[0].latitude;
        var address_lng = result[0].longitude;

        //MapJam marker with styling, icon, and note
        myMarker = new MJ.marker(map1, {
          latLng: [address_lat, address_lng],
          size: 'xl',  //valid sizes are xs, s, m, l, xl, xxl
          color: '#37b28d',
          backgroundColor: '#ffffff',
          locationPointColor: '#ffffff',
          ring:true,
          ringColor:'#ffffff',
          iconName: 'fa-search',
          iconColor: '#c395d0',
          note: {
            text: address,
            side: 'left',
            autoHide: false,
            color: '#ffffff',
            textColor: '#37b28d',
          }
        });
      }
    });
  }
  else {
    address = document.getElementById('address-input').value;

    //Geocoding
    openStreetMapGeocoder.geocode(address, function(result) {
      if(result.length === 0) {
        toastr.info("Sorry, address not found");
      }
      else {
        var address_lat = result[0].latitude;
        var address_lng = result[0].longitude;

        MJ.updateMarkerLatLng(map1, myMarker, [address_lat, address_lng]);
        MJ.updateMarker(myMarker,{
          note: {
            text: address
          }
        });
      }
    });
  }
});

// Email signup
function signup() {
  var email = document.getElementById('email').value;
  Stamplay.Object('signups').save({email: email}).then(function(res) {
    toastr.info('Signup Successful!');
    document.getElementById('email').value = '';
  })
};
