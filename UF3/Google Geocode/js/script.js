let map;

async function initMap() {
    //Aqui importo la biblioteca de google maps
  const { Map } = await google.maps.importLibrary("maps");
  const myLatLng = { lat: 41.390205, lng: 2.154007  };
  
//Creo el mapa en la id y le indico la lat y lng + el zoom que quiero que tenga
  map = new Map(document.getElementById("map"), {
    center: myLatLng,
    zoom: 16,
  });
  //Aqui creo el marker que se ve en el mapa
  new google.maps.Marker({
    position: myLatLng,
    map,
    title: "Hello World!",
  });
}
  window.initMap = initMap;

async function geoCode(){
  let geocoder = new google.maps.Geocoder();
  let address="Carrer de la Selva de Mar 211 08020 Barcelona";
  geocoder.geocode( { 'address': address}, function(results, status) {
  
    if (status == google.maps.GeocoderStatus.OK) {
    latitude = results[0].geometry.location.lat();
    console.log(latitude);
    longitude = results[0].geometry.location.lng();
    console.log(longitude);
    }
  });
}



