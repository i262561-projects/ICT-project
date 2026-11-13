document.addEventListener('DOMContentLoaded', function () {
  const root = document.documentElement;
  const buttons = document.querySelectorAll('.theme-toggle');
  let saved = 'light';
  try { saved = localStorage.getItem('campus-pulse-theme') || 'light'; } catch (error) {}
  root.setAttribute('data-theme', saved === 'dark' ? 'dark' : 'light');
  function updateButtons() {
    const dark = root.getAttribute('data-theme') === 'dark';
    buttons.forEach(function (button) {
      let icon = button.querySelector('i');
      if (!icon) { button.innerHTML = '<i aria-hidden="true"></i>'; icon = button.querySelector('i'); }
      icon.className = dark ? 'bi bi-sun' : 'bi bi-moon-stars';
      button.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
      button.setAttribute('title', dark ? 'Switch to light theme' : 'Switch to dark theme');
    });
  }
  updateButtons();
  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('campus-pulse-theme', next); } catch (error) {}
      updateButtons();
    });
  });
  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); obs.unobserve(entry.target); }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(function (item) { observer.observe(item); });
  } else { revealItems.forEach(function (item) { item.classList.add('visible'); }); }
});
