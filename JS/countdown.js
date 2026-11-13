document.addEventListener('DOMContentLoaded', function () {
  const timer = document.getElementById('countdown');
  if (!timer) return;
  const target = new Date(timer.dataset.eventDate).getTime();
  const fields = { days: document.getElementById('cd-days'), hours: document.getElementById('cd-hours'), minutes: document.getElementById('cd-minutes'), seconds: document.getElementById('cd-seconds') };
  function update() {
    const remaining = target - Date.now();
    if (remaining <= 0) {
      timer.innerHTML = '<div class="countdown-done">The event is happening now or has started!</div>';
      clearInterval(interval); return;
    }
    const values = { days: Math.floor(remaining / 86400000), hours: Math.floor((remaining % 86400000) / 3600000), minutes: Math.floor((remaining % 3600000) / 60000), seconds: Math.floor((remaining % 60000) / 1000) };
    Object.keys(fields).forEach(function (key) { if (fields[key]) fields[key].textContent = String(values[key]).padStart(2, '0'); });
  }
  update(); const interval = setInterval(update, 1000);
});
