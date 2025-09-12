import geojson from "./assets/indonesia.json";
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

const islandsOrder = ["Pulau Sumatra", "Pulau Kalimantan", "Pulau Sulawesi", "Kepulauan Nusa Tenggara", "Kepulauan Maluku", "Pulau Papua", "Pulau Jawa"];
let currentIslandIndex = null;

const geoLayer = L.geoJSON(allIslands, { style: defaultStyle }).addTo(map);

geoLayer.eachLayer(layer => {
   layer.on("mouseover", e => {
      map.getContainer().style.cursor = "pointer";
      layer.setStyle({ fillColor: "#ff9800", fillOpacity: 0.8 });
   });

   layer.on("mouseout", e => {
      map.getContainer().style.cursor = "";
      geoLayer.resetStyle(layer);
   });

   layer.on("click", async e => {
      const bounds = layer.getBounds();
      const center = bounds.getCenter();

      map.flyTo(center, 6, {
         animate: true,
         duration: 0.8,
      });

      await new Promise(resolve => setTimeout(resolve, 800));

      const name = (layer.feature && layer.feature.properties && (layer.feature.properties._name || layer.feature.properties.state)) || "Pulau";

      L.popup({
         closeButton: false,
         className: "map-label",
      })
         .setLatLng(center)
         .setContent(`<strong>${name}</strong>`)
         .openOn(map);

      currentIslandIndex = islandsOrder.indexOf(name);
   });
});

map.fitBounds(geoLayer.getBounds());

function flyToIsland(name) {
   geoLayer.eachLayer(async layer => {
      const islandName = layer.feature?.properties?._name;
      if (islandName === name) {
         const bounds = layer.getBounds();
         const center = bounds.getCenter();

         map.flyTo(center, 6, { animate: true, duration: 0.8 });

         await new Promise(resolve => setTimeout(resolve, 800));

         L.popup({
            closeButton: false,
            className: "map-label",
         })
            .setLatLng(center)
            .setContent(`<strong>${islandName}</strong>`)
            .openOn(map);
      }
   });
}

document.getElementById("prevIsland").addEventListener("click", () => {
   if (currentIslandIndex === null) {
      currentIslandIndex = islandsOrder.length - 1;
   } else {
      currentIslandIndex = (currentIslandIndex - 1 + islandsOrder.length) % islandsOrder.length;
   }
   console.log(currentIslandIndex);
   flyToIsland(islandsOrder[currentIslandIndex]);
});

document.getElementById("nextIsland").addEventListener("click", () => {
   if (currentIslandIndex === null) {
      currentIslandIndex = 0;
   } else {
      currentIslandIndex = (currentIslandIndex + 1) % islandsOrder.length;
   }
   console.log(currentIslandIndex);
   flyToIsland(islandsOrder[currentIslandIndex]);
});

document.getElementById("zoomOutIsland").addEventListener("click", () => {
   if (currentIslandIndex === null) return;

   map.closePopup();

   map.flyToBounds(rawBounds, {
      animate: true,
      duration: 0.8,
      maxZoom: 6,
   });

   currentIslandIndex = null;
});
