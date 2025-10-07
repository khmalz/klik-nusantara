import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useRef } from "react";
import allIslands from "../data/islandBounds.js";

export default function IslandMap({ onSelectIsland }) {
   const mapRef = useRef();

   const defaultStyle = {
      color: "#333",
      weight: 1,
      fillColor: "#74c69d",
      fillOpacity: 0.6,
   };

   function onEachFeature(feature, layer) {
      const name = feature.properties?._name;

      layer.bindTooltip(`<strong>${name}</strong>`, {
         permanent: true,
         direction: "center",
         className: "map-label",
      });

      layer.on({
         mouseover: () => {
            layer.setStyle({ fillColor: "#ff9800", fillOpacity: 0.8 });
         },
         mouseout: () => {
            layer.setStyle(defaultStyle);
         },
         click: () => {
            onSelectIsland(name);
         },
      });
   }

   return (
      <div className="w-[90vw] h-[60vh] mx-auto border-2 border-gray-700 rounded-lg relative">
         <MapContainer
            center={[-2.5, 118]}
            zoom={5}
            maxZoom={6}
            ref={mapRef}
            bounds={[
               [-11, 95],
               [6, 141],
            ]}
            zoomControl={false}
            scrollWheelZoom={false}
            doubleClickZoom={false}
            dragging={true}
            className="w-full h-full">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
            <GeoJSON data={allIslands} style={defaultStyle} onEachFeature={onEachFeature} />
         </MapContainer>
      </div>
   );
}
