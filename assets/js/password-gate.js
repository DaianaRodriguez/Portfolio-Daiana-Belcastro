/* ==========================================================
   Password gate – protected case studies
   Change the password here (one place for all pages).
   Note: this is a soft gate (client-side), not real security.
   ========================================================== */
(function () {
	var PASSWORD = "12345678";
	var STORAGE_KEY = "dbPortfolioUnlocked";
	var EMAIL = "daiabelcastro@hotmail.com";

	var root = document.documentElement;
	if (!root.classList.contains("pg-locked")) return;

	// Project title from the page header
	var titleEl = document.querySelector(".ph-caption-title");
	var title = titleEl ? titleEl.innerHTML.replace(/<br\s*\/?>/gi, " ").replace(/<[^>]+>/g, "").trim() : "Protected case study";

	var gate = document.createElement("div");
	gate.id = "pg-gate";
	gate.setAttribute("role", "dialog");
	gate.setAttribute("aria-modal", "true");
	gate.setAttribute("aria-labelledby", "pg-title");
	gate.innerHTML =
		'<div class="pg-top">' +
			'<a class="pg-logo" href="index.html" aria-label="Home"><img src="assets/img/logo-light.png" alt="Daiana Belcastro"></a>' +
			'<a class="pg-back" href="index.html"><i class="fas fa-arrow-left"></i>Back to projects</a>' +
		'</div>' +
		'<div class="pg-main">' +
			'<div class="pg-label pg-anim"><span class="pg-lock"><i class="fas fa-lock"></i></span>Protected case study</div>' +
			'<h1 class="pg-title pg-anim" id="pg-title"></h1>' +
			'<p class="pg-text pg-anim">This project includes confidential work under NDA. Enter the password to view the full case study.</p>' +
			'<form class="pg-form pg-anim" novalidate>' +
				'<div class="pg-field">' +
					'<label for="pg-input" class="sr-only" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)">Password</label>' +
					'<input id="pg-input" class="pg-input" type="password" placeholder="Enter password" autocomplete="current-password" autofocus>' +
					'<button type="button" class="pg-toggle" aria-label="Show password"><i class="far fa-eye"></i></button>' +
					'<button type="submit" class="pg-submit" aria-label="Unlock"><i class="fas fa-arrow-right"></i></button>' +
				'</div>' +
				'<div class="pg-message" role="alert" aria-live="polite"></div>' +
			'</form>' +
		'</div>' +
		'<div class="pg-bottom">' +
			'<span>Don’t have the password? <a href="mailto:' + EMAIL + '">' + EMAIL + '</a></span>' +
		'</div>';

	gate.querySelector("#pg-title").textContent = title;
	document.body.insertBefore(gate, document.body.firstChild);

	var form = gate.querySelector(".pg-form");
	var input = gate.querySelector(".pg-input");
	var field = gate.querySelector(".pg-field");
	var msg = gate.querySelector(".pg-message");
	var toggle = gate.querySelector(".pg-toggle");

	setTimeout(function () { try { input.focus(); } catch (e) {} }, 300);

	toggle.addEventListener("click", function () {
		var show = input.type === "password";
		input.type = show ? "text" : "password";
		toggle.innerHTML = show ? '<i class="far fa-eye-slash"></i>' : '<i class="far fa-eye"></i>';
		toggle.setAttribute("aria-label", show ? "Hide password" : "Show password");
		input.focus();
	});

	input.addEventListener("input", function () {
		field.classList.remove("pg-error");
		msg.classList.remove("pg-show");
	});

	form.addEventListener("submit", function (e) {
		e.preventDefault();
		if (input.value === PASSWORD) {
			try { sessionStorage.setItem(STORAGE_KEY, "1"); } catch (err) {}
			gate.classList.add("pg-leaving");
			root.classList.remove("pg-locked");
			gate.style.display = "flex"; // keep visible while fading
			window.scrollTo(0, 0);
			setTimeout(function () {
				gate.parentNode && gate.parentNode.removeChild(gate);
				window.dispatchEvent(new Event("resize")); // let the theme recalc layout
			}, 850);
		} else {
			msg.textContent = input.value ? "Incorrect password. Please try again." : "Please enter the password.";
			msg.classList.add("pg-show");
			field.classList.add("pg-error");
			form.classList.remove("pg-shake");
			void form.offsetWidth;
			form.classList.add("pg-shake");
			input.select();
		}
	});
})();
