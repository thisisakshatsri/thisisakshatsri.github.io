
const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 11,
    center: { lat: 28.6139, lng: 77.2090 },
  });
  
  const redCoordinates = [
    { lat: 28.6139, lng: 77.2090 },
    { lat: 28.5244, lng: 77.1855 },
    { lat: 28.7041, lng: 77.1025 },
    { lat: 28.5403, lng: 77.0423 },
  ];
  
  const blueCoordinates = [
    { lat: 28.6139, lng: 77.2090 },
    { lat: 28.5535, lng: 77.0704 },
    { lat: 28.6100, lng: 77.2389 },
  ];
  
  const yellowCoordinates = [
    { lat: 28.6139, lng: 77.2090 },
    { lat: 28.4848, lng: 77.0941 },
    { lat: 28.6100, lng: 77.2389 },
  ];
  
  const redLine = new google.maps.Polyline({
    path: redCoordinates,
    geodesic: true,
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
  
  const blueLine = new google.maps.Polyline({
    path: blueCoordinates,
    geodesic: true,
    strokeColor: "#0000FF",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
  
  const yellowLine = new google.maps.Polyline({
    path: yellowCoordinates,
    geodesic: true,
    strokeColor: "#FFFF00",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
  
  document.getElementById("route-selector").addEventListener("change", function (event) {
    const selectedRoute = event.target.value;
  
    switch (selectedRoute) {
      case "red":
        redLine.setMap(map);
        blueLine.setMap(null);
        yellowLine.setMap(null);
        break;
      case "blue":
        redLine.setMap(null);
        blueLine.setMap(map);
        yellowLine.setMap(null);
        break;
      case "yellow":
        redLine.setMap(null);
        blueLine.setMap(null);
        yellowLine.setMap(map);
        break;
      default:
        redLine.setMap(null);
        blueLine.setMap(null);
        yellowLine.setMap(null);
        break;
    }
  });