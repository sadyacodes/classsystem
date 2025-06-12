// Theme Toggle Module
(() => {
  const toggleButton = document.createElement('button');
  toggleButton.id = 'theme-toggle';
  toggleButton.setAttribute('aria-label', 'Toggle theme');
  toggleButton.title = 'Toggle Light/Dark Mode';
  toggleButton.innerHTML = '<i class="fas fa-moon"></i>'; // Default icon

  // Append button to header nav (assumes nav exists)
  const nav = document.querySelector('nav.navbar .nav-container');
  if (nav) {
    nav.appendChild(toggleButton);
  }

  // Load saved theme or default to light
  const savedTheme = localStorage.getItem('classsys-theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateToggleIcon(savedTheme);

  toggleButton.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('classsys-theme', newTheme);
    updateToggleIcon(newTheme);
    showToast(`Switched to ${newTheme} mode`);
  });

  function updateToggleIcon(theme) {
    toggleButton.innerHTML =
      theme === 'light' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
  }
})();

// Toast Notification Utility
(() => {
  const toastContainer = document.createElement('div');
  toastContainer.id = 'toast-container';
  toastContainer.setAttribute('aria-live', 'polite');
  toastContainer.setAttribute('role', 'alert');
  document.body.appendChild(toastContainer);

  window.showToast = (message, duration = 3000) => {
    if (!message) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('fadeout');
      toast.addEventListener('transitionend', () => toast.remove());
    }, duration);
  };
})();

// Optional: Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const targetId = anchor.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
