let map;
let address = "";

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
    title: "ITICBCN",
  });
  document.getElementById("adreca").value = "Carrer de la Selva de Mar 211 08020 Barcelona";
}
  window.initMap = initMap;

async function geoCode() {
  let geocoder = new google.maps.Geocoder();
  geocoder.geocode({ 'address': address }, function (results, status) {
  
  if (status == google.maps.GeocoderStatus.OK) {
    latitude = results[0].geometry.location.lat();
    longitude = results[0].geometry.location.lng();
  
    let center = new google.maps.LatLng(latitude, longitude);
    map.setCenter(center);
    map.setZoom(16);
  
  
    new google.maps.Marker({
      position: center,
      map,
      title: address,
      });
    } else {
      console.error("ERROR: " + status);
    }
  });
}


document.addEventListener("DOMContentLoaded", function () {
  //Aqui miro si se pulsa el boton de buscar, me guardo la informacion del input para depues ir a la funcion geoCode
  //y buscar la informacion por la API de GOOGLE MAPS
  document.getElementById("findLoc").addEventListener("click", function () {
    address = document.getElementById("adreca").value;
    geoCode();
  });

  //Aqui escucho el boton de mi ubicación para buscar mi ubicacion por la API de GOOGLE MAPS en la funcion geoCodeMe
  document.getElementById("findMe").addEventListener("click", function () {
    geoCodeMe();
  });
});

async function geoCodeMe() {

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      let pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      map.setCenter(pos);
      map.setZoom(9);
      let marker = new google.maps.Marker({
        position: pos,
        map: map,
        title: "Mi UBICAIÓN",
        icon: {
          url: 'img/marker.png',
          scaledSize: new google.maps.Size(32, 32)
        }
      });
    });
  }

}
