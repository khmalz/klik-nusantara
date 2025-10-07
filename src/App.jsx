import { useEffect, useCallback, useMemo } from "react";
import { useIslandStore } from "./store/islandStore";
import IslandMap from "./components/IslandMap";
import IslandPopup from "./components/IslandPopup";

export default function App() {
   const { selectedIsland, setSelectedIsland, fetchIslandImage } = useIslandStore();

   const islandOrder = useMemo(
      () => ["Pulau Sumatra", "Pulau Kalimantan", "Pulau Sulawesi", "Kepulauan Nusa Tenggara", "Kepulauan Maluku", "Pulau Papua", "Pulau Jawa"],
      []
   );

   useEffect(() => {
      if (selectedIsland) fetchIslandImage(selectedIsland);
   }, [selectedIsland, fetchIslandImage]);

   const handlePrev = useCallback(() => {
      if (!selectedIsland) return;
      const currentIndex = islandOrder.indexOf(selectedIsland);
      const prevIndex = (currentIndex - 1 + islandOrder.length) % islandOrder.length;
      setSelectedIsland(islandOrder[prevIndex]);
   }, [selectedIsland, islandOrder, setSelectedIsland]);

   const handleNext = useCallback(() => {
      if (!selectedIsland) return;
      const currentIndex = islandOrder.indexOf(selectedIsland);
      const nextIndex = (currentIndex + 1) % islandOrder.length;
      setSelectedIsland(islandOrder[nextIndex]);
   }, [selectedIsland, islandOrder, setSelectedIsland]);

   return (
      <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
         <h1 className="text-3xl font-bold mb-6">Klik Nusantara</h1>
         <IslandMap onSelectIsland={setSelectedIsland} />
         {selectedIsland && (
            <IslandPopup onPrev={handlePrev} onNext={handleNext} onClose={() => setSelectedIsland(null)} />
         )}
      </div>
   );
}
