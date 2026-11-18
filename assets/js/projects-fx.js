/* ==========================================================
   Home – project thumbnails gradient effect (touch support)
   On touch devices (no hover) real colors show on tap and
   when the card is in the middle of the screen.
   ========================================================== */
(function () {
	var noHover = window.matchMedia && window.matchMedia("(hover: none)").matches;
	if (!noHover) return;

	var items = document.querySelectorAll("#portfolio-grid .portfolio-grid-item");
	items.forEach(function (item) {
		item.addEventListener("touchstart", function () { item.classList.add("pgi-fx-on"); }, { passive: true });
	});

	if ("IntersectionObserver" in window) {
		var io = new IntersectionObserver(function (entries) {
			entries.forEach(function (en) {
				en.target.classList.toggle("pgi-fx-on", en.isIntersecting);
			});
		}, { rootMargin: "-40% 0px -40% 0px" });
		items.forEach(function (item) { io.observe(item); });
	}
})();
