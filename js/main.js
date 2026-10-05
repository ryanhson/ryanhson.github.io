/* ==========================================================================
   Shared behavior for every page.

   Each page's <body> declares:
     data-page="home|projects|project|experience|skills|about|contact"
     data-root=""   (or "../" for pages inside /projects/)
     data-project="<id>"   (project pages only)
   ========================================================================== */

(function () {
  "use strict";

  const body = document.body;
  const ROOT = body.dataset.root || "";
  const PAGE = body.dataset.page || "";

  const CONTACT = {
    email: "ryanhson@udel.edu",
    linkedin: "https://www.linkedin.com/in/ryan-henderson27",
    github: "https://github.com/ryanhson",
    resume: "assets/resume.pdf",
  };

  const NAV = [
    { id: "projects",   label: "Projects",   href: "projects.html" },
    { id: "experience", label: "Experience", href: "experience.html" },
    { id: "skills",     label: "Skills",     href: "skills.html" },
    { id: "about",      label: "About",      href: "about.html" },
    { id: "contact",    label: "Contact",    href: "contact.html" },
  ];

  const ICONS = {
    menu:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    sun:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    moon:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
    download: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12M7 10l5 5 5-5M5 21h14"/></svg>',
  };

  /* ---------- Helpers ---------- */
  const slug = (s) =>
    s.toLowerCase()
      .replace(/²/g, "2")
      .replace(/#/g, "sharp")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const projectUrl = (p) => `${ROOT}projects/${p.id}.html`;
  const skillUrl = (skill) => `${ROOT}projects.html?skill=${slug(skill)}`;
  const areaLabel = (id) => (AREAS.find((a) => a.id === id) || {}).label || id;
  const findSkillBySlug = (s) =>
    SKILL_GROUPS.flatMap((g) => g.skills).find((sk) => slug(sk) === s);
  const projectsUsing = (skill) => PROJECTS.filter((p) => p.skills.includes(skill));

  const tagList = (skills, linked = true) =>
    `<ul class="tags">${skills
      .map((s) => `<li>${linked ? `<a class="tag" href="${skillUrl(s)}">${s}</a>` : `<span class="tag">${s}</span>`}</li>`)
      .join("")}</ul>`;

  function projectCard(p) {
    const status = p.status ? `<span class="tag status">${p.status}</span>` : "";
    return `
      <article class="card" data-areas="${p.areas.join(" ")}" data-skills="${p.skills.map(slug).join(" ")}">
        <div class="media-ph">Thumbnail: ${p.title}</div>
        <div class="card-body">
          <div class="card-meta">${p.date} · ${EXPERIENCE[p.experience].label} ${status}</div>
          <h3><a href="${projectUrl(p)}">${p.title}</a></h3>
          <p>${p.summary}</p>
          ${tagList(p.skills)}
        </div>
      </article>`;
  }

  function nextLink(label, title, href, extraClass = "") {
    return `<a class="next-link ${extraClass}" href="${href}"><small>${label}</small><span>${title}</span></a>`;
  }

  /* ---------- Theme ---------- */
  function currentTheme() {
    const set = document.documentElement.dataset.theme;
    if (set) return set;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  function themeButtonContent() {
    return currentTheme() === "dark" ? ICONS.sun : ICONS.moon;
  }
  function toggleTheme(btn) {
    const next = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) { /* storage unavailable */ }
    btn.innerHTML = themeButtonContent();
    btn.setAttribute("aria-label", `Switch to ${next === "dark" ? "light" : "dark"} mode`);
  }

  /* ---------- Header & footer ---------- */
  function renderHeader() {
    const header = document.getElementById("site-header");
    if (!header) return;
    const activeId = PAGE === "project" ? "projects" : PAGE;
    header.className = "site-header";
    header.innerHTML = `
      <div class="container header-inner">
        <a class="brand" href="${ROOT}index.html">Ryan Henderson</a>
        <nav class="site-nav" id="site-nav" aria-label="Main">
          <ul>
            ${NAV.map((n) => `<li><a href="${ROOT}${n.href}"${n.id === activeId ? ' aria-current="page"' : ""}>${n.label}</a></li>`).join("")}
          </ul>
        </nav>
        <div class="header-actions">
          <a class="btn resume-btn" href="${ROOT}${CONTACT.resume}" target="_blank" rel="noopener">${ICONS.download} Resume</a>
          <button class="icon-btn theme-toggle" type="button" aria-label="Switch to ${currentTheme() === "dark" ? "light" : "dark"} mode">${themeButtonContent()}</button>
          <button class="icon-btn menu-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="site-nav">${ICONS.menu}</button>
        </div>
      </div>`;

    const themeBtn = header.querySelector(".theme-toggle");
    themeBtn.addEventListener("click", () => toggleTheme(themeBtn));

    const menuBtn = header.querySelector(".menu-toggle");
    const nav = header.querySelector(".site-nav");
    menuBtn.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", String(open));
      menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      menuBtn.innerHTML = open ? ICONS.close : ICONS.menu;
    });
  }

  function renderFooter() {
    const footer = document.getElementById("site-footer");
    if (!footer) return;
    footer.className = "site-footer";
    footer.innerHTML = `
      <div class="container">
        <div class="footer-grid">
          <div>
            <h2>Ryan Henderson</h2>
            <p class="muted">Electrical Engineering, University of Delaware Honors College, Class of 2027.</p>
            <a class="btn btn-outline" href="${ROOT}contact.html">Get in touch</a>
          </div>
          <div>
            <h2>Explore</h2>
            <ul>
              <li><a href="${ROOT}index.html">Home</a></li>
              ${NAV.map((n) => `<li><a href="${ROOT}${n.href}">${n.label}</a></li>`).join("")}
            </ul>
          </div>
          <div>
            <h2>Connect</h2>
            <ul>
              <li><a href="mailto:${CONTACT.email}">Email</a></li>
              <li><a href="${CONTACT.linkedin}" target="_blank" rel="noopener">LinkedIn</a></li>
              <li><a href="${CONTACT.github}" target="_blank" rel="noopener">GitHub</a></li>
              <li><a href="${ROOT}${CONTACT.resume}" target="_blank" rel="noopener">Resume (PDF)</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">© ${new Date().getFullYear()} Ryan Henderson</div>
      </div>`;
  }

  /* ---------- Home ---------- */
  function renderFeatured() {
    const el = document.getElementById("featured-projects");
    if (!el) return;
    el.innerHTML = PROJECTS.filter((p) => p.featured).map(projectCard).join("");
  }

  /* ---------- Projects gallery + filters ---------- */
  function initProjectsPage() {
    const grid = document.getElementById("project-grid");
    if (!grid) return;

    grid.innerHTML = PROJECTS.map(projectCard).join("");

    const filterBar = document.getElementById("area-filters");
    filterBar.innerHTML =
      `<button class="filter-btn" type="button" data-area="all">All</button>` +
      AREAS.map((a) => `<button class="filter-btn" type="button" data-area="${a.id}">${a.label}</button>`).join("");

    const more = document.getElementById("more-projects");
    if (more) {
      more.innerHTML = MORE_PROJECTS.map((m) => `
        <li><strong>${m.title}</strong>
          <span class="card-meta">${m.date}</span>
          <p class="muted" style="margin:.3em 0 0">${m.summary} <a href="${ROOT}${m.link}">See on the Experience page →</a></p>
        </li>`).join("");
    }

    const activeBox = document.getElementById("active-filter");
    const countEl = document.getElementById("result-count");
    const emptyEl = document.getElementById("empty-state");
    const cards = [...grid.querySelectorAll(".card")];

    const params = new URLSearchParams(location.search);
    const state = {
      area: params.get("area") || "all",
      skill: params.get("skill") || "",
    };

    function apply() {
      let shown = 0;
      cards.forEach((card) => {
        const areaOk = state.area === "all" || card.dataset.areas.split(" ").includes(state.area);
        const skillOk = !state.skill || card.dataset.skills.split(" ").includes(state.skill);
        card.hidden = !(areaOk && skillOk);
        if (!card.hidden) shown++;
      });

      filterBar.querySelectorAll(".filter-btn").forEach((b) =>
        b.setAttribute("aria-pressed", String(b.dataset.area === state.area)));

      const skillName = state.skill ? findSkillBySlug(state.skill) || state.skill : "";
      activeBox.hidden = !skillName;
      if (skillName) {
        activeBox.innerHTML = `Showing projects that use <span class="tag">${skillName}</span>
          <button class="clear-filter" type="button">Clear skill filter</button>
          <a href="${ROOT}skills.html">Browse all skills</a>`;
        activeBox.querySelector(".clear-filter").addEventListener("click", () => {
          state.skill = "";
          apply();
        });
      }

      countEl.textContent = `Showing ${shown} of ${cards.length} projects`;
      emptyEl.hidden = shown !== 0;

      const q = new URLSearchParams();
      if (state.area !== "all") q.set("area", state.area);
      if (state.skill) q.set("skill", state.skill);
      const qs = q.toString();
      history.replaceState(null, "", qs ? `?${qs}` : location.pathname);
    }

    filterBar.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter-btn");
      if (!btn) return;
      state.area = btn.dataset.area;
      apply();
    });

    emptyEl.querySelector("button")?.addEventListener("click", () => {
      state.area = "all";
      state.skill = "";
      apply();
    });

    apply();
  }

  /* ---------- Project detail page ---------- */
  function initProjectPage() {
    if (PAGE !== "project") return;
    const id = body.dataset.project;
    const i = PROJECTS.findIndex((p) => p.id === id);
    if (i === -1) return;
    const p = PROJECTS[i];
    const exp = EXPERIENCE[p.experience];

    // Breadcrumbs
    const crumbs = document.getElementById("breadcrumbs");
    if (crumbs) {
      crumbs.innerHTML = `<ol>
        <li><a href="${ROOT}index.html">Home</a></li>
        <li><a href="${ROOT}projects.html">Projects</a></li>
        <li aria-current="page">${p.title}</li></ol>`;
    }

    // Meta line under the title
    const meta = document.getElementById("project-meta");
    if (meta) meta.textContent = `${exp.label} · ${p.date}${p.status ? " · " + p.status : ""}`;

    // "At a glance" sidebar
    const glance = document.getElementById("glance");
    if (glance) {
      glance.innerHTML = `
        <h2>At a glance</h2>
        <dl>
          <div><dt>Key result</dt><dd class="key-result">${p.keyResult}</dd></div>
          <div><dt>Role</dt><dd>${p.role}</dd></div>
          <div><dt>When</dt><dd>${p.date}</dd></div>
          <div><dt>Context</dt><dd><a href="${ROOT}experience.html#${p.experience}">${exp.label}</a></dd></div>
          <div><dt>Focus area</dt><dd>${p.areas.map((a) => `<a href="${ROOT}projects.html?area=${a}">${areaLabel(a)}</a>`).join(", ")}</dd></div>
          <div><dt>Tools &amp; skills</dt><dd>${tagList(p.skills)}</dd></div>
        </dl>`;
    }

    // "Where to next?"
    const next = document.getElementById("next-steps");
    if (next) {
      const prev = PROJECTS[(i - 1 + PROJECTS.length) % PROJECTS.length];
      const nxt = PROJECTS[(i + 1) % PROJECTS.length];

      // Related = most shared skills/areas, excluding this project
      const related = PROJECTS
        .filter((o) => o.id !== p.id)
        .map((o) => ({
          o,
          score: o.skills.filter((s) => p.skills.includes(s)).length * 2 +
                 o.areas.filter((a) => p.areas.includes(a)).length +
                 (o.experience === p.experience ? 1 : 0),
        }))
        .filter((r) => r.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 2)
        .map((r) => r.o);

      next.className = "next-steps";
      next.innerHTML = `
        <h2>Where to next?</h2>
        <div class="pager">
          ${nextLink("← Previous project", prev.title, projectUrl(prev), "prev")}
          ${nextLink("Next project →", nxt.title, projectUrl(nxt), "next")}
        </div>
        <div class="next-grid">
          ${related.map((r) => nextLink("Related project", r.title, projectUrl(r))).join("")}
          ${nextLink("Where this happened", exp.label, `${ROOT}experience.html#${p.experience}`)}
          ${p.skills[0] ? nextLink("More with " + p.skills[0], "See all " + p.skills[0] + " projects", skillUrl(p.skills[0])) : ""}
          ${nextLink("Back to the hub", "All projects", `${ROOT}projects.html`)}
          ${nextLink("Like what you see?", "Get in touch", `${ROOT}contact.html`)}
        </div>`;
    }
  }

  /* ---------- Experience page ---------- */
  function initExperiencePage() {
    if (PAGE !== "experience") return;

    document.querySelectorAll("[data-exp-projects]").forEach((el) => {
      const projects = PROJECTS.filter((p) => p.experience === el.dataset.expProjects);
      if (!projects.length) { el.closest(".exp-projects")?.remove(); return; }
      el.innerHTML = projects.map((p) => `<li><a href="${projectUrl(p)}">${p.title}</a></li>`).join("");
    });

    const all = [...document.querySelectorAll(".timeline details")];
    document.getElementById("expand-all")?.addEventListener("click", () => all.forEach((d) => (d.open = true)));
    document.getElementById("collapse-all")?.addEventListener("click", () => all.forEach((d) => (d.open = false)));

    // Opening experience.html#siemens expands that entry
    function openFromHash() {
      if (!location.hash) return;
      const target = document.getElementById(location.hash.slice(1));
      const details = target?.querySelector("details");
      if (details) details.open = true;
    }
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
  }

  /* ---------- Skills page ---------- */
  function initSkillsPage() {
    const el = document.getElementById("skill-groups");
    if (!el) return;
    el.innerHTML = SKILL_GROUPS.map((g) => `
      <section class="skill-group">
        <h2>${g.name}</h2>
        <ul class="skill-list">
          ${g.skills.map((s) => {
            const n = projectsUsing(s).length;
            return n
              ? `<li><a href="${skillUrl(s)}">${s}<span class="count">${n} project${n > 1 ? "s" : ""} →</span></a></li>`
              : `<li><span class="skill">${s}</span></li>`;
          }).join("")}
        </ul>
      </section>`).join("");
  }

  /* ---------- Lightbox for gallery images ---------- */
  function initLightbox() {
    const images = document.querySelectorAll(".gallery img");
    if (!images.length) return;

    const box = document.createElement("div");
    box.className = "lightbox";
    box.hidden = true;
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.innerHTML = `<button class="icon-btn" type="button" aria-label="Close">${ICONS.close}</button>
      <figure><img alt=""><figcaption></figcaption></figure>`;
    document.body.appendChild(box);

    const img = box.querySelector("img");
    const cap = box.querySelector("figcaption");
    const closeBtn = box.querySelector("button");
    let lastFocus = null;

    const close = () => { box.hidden = true; lastFocus?.focus(); };

    images.forEach((im) => {
      im.tabIndex = 0;
      const open = () => {
        lastFocus = im;
        img.src = im.dataset.full || im.src;
        img.alt = im.alt;
        cap.textContent = im.alt;
        box.hidden = false;
        closeBtn.focus();
      };
      im.addEventListener("click", open);
      im.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
    });

    box.addEventListener("click", (e) => { if (e.target === box || e.target.closest("button")) close(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !box.hidden) close(); });
  }

  /* ---------- Init ---------- */
  renderHeader();
  renderFooter();
  renderFeatured();
  initProjectsPage();
  initProjectPage();
  initExperiencePage();
  initSkillsPage();
  initLightbox();
})();
