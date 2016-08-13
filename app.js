
// MapJam map
var map1 = new MJ.map('mapDiv', {
    centerMap: [37.784753, -122.404701],
    zoom: 16,
    accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1N2FmNmM5YzUxM2E3MDM2MDAyNzcxNzkiLCJpc3MiOiJtYXBqYW0uY29tIn0.2COM3S6NWaWy7i5RBA9Os6_TzuZPLR87180lLMeyJMA',
    markers:[]
});


// MapJam marker with styling, icon, and note
var myMarker = new MJ.marker(map1, {
    latLng: [37.784232, -122.404711],
    size: 'xl',  //valid sizes are xs, s, m, l, xl, xxl
    color: '#ff0000',
    backgroundColor: '#ffff00',
    locationPointColor: '#00ffff',
    ring:true,
    ringColor:'#00ff00',
    iconName: 'fa-glass',
    iconColor: '#ff00ff',
    note: {
        text: '500 Bar & Grill',
        side: 'left',
        autoHide: false,
        color: '#0000ff',
        textColor: '#ffffff',
    }
});

// MapJam marker animation
var messageNum = 0;
var messages = ['500 Martinis', '$5.00 Burgers', '500 Smiles', '500 Bar & Grill'];

setTimeout(makeSmall, 5000)

function makeSmall() {
    MJ.updateMarker(myMarker, {'size':'xs'});
    setTimeout(changeText, 500)
}

function changeText() {
    if (messageNum == 1 || messageNum == 3)
        var noteSide = 'left';
    else
        var noteSide = 'right';

    MJ.updateMarker(myMarker, {note: { text: messages[messageNum], side: noteSide }});

    MJ.updateMarker(myMarker, {'size':'xl'});
    if (++messageNum == 4)
        messageNum = 0

    setTimeout(makeSmall, 5000);
}

// Algolia autocomplete
var placesAutocomplete = places({
  container: document.querySelector('#address-input')
});

// Instantiate a map and platform object:
var platform = new H.service.Platform({
  'app_id': 'gj7iJGrCpaSzZCpfYJXl',
  'app_code': '7-qD-TXlEzuPIqvQtQDA-Q'
});


// Search Address
document.getElementById('address-input').onkeypress = function(e){
  if (!e) e = window.event;
  var keyCode = e.keyCode || e.which;
  if (keyCode == '13'){
    var address = document.getElementById('address-input').value;

    // Create the parameters for the geocoding request:
    var geocodingParams = {
      searchText: '200 S Mathilda Ave, Sunnyvale, CA'
    };

    // Get an instance of the geocoding service:
    var geocoder = platform.getGeocodingService();

    // Define a callback function to process the geocoding response:
    var onResult = function(result) {
      console.log(result);
    };

    geocoder.geocode(geocodingParams, onResult, function(e) {
      alert(e);
    });
  };
}
