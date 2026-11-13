document.addEventListener('DOMContentLoaded', function () {
  const cards = Array.from(document.querySelectorAll('.event-item'));
  const filters = document.querySelectorAll('[data-filter]');
  const search = document.getElementById('eventSearch');
  const count = document.getElementById('eventCount');
  const empty = document.getElementById('noEvents');
  if (!cards.length) return;
  let category = 'all';
  function filter() {
    const term = search.value.trim().toLowerCase(); let visible = 0;
    cards.forEach(card => {
      const matchCategory = category === 'all' || card.dataset.category === category;
      const matchText = (card.dataset.search || card.textContent.toLowerCase()).includes(term);
      const show = matchCategory && matchText; card.classList.toggle('d-none', !show); if (show) visible++;
    });
    count.textContent = visible; empty.classList.toggle('d-none', visible !== 0);
  }
  filters.forEach(button => button.addEventListener('click', function () { filters.forEach(b => b.classList.remove('active')); button.classList.add('active'); category = button.dataset.filter; filter(); }));
  search.addEventListener('input', filter);
  const modalElement = document.getElementById('eventModal'); const modal = new bootstrap.Modal(modalElement);
  const rsvp = document.getElementById('rsvpButton'); const message = document.getElementById('rsvpMessage');
  document.querySelectorAll('.view-event').forEach(button => button.addEventListener('click', function () {
    document.getElementById('eventModalTitle').textContent = button.dataset.title;
    document.getElementById('modalCategory').textContent = button.dataset.category;
    document.getElementById('modalDate').textContent = button.dataset.date;
    document.getElementById('modalVenue').textContent = button.dataset.venue;
    document.getElementById('modalDescription').textContent = button.dataset.description;
    document.getElementById('modalRegistration').textContent = button.dataset.registration;
    message.classList.add('d-none'); rsvp.disabled = false; rsvp.textContent = "I'm interested"; modal.show();
  }));
  rsvp.addEventListener('click', function () { message.classList.remove('d-none'); rsvp.disabled = true; rsvp.textContent = 'Interest noted'; });
});
