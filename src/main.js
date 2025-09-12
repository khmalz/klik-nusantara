import geojson from "./assets/indonesia-province-simple.json";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import allIslands from "./islandBounds";

const defaultStyle = {
   color: "#333",
   weight: 1,
   fillColor: "#74c69d",
   fillOpacity: 0.6,
};

const islandsOrder = ["Pulau Sumatra", "Pulau Kalimantan", "Pulau Sulawesi", "Kepulauan Nusa Tenggara", "Kepulauan Maluku", "Pulau Papua", "Pulau Jawa"];

let currentIslandIndex = null;

const rawBounds = L.geoJSON(geojson).getBounds();
const paddedBounds = [
   [rawBounds.getSouth() - 10, rawBounds.getWest() - 10],
   [rawBounds.getNorth() + 10, rawBounds.getEast() + 10],
];

const map = L.map("map", {
   maxBounds: paddedBounds,
   maxBoundsViscosity: 0.6,
   minZoom: 4,
}).fitBounds(rawBounds);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
   attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

const geoLayer = L.geoJSON(allIslands, { style: defaultStyle }).addTo(map);
map.fitBounds(geoLayer.getBounds());

/**
 * Show popup at given coordinates
 */
function showPopup(center, name) {
   L.popup({ closeButton: false, className: "map-label" }).setLatLng(center).setContent(`<strong>${name}</strong>`).openOn(map);
}

/**
 * Fly to a given island by name
 */
async function flyToIsland(name) {
   geoLayer.eachLayer(async layer => {
      const islandName = layer.feature?.properties?._name;
      if (islandName === name) {
         const bounds = layer.getBounds();
         const center = bounds.getCenter();

         map.flyTo(center, 6, { animate: true, duration: 0.8 });
         await new Promise(resolve => setTimeout(resolve, 800));

         showPopup(center, islandName);
      }
   });
}

/**
 * Handle updating currentIslandIndex and fly
 */
function goToNextIsland() {
   if (currentIslandIndex === null) currentIslandIndex = 0;
   else currentIslandIndex = (currentIslandIndex + 1) % islandsOrder.length;

   flyToIsland(islandsOrder[currentIslandIndex]);
}

function goToPrevIsland() {
   if (currentIslandIndex === null) currentIslandIndex = islandsOrder.length - 1;
   else currentIslandIndex = (currentIslandIndex - 1 + islandsOrder.length) % islandsOrder.length;

   flyToIsland(islandsOrder[currentIslandIndex]);
}

/**
 * Reset map to default bounds
 */
function zoomOutMap() {
   map.closePopup();
   map.flyToBounds(rawBounds, { animate: true, duration: 0.8, maxZoom: 6 });
   currentIslandIndex = null;
}

/**
 * Highlight and interaction for each layer
 */
function setupLayerInteractions() {
   geoLayer.eachLayer(layer => {
      layer.on("mouseover", () => {
         map.getContainer().style.cursor = "pointer";
         layer.setStyle({ fillColor: "#ff9800", fillOpacity: 0.8 });
      });

      layer.on("mouseout", () => {
         map.getContainer().style.cursor = "";
         geoLayer.resetStyle(layer);
      });

      layer.on("click", async () => {
         const bounds = layer.getBounds();
         const center = bounds.getCenter();
         const name = layer.feature?.properties?._name || layer.feature?.properties?.state || "Pulau";

         map.flyTo(center, 6, { animate: true, duration: 0.8 });
         await new Promise(resolve => setTimeout(resolve, 800));

         showPopup(center, name);

         // Update current index for next/prev buttons
         currentIslandIndex = islandsOrder.indexOf(name);
      });
   });
}

document.getElementById("prevIsland").addEventListener("click", goToPrevIsland);

document.getElementById("nextIsland").addEventListener("click", goToNextIsland);

document.getElementById("zoomOutIsland").addEventListener("click", zoomOutMap);

// ------------------ Initialize ------------------
setupLayerInteractions();
