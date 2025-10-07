import { useState, useEffect, useCallback, useMemo } from "react";
import IslandMap from "./components/IslandMap";
import IslandPopup from "./components/IslandPopup";

const islandMap = {
   "Pulau Sumatra": () => import("./assets/islands/sumatera.svg"),
   "Pulau Kalimantan": () => import("./assets/islands/kalimantan.svg"),
   "Pulau Sulawesi": () => import("./assets/islands/sulawesi.svg"),
   "Kepulauan Nusa Tenggara": () => import("./assets/islands/nusaTenggara.svg"),
   "Kepulauan Maluku": () => import("./assets/islands/maluku.svg"),
   "Pulau Papua": () => import("./assets/islands/papua.svg"),
   "Pulau Jawa": () => import("./assets/islands/jawa.svg"),
};

export default function App() {
   const [selectedIsland, setSelectedIsland] = useState(null);
   const [imageSrc, setImageSrc] = useState(null);
   const [loadingImage, setLoadingImage] = useState(false);

   const islandOrder = useMemo(() => ["Pulau Sumatra", "Pulau Kalimantan", "Pulau Sulawesi", "Kepulauan Nusa Tenggara", "Kepulauan Maluku", "Pulau Papua", "Pulau Jawa"], []);

   const loadDefault = () => import("./assets/islands/default.svg");

   const loadIslandImage = useCallback(async name => {
      setLoadingImage(true);
      try {
         const mod = await (islandMap[name] ? islandMap[name]() : loadDefault());
         const img = new Image();
         img.src = mod.default;
         img.onload = () => {
            setImageSrc(mod.default);
            setLoadingImage(false);
         };
      } catch (err) {
         console.error("Gagal load gambar:", err);
         const mod = await loadDefault();
         setImageSrc(mod.default);
         setLoadingImage(false);
      }
   }, []);

   useEffect(() => {
      if (selectedIsland) loadIslandImage(selectedIsland);
   }, [selectedIsland, loadIslandImage]);

   const handlePrev = useCallback(() => {
      if (!selectedIsland) return;
      const currentIndex = islandOrder.indexOf(selectedIsland);
      const prevIndex = (currentIndex - 1 + islandOrder.length) % islandOrder.length;
      setSelectedIsland(islandOrder[prevIndex]);
   }, [selectedIsland, islandOrder]);

   const handleNext = useCallback(() => {
      if (!selectedIsland) return;
      const currentIndex = islandOrder.indexOf(selectedIsland);
      const nextIndex = (currentIndex + 1) % islandOrder.length;
      setSelectedIsland(islandOrder[nextIndex]);
   }, [selectedIsland, islandOrder]);

   return (
      <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
         <h1 className="text-3xl font-bold mb-6">Klik Nusantara</h1>

         <IslandMap onSelectIsland={setSelectedIsland} />

         {selectedIsland && <IslandPopup islandName={selectedIsland} imageSrc={imageSrc} loading={loadingImage} onClose={() => setSelectedIsland(null)} onPrev={handlePrev} onNext={handleNext} />}
      </div>
   );
}
