/* ── Dropdown ── */
function toggleDropdown() {
  document.getElementById("dropdownMenu").classList.toggle("show");
}
document.addEventListener("click", function(e) {
  var menu = document.getElementById("dropdownMenu");
  var btn = document.querySelector(".menu-button");
  if (!menu.contains(e.target) && e.target !== btn) {
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

/* ── Service Cards animation ── */
const svcCards = document.querySelectorAll('.svc-card');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const cards = entry.target.querySelectorAll('.svc-card');
      cards.forEach((card, i) => {
        setTimeout(() => card.classList.add('visible'), 80 + i * 70);
      });
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
const grid = document.querySelector('.services-grid');
if (grid) observer.observe(grid);

/* ── Filter ── */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    svcCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.classList.remove('svc-hidden');
      } else {
        card.classList.add('svc-hidden');
      }
    });
  });
});

/* ── Modal ── */
const overlay = document.getElementById('modalOverlay');
svcCards.forEach(card => {
  card.addEventListener('click', () => {
    document.getElementById('modalTitle').textContent = card.dataset.title;
    document.getElementById('modalDesc').textContent = card.dataset.desc;
    document.getElementById('modalBadge').textContent = card.dataset.badge;
    const mi = document.getElementById('modalIcon');
    mi.innerHTML = '';
    mi.appendChild(card.querySelector('.icon-wrap').cloneNode(true));
    document.getElementById('modalFeatures').innerHTML =
      card.dataset.features.split('|').map(f => `<div class="modal-feature">${f}</div>`).join('');
    overlay.classList.add('open');
  });
});
document.getElementById('modalClose').addEventListener('click', () => overlay.classList.remove('open'));
overlay.addEventListener('click', e => { if (e.target === overlay) overlay.classList.remove('open'); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') overlay.classList.remove('open'); });
