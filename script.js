const checkbox = document.getElementById('human-check');
const spinner = document.getElementById('spinner');
let clickCount = 0;

const spinner = document.querySelector('.spinner');

// Start spinning immediately (optional if already styled)
spinner.style.animation = 'spinn 1s linear infinite';

// Stop after 25 seconds
setTimeout(() => {
  spinner.style.animation = 'none';
}, 25000);

checkbox.addEventListener('change', () => {
  clickCount++;

  // Randomly uncheck after 1 second
  setTimeout(() => {
    checkbox.checked = false;
  }, 1000);

  // Require 3 clicks to verify
  if (clickCount >= 3) {
    spinner.classList.remove('hidden');

    // Try to open the fancy CAPTCHA popup
    const popup = window.open('popup.html', 'captchaPopup', 'width=420,height=600');
    if (!popup) {
      alert("Popup failed. Verification failed.");
      spinner.classList.add('hidden');
      clickCount = 0;
      return;
    }

    // Optional: monitor popup closure
    const checkClosed = setInterval(() => {
      if (popup.closed) {
        clearInterval(checkClosed);
        spinner.classList.add('hidden');
        alert("Popup closed. Verification incomplete.");
        clickCount = 0;
      }
    }, 1000);
  }
});
