(() => {
  const data = window.PORTFOLIO_DATA;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const escapeHTML = (value = "") => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  const highlight = (text, term) => {
    const safe = escapeHTML(text);
    if (!term) return safe;
    const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return safe.replace(new RegExp(`(${escapedTerm})`, "ig"), "<mark>$1</mark>");
  };

  // Render interests
  $("#interest-tags").innerHTML = data.interests
    .map(item => `<span class="tag">${escapeHTML(item)}</span>`)
    .join("");

  // Render research cards
  $("#research-grid").innerHTML = data.research.map(item => `
    <article class="card reveal">
      <div class="card-icon">${escapeHTML(item.icon)}</div>
      <h3>${escapeHTML(item.title)}</h3>
      <p>${escapeHTML(item.text)}</p>
    </article>
  `).join("");

  // Render experience
  $("#experience-timeline").innerHTML = data.experience.map(item => `
    <article class="timeline-item reveal">
      <span class="period">${escapeHTML(item.period)}</span>
      <h3>${escapeHTML(item.role)}</h3>
      <div class="place">${escapeHTML(item.place)}</div>
      <p>${escapeHTML(item.text)}</p>
    </article>
  `).join("");

  // Render education
  $("#education-grid").innerHTML = data.education.map(item => `
    <article class="edu-card reveal">
      <span class="edu-year">${escapeHTML(item.year)}</span>
      <h3>${escapeHTML(item.degree)}</h3>
      <div class="institute">${escapeHTML(item.institute)}</div>
      <p>${escapeHTML(item.detail)}</p>
    </article>
  `).join("");

  // Publications with filtering/search
  const publicationList = $("#publication-list");
  const searchInput = $("#pub-search");
  let activeFilter = "all";

  const typeLabel = {
    journal: "Journal",
    conference: "Conference",
    review: "Under review"
  };

  const renderPublications = () => {
    const term = searchInput.value.trim().toLowerCase();
    const filtered = data.publications.filter(pub => {
      const matchesType = activeFilter === "all" || pub.type === activeFilter;
      const haystack = `${pub.title} ${pub.authors} ${pub.venue} ${pub.year}`.toLowerCase();
      return matchesType && (!term || haystack.includes(term));
    });

    publicationList.innerHTML = filtered.length ? filtered.map(pub => `
      <article class="pub-item reveal visible">
        <div class="pub-year">
          ${pub.year}
          <span class="pub-type">${typeLabel[pub.type]}</span>
        </div>
        <div>
          <h3>${highlight(pub.title, term)}</h3>
          <p class="pub-authors">${highlight(pub.authors, term)}</p>
          <p class="pub-venue">${highlight(pub.venue, term)}</p>
        </div>
      </article>
    `).join("") : `<div class="empty-state">No publications match your current filter.</div>`;
  };

  $$(".filter-btn").forEach(button => {
    button.addEventListener("click", () => {
      $$(".filter-btn").forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
      activeFilter = button.dataset.filter;
      renderPublications();
    });
  });
  searchInput.addEventListener("input", renderPublications);
  renderPublications();

  // Teaching/service
  $("#service-grid").innerHTML = data.service.map(item => `
    <article class="card service-card reveal">
      <div class="kicker">${escapeHTML(item.kicker)}</div>
      <h3>${escapeHTML(item.title)}</h3>
      <p>${escapeHTML(item.text)}</p>
    </article>
  `).join("");

  // Awards
  $("#award-list").innerHTML = data.awards.map(item => `
    <article class="award-item reveal">
      <div class="year">${escapeHTML(item.year)}</div>
      <div><strong>${escapeHTML(item.title)}</strong><p>${escapeHTML(item.text)}</p></div>
    </article>
  `).join("");

  // Theme
  const themeToggle = $("#theme-toggle");
  const storedTheme = localStorage.getItem("portfolio-theme");
  if (storedTheme) document.documentElement.dataset.theme = storedTheme;
  else if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) document.documentElement.dataset.theme = "dark";

  const syncThemeIcon = () => {
    themeToggle.textContent = document.documentElement.dataset.theme === "dark" ? "☀" : "◐";
  };
  syncThemeIcon();
  themeToggle.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("portfolio-theme", next);
    syncThemeIcon();
  });

  // Mobile navigation
  const navToggle = $(".nav-toggle");
  const navMenu = $("#nav-menu");
  navToggle.addEventListener("click", () => {
    const open = navMenu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
  });
  $$("#nav-menu a").forEach(link => link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }));

  // Reveal animation
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  $$(".reveal").forEach(el => revealObserver.observe(el));

  // Active nav section
  const navLinks = $$("#nav-menu a[href^='#']");
  const sections = navLinks.map(a => document.querySelector(a.getAttribute("href"))).filter(Boolean);
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === `#${entry.target.id}`));
      }
    });
  }, { rootMargin: "-35% 0px -55% 0px" });
  sections.forEach(section => sectionObserver.observe(section));

  $("#year").textContent = new Date().getFullYear();
})();
