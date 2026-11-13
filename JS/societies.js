document.addEventListener('DOMContentLoaded', function () {
  const cards = Array.from(document.querySelectorAll('.society-item'));
  const filters = document.querySelectorAll('[data-soc-filter]');
  const search = document.getElementById('societySearch'); const count = document.getElementById('societyCount'); const empty = document.getElementById('noSocieties');
  if (!cards.length) return; let category = 'all';
  function filter() {
    const term = search.value.trim().toLowerCase(); let visible = 0;
    cards.forEach(card => { const cat = category === 'all' || card.dataset.category === category; const txt = (card.dataset.search || card.textContent.toLowerCase()).includes(term); const show = cat && txt; card.classList.toggle('d-none', !show); if (show) visible++; });
    count.textContent = visible; empty.classList.toggle('d-none', visible !== 0);
  }
  filters.forEach(button => button.addEventListener('click', function () { filters.forEach(b => b.classList.remove('active')); button.classList.add('active'); category = button.dataset.socFilter; filter(); })); search.addEventListener('input', filter);
  const modalElement = document.getElementById('societyModal'); const modal = new bootstrap.Modal(modalElement); const join = document.getElementById('joinButton'); const message = document.getElementById('joinMessage');
  document.querySelectorAll('.view-society').forEach(button => button.addEventListener('click', function () {
    document.getElementById('societyModalTitle').textContent = button.dataset.title; document.getElementById('societyCategory').textContent = button.dataset.category; document.getElementById('societyDescription').textContent = button.dataset.description; document.getElementById('societyActivities').textContent = button.dataset.activities;
    const email = document.getElementById('societyEmail'); email.href = button.dataset.url || 'https://isb.nu.edu.pk/new/campusLife.php'; email.target = '_blank'; email.rel = 'noopener noreferrer'; email.textContent = 'Official FAST-NUCES campus life page';
    message.classList.add('d-none'); join.disabled = false; join.textContent = "I'm interested"; modal.show();
  }));
  join.addEventListener('click', function () { message.classList.remove('d-none'); join.disabled = true; join.textContent = 'Interest noted'; });
});
