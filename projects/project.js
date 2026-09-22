const appToast = document.querySelector('.app-toast');
let appToastTimer;

const showProjectToast = (message) => {
  if (!appToast) return;
  appToast.textContent = message;
  appToast.classList.add('show');
  window.clearTimeout(appToastTimer);
  appToastTimer = window.setTimeout(() => appToast.classList.remove('show'), 2500);
};

window.ProjectUI = { toast: showProjectToast };

document.querySelector('[data-project-switcher]')?.addEventListener('change', (event) => {
  if (event.target.value) window.location.href = event.target.value;
});

document.querySelectorAll('[data-toast]').forEach((control) => {
  control.addEventListener('click', () => showProjectToast(control.dataset.toast));
});

document.querySelectorAll('[data-year]').forEach((node) => {
  node.textContent = String(new Date().getFullYear());
});
