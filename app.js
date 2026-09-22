(() => {
  const menuButton = document.getElementById('menuButton');
  const nav = document.getElementById('siteNav');
  const dialog = document.getElementById('caseDialog');
  const content = document.getElementById('caseContent');
  const close = document.getElementById('caseClose');

  document.getElementById('year').textContent = new Date().getFullYear();

  menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .14 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  const cases = {
    pyrewall: {
      type: 'Desktop product UI · 2025',
      title: 'PyreWall — making firewall controls easier to understand',
      intro: 'PyreWall is a Python-based next-generation firewall project with a desktop PyQt6 interface for network monitoring, filtering, rules, traffic visualization, and security logging.',
      sections: [
        ['Design challenge', 'Security tools can become dense very quickly. The interface needed to surface status, monitoring, rules, and filtering controls without making the user feel lost.'],
        ['My UI focus', 'Create a clear dashboard structure, group technical actions logically, make security states easier to scan, and give a desktop utility a more polished modern visual system.'],
        ['Interface areas', 'Dashboard and traffic views, rule configuration, website/application filtering, device and network visibility, and security history/logging.'],
        ['Technical context', 'Python, PyQt6, SQLite, and WinDivert informed the interaction constraints and helped keep the design grounded in how the product actually works.']
      ]
    },
    studysync: {
      type: 'Productivity platform UI · 2025',
      title: 'StudySync — organizing student work into one calm workspace',
      intro: 'StudySync is a student productivity and collaboration platform built around tasks, calendars, group spaces, communication, and academic organization.',
      sections: [
        ['Design challenge', 'Academic tools often spread work across separate calendars, chats, files, and task lists. The interface needed to reduce that fragmentation and keep the most important actions easy to find.'],
        ['My UI focus', 'Build a student-friendly hierarchy with approachable dashboards, structured collaboration areas, clear navigation, and visual separation between tasks, schedules, groups, and progress.'],
        ['Interface areas', 'Student dashboard, calendar, task management, group collaboration, file sharing, communication, progress, and academic organization.'],
        ['Technical context', 'Python, PyQt6, Supabase, and Gmail integration shaped the interface flows and the data-backed interactions.']
      ]
    }
  };

  document.querySelectorAll('[data-case]').forEach(button => button.addEventListener('click', () => {
    const item = cases[button.dataset.case];
    content.innerHTML = `
      <span class="case-pill">${item.type}</span>
      <h2>${item.title}</h2>
      <p>${item.intro}</p>
      ${item.sections.map(([title, text]) => `<h3>${title}</h3><p>${text}</p>`).join('')}
    `;
    dialog.showModal();
  }));

  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', e => {
    if (e.target === dialog) dialog.close();
  });
})();
