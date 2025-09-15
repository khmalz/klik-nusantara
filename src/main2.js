const popup = document.getElementById("islandPopup");
const islandImage = document.getElementById("islandImage");
const islandTitle = document.getElementById("islandTitle");
const closePopup = document.getElementById("closePopup");

const islandImageMap = {
   "Pulau Sumatra": new URL("./assets/islands/sumatera.svg", import.meta.url).href,
   "Pulau Jawa": new URL("./assets/islands/jawa.svg", import.meta.url).href,
   "Pulau Kalimantan": new URL("./assets/islands/kalimantan.svg", import.meta.url).href,
   "Pulau Sulawesi": new URL("./assets/islands/sulawesi.svg", import.meta.url).href,
   "Kepulauan Maluku": new URL("./assets/islands/maluku.svg", import.meta.url).href,
   "Kepulauan Nusa Tenggara": new URL("./assets/islands/nusaTenggara.svg", import.meta.url).href,
   "Pulau Papua": new URL("./assets/islands/papua.svg", import.meta.url).href,
};

closePopup.addEventListener("click", () => {
   popup.classList.add("hidden");
});

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

const rawBounds = L.geoJSON(geojson).getBounds();

const map = L.map("map2", {
   zoomControl: false,
   dragging: false,
   scrollWheelZoom: false,
   doubleClickZoom: false,
   boxZoom: false,
   keyboard: false,
   touchZoom: false,
}).fitBounds(rawBounds);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
   attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

const geoLayer = L.geoJSON(allIslands, { style: defaultStyle }).addTo(map);
map.fitBounds(geoLayer.getBounds());

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

      layer.on("click", () => {
         const name = layer.feature?.properties?._name || "Pulau";
         islandTitle.textContent = name;

         const fileUrl = islandImageMap[name] || new URL("./assets/islands/default.svg", import.meta.url).href;

         islandImage.onload = () => {
            islandImage.classList.remove("hidden");
            popup.classList.remove("hidden");
         };

         islandImage.src = fileUrl;
      });
   });

   geoLayer.eachLayer(layer => {
      const name = (layer.feature && layer.feature.properties && (layer.feature.properties._name || layer.feature.properties.state)) || "Pulau";
      layer.bindTooltip(`<strong>${name}</strong>`, {
         permanent: true,
         direction: "center",
         className: "map-label",
      });
   });
}

// ------------------ Initialize ------------------
setupLayerInteractions();

const islandsOrder = ["Pulau Sumatra", "Pulau Kalimantan", "Pulau Sulawesi", "Kepulauan Nusa Tenggara", "Kepulauan Maluku", "Pulau Papua", "Pulau Jawa"];

let currentIslandIndex = null;

function showIslandInPopup(islandName) {
   const name = islandName || "Pulau";
   islandTitle.textContent = name;

   islandImage.classList.add("hidden");

   const fileUrl = islandImageMap[name] || new URL("./assets/islands/default.svg", import.meta.url).href;
   islandImage.onload = () => {
      islandImage.classList.remove("hidden");
   };
   islandImage.src = fileUrl;

   popup.classList.remove("hidden");
}

geoLayer.eachLayer(layer => {
   layer.on("click", () => {
      const name = layer.feature?.properties?._name || "Pulau";
      currentIslandIndex = islandsOrder.indexOf(name);
      showIslandInPopup(name);
   });
});

document.getElementById("prevPopupIsland").addEventListener("click", () => {
   if (currentIslandIndex === null) return;
   currentIslandIndex = (currentIslandIndex - 1 + islandsOrder.length) % islandsOrder.length;
   showIslandInPopup(islandsOrder[currentIslandIndex]);
});

document.getElementById("nextPopupIsland").addEventListener("click", () => {
   if (currentIslandIndex === null) return;
   currentIslandIndex = (currentIslandIndex + 1) % islandsOrder.length;
   showIslandInPopup(islandsOrder[currentIslandIndex]);
});
