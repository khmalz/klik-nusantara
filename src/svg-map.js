const jawa = document.getElementById("Pulau-Jawa");

jawa.style.cursor = "pointer";

jawa.addEventListener("click", () => {
   alert("Kamu klik: Pulau Jawa");
});

jawa.addEventListener("mouseenter", () => {
   jawa.querySelectorAll("path").forEach(p => (p.style.fill = "#ff9800"));
});

jawa.addEventListener("mouseleave", () => {
   jawa.querySelectorAll("path").forEach(p => (p.style.fill = ""));
});
