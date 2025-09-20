const checkbox = document.getElementById('human-check');
const spinner = document.getElementById('spinner');

checkbox.addEventListener('change', () => {
  if (checkbox.checked) {
    spinner.classList.remove('hidden');
    setTimeout(() => {
      spinner.classList.add('hidden');
      alert("Verified! You're human... probably.");
    }, 2000);
  }
});
