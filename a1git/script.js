/* ── Dropdown ── */
function toggleDropdown() {
  document.getElementById("dropdownMenu").classList.toggle("show");
}
document.addEventListener("click", function(e) {
  var menu = document.getElementById("dropdownMenu");
  var btn = document.querySelector(".menu-button");
  if (menu && btn && !menu.contains(e.target) && e.target !== btn) {
    menu.classList.remove("show");
  }
});

/* ── Show/Hide special sections ── */
function showSection(id) {
  document.querySelectorAll("section").forEach(function(s) {
    s.classList.add("hidden");
    s.classList.remove("fade-in");
  });
  var el = document.getElementById(id);
  if (el) {
    el.classList.remove("hidden");
    setTimeout(function() { el.classList.add("fade-in"); }, 10);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  document.getElementById("dropdownMenu").classList.remove("show");
}
function goBack() {
  document.querySelectorAll("section").forEach(function(s) {
    s.classList.remove("hidden");
  });
  ["founder", "our-team", "experience", "garage-certificates"].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.classList.add("hidden");
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ── WhatsApp Booking ── */
function sendToWhatsApp(event) {
  event.preventDefault();
  var name = document.getElementById("name").value.trim();
  var phone = document.getElementById("phone").value.trim();
  var model = document.getElementById("model").value.trim();
  var issue = document.getElementById("issue").value.trim();
  if (!name || !phone || !model) { alert("Please fill all required fields."); return; }
  var message = encodeURIComponent(
    "🚗 New Booking Request 🚗\n\n" +
    "👤 Name: " + name + "\n" +
    "📞 Phone: " + phone + "\n" +
    "🚘 Vehicle: " + model + "\n" +
    "🔧 Issue: " + (issue || "Not specified")
  );
  window.open("https://wa.me/919420443588?text=" + message, "_blank");
}

/* ── Service Cards Animation (mobile fix) ── */
document.addEventListener("DOMContentLoaded", function() {
  var svcCards = document.querySelectorAll('.svc-card');
  var grid = document.querySelector('.services-grid');

  if (!grid || !svcCards.length) return;

  /* IntersectionObserver — works on mobile too */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var cards = entry.target.querySelectorAll('.svc-card:not(.svc-hidden)');
          cards.forEach(function(card, i) {
            setTimeout(function() { card.classList.add('visible'); }, 80 + i * 70);
          });
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: "0px 0px -50px 0px" });
    io.observe(grid);
  } else {
    /* Fallback for older browsers — just show all cards */
    svcCards.forEach(function(card) { card.classList.add('visible'); });
  }

  /* ── Filter ── */
  document.querySelectorAll('.filter-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.filter-btn').forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var filter = btn.dataset.filter;
      svcCards.forEach(function(card) {
        if (filter === 'all' || card.dataset.category === filter) {
          card.classList.remove('svc-hidden');
          /* Re-trigger animation if not already visible */
          if (!card.classList.contains('visible')) {
            card.classList.add('visible');
          }
        } else {
          card.classList.add('svc-hidden');
        }
      });
    });
  });

  /* ── Modal ── */
  var overlay = document.getElementById('modalOverlay');
  if (!overlay) return;

  svcCards.forEach(function(card) {
    card.addEventListener('click', function() {
      document.getElementById('modalTitle').textContent = card.dataset.title || '';
      document.getElementById('modalDesc').textContent = card.dataset.desc || '';
      document.getElementById('modalBadge').textContent = card.dataset.badge || '';
      var mi = document.getElementById('modalIcon');
      mi.innerHTML = '';
      var iconClone = card.querySelector('.icon-wrap');
      if (iconClone) mi.appendChild(iconClone.cloneNode(true));
      var featuresHtml = (card.dataset.features || '').split('|')
        .map(function(f) { return '<div class="modal-feature">' + f + '</div>'; })
        .join('');
      document.getElementById('modalFeatures').innerHTML = featuresHtml;
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  document.getElementById('modalClose').addEventListener('click', function() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  });
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
});
