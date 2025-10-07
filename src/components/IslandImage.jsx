export default function IslandImage({ src, alt, isLoading }) {
   return (
      <div className="relative flex justify-center items-center w-full h-full">
         {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
         )}

         {src && <img src={src} alt={alt} loading="lazy" className={`max-h-[360px] object-contain rounded-lg transition duration-500 ${isLoading ? "opacity-0" : "opacity-100"}`} />}
      </div>
   );
}
