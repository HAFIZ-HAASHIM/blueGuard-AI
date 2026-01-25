"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default icon paths for Leaflet in bundlers
const DefaultIcon = L.icon({
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

type MapViewProps = {
  lat: number;
  lng: number;
  popup?: string;
  height?: string | number;
};

export default function MapView({ lat, lng, popup, height = 400 }: MapViewProps) {
  // Ensure map renders only on client
  useEffect(() => {}, []);

  return (
    <div style={{ height, width: "100%" }}>
      <MapContainer
        center={[lat, lng]}
        zoom={14}
        style={{ height: "100%", width: "100%", borderRadius: 8, overflow: "hidden" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[lat, lng]}>
          <Popup>{popup || "Waste detected here"}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
