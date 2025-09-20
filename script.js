const checkbox = document.getElementById('human-check');
const spinner = document.getElementById('spinner');
let clickCount = 0;

checkbox.addEventListener('change', () => {
  clickCount++;

  // Randomly uncheck after 1 second
  setTimeout(() => {
    checkbox.checked = false;
  }, 1000);

  // Require 3 clicks to verify
  if (clickCount >= 3) {
    spinner.classList.remove('hidden');

    // Try to open popup
    const popup = window.open('', '', 'width=300,height=200');
    if (!popup) {
      alert("Popup failed. Verification failed.");
      spinner.classList.add('hidden');
      clickCount = 0;
      return;
    }

    popup.document.write('<p>Verifying...</p>');
    setTimeout(() => {
      popup.document.write('<p>Verified! You may close this window.</p>');
      spinner.classList.add('hidden');
    }, 2000);
  }
});
