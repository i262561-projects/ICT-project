document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('proposalForm'); if (!form) return;
  const date = document.getElementById('eventDate'); const subject = document.getElementById('subject'); const today = new Date(); today.setHours(0,0,0,0); date.min = new Date(today.getTime() + 86400000).toISOString().split('T')[0];
  const success = document.getElementById('formSuccess'); const error = document.getElementById('formError');
  function updateDateRequirement() { date.required = subject.value === 'Event proposal'; }
  subject.addEventListener('change', updateDateRequirement);
  form.addEventListener('submit', function (event) {
    event.preventDefault(); success.classList.add('d-none'); error.classList.add('d-none');
    updateDateRequirement();
    const dateValid = (!date.required && !date.value) || (Boolean(date.value) && new Date(date.value + 'T00:00:00') > today);
    date.setCustomValidity(dateValid ? '' : 'Please choose a future date.');
    const valid = form.checkValidity() && dateValid;
    form.classList.add('was-validated');
    if (!valid) { error.classList.remove('d-none'); const first = form.querySelector(':invalid'); if (first) first.focus(); return; }
    success.classList.remove('d-none'); form.reset(); form.classList.remove('was-validated'); date.setCustomValidity(''); date.min = new Date(today.getTime() + 86400000).toISOString().split('T')[0];
  });
});
