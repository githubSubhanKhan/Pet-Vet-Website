/* Massapequa Pet Vet — concept landing page interactions */
(function () {
  "use strict";

  /* ---------- Clinic hours (America/New_York) ---------- */
  // 0 = Sunday … 6 = Saturday. Times in minutes after midnight.
  var HOURS = {
    0: null,
    1: [510, 1020],
    2: [510, 1140],
    3: [510, 1020],
    4: [510, 1140],
    5: [510, 1020],
    6: [510, 1020]
  };
  var DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  function nowInNewYork() {
    var parts = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/New_York", weekday: "short", hour: "numeric", minute: "numeric", hour12: false
    }).formatToParts(new Date());
    var map = {};
    parts.forEach(function (p) { map[p.type] = p.value; });
    var day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(map.weekday);
    var hour = parseInt(map.hour, 10) % 24;
    return { day: day, minutes: hour * 60 + parseInt(map.minute, 10) };
  }

  function fmt(mins) {
    var h = Math.floor(mins / 60), m = mins % 60;
    var suffix = h >= 12 ? "pm" : "am";
    var h12 = h % 12 || 12;
    return h12 + (m ? ":" + String(m).padStart(2, "0") : "") + " " + suffix;
  }

  function nextOpening(day, minutes) {
    for (var i = 0; i < 8; i++) {
      var d = (day + i) % 7, h = HOURS[d];
      if (!h) continue;
      if (i === 0 && minutes >= h[0]) continue;
      var label = i === 0 ? "today" : i === 1 ? "tomorrow" : DAY_NAMES[d];
      return label + " at " + fmt(h[0]);
    }
    return "soon";
  }

  function updateStatus() {
    var el = document.querySelector("[data-status]");
    if (!el) return;
    var t = nowInNewYork(), h = HOURS[t.day], text = el.querySelector(".status__text");
    if (h && t.minutes >= h[0] && t.minutes < h[1]) {
      var left = h[1] - t.minutes;
      el.dataset.state = left <= 45 ? "soon" : "open";
      text.textContent = (left <= 45 ? "Closing soon, " : "Open now, ") + "until " + fmt(h[1]);
    } else {
      el.dataset.state = "closed";
      text.innerHTML = "Closed now, opens " + nextOpening(t.day, t.minutes) +
        '. After hours, call <a href="tel:6315870800">631.587.0800</a>';
    }

    var rows = document.querySelectorAll(".hours tr[data-day]");
    rows.forEach(function (r) { r.classList.toggle("is-today", Number(r.dataset.day) === t.day); });
  }
  updateStatus();
  setInterval(updateStatus, 60000);

  /* ---------- Header shadow on scroll ---------- */
  var header = document.querySelector(".header");
  function onScroll() { header.classList.toggle("is-scrolled", window.scrollY > 8); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile navigation ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("nav");
  function setNav(open) {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    nav.classList.toggle("is-open", open);
  }
  toggle.addEventListener("click", function () { setNav(toggle.getAttribute("aria-expanded") !== "true"); });
  nav.addEventListener("click", function (e) { if (e.target.closest("a")) setNav(false); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("is-open")) { setNav(false); toggle.focus(); }
  });
  window.matchMedia("(min-width: 1081px)").addEventListener("change", function (m) { if (m.matches) setNav(false); });

  /* ---------- Services filter ---------- */
  var chips = document.querySelectorAll(".chip[data-filter]");
  var items = document.querySelectorAll(".svc__list li");
  var count = document.querySelector(".svc__count");
  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      var f = chip.dataset.filter, shown = 0;
      chips.forEach(function (c) { c.setAttribute("aria-pressed", String(c === chip)); });
      items.forEach(function (li) {
        var match = f === "all" || li.dataset.cat.split(" ").indexOf(f) > -1;
        li.hidden = !match;
        li.classList.remove("is-in");
        if (match) { void li.offsetWidth; li.classList.add("is-in"); li.style.animationDelay = (shown * 30) + "ms"; shown++; }
      });
      count.textContent = f === "all" ? "Showing all " + shown + " services"
        : "Showing " + shown + " " + (shown === 1 ? "service" : "services") + " in " + chip.textContent.toLowerCase();
    });
  });

  /* ---------- Team scroller ---------- */
  var scroller = document.querySelector("[data-scroller]");
  var btns = document.querySelectorAll("[data-scroll]");
  function updateBtns() {
    var max = scroller.scrollWidth - scroller.clientWidth - 2;
    btns[0].disabled = scroller.scrollLeft <= 2;
    btns[1].disabled = scroller.scrollLeft >= max;
  }
  btns.forEach(function (b) {
    b.addEventListener("click", function () {
      var card = scroller.querySelector(".vet");
      var step = card ? card.getBoundingClientRect().width + 16 : 240;
      scroller.scrollBy({ left: step * Number(b.dataset.scroll), behavior: "smooth" });
    });
  });
  scroller.addEventListener("scroll", updateBtns, { passive: true });
  window.addEventListener("resize", updateBtns);
  updateBtns();

  /* ---------- Photo fallback: show initials if a photo fails ---------- */
  document.querySelectorAll(".avatar img").forEach(function (img) {
    function fail() { img.remove(); }
    if (img.complete && img.naturalWidth === 0) fail();
    else img.addEventListener("error", fail);
  });

  /* ---------- Footer year ---------- */
  var y = document.querySelector("[data-year]");
  if (y) y.textContent = new Date().getFullYear();
})();
