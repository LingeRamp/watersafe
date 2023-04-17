import React, { useRef, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function MapView() {
  const mapRef = useRef(null);

  useEffect(() => {
    // create map instance and set view to your location
    const map = L.map(mapRef.current).setView([YOUR_LATITUDE, YOUR_LONGITUDE], 13);

    // add tile layer from OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    // add marker for your location
    const marker = L.marker([YOUR_LATITUDE, YOUR_LONGITUDE]).addTo(map);

    return () => {
      // clean up map instance when component unmounts
      map.remove();
    };
  }, []);

  return <div className="map-view" ref={mapRef} />;
}

export default MapView;


