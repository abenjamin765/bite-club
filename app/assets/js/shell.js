import { signOut } from "/app/assets/js/auth.js";
import { bindNavLinks } from "/app/assets/js/router.js";

const ICONS = {
  home:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 10.565c0-.574 0-.861.074-1.126a2 2 0 0 1 .318-.65c.163-.22.39-.397.843-.75l6.783-5.275c.351-.273.527-.41.72-.462a1 1 0 0 1 .523 0c.194.052.37.189.721.462l6.783 5.275c.453.353.68.53.843.75.145.195.252.416.318.65.074.265.074.552.074 1.126V17.8c0 1.12 0 1.68-.218 2.108a2 2 0 0 1-.874.874C19.48 21 18.92 21 17.8 21H6.2c-1.12 0-1.68 0-2.108-.218a2 2 0 0 1-.874-.874C3 19.48 3 18.92 3 17.8v-7.235Z"/></svg>',
  calendar:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10H3m13-8v4M8 2v4m-.2 16h8.4c1.68 0 2.52 0 3.162-.327a3 3 0 0 0 1.311-1.311C21 19.72 21 18.88 21 17.2V8.8c0-1.68 0-2.52-.327-3.162a3 3 0 0 0-1.311-1.311C18.72 4 17.88 4 16.2 4H7.8c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.311 1.311C3 6.28 3 7.12 3 8.8v8.4c0 1.68 0 2.52.327 3.162a3 3 0 0 0 1.311 1.311C5.28 22 6.12 22 7.8 22Z"/></svg>',
  grid:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8.4 3H4.6c-.56 0-.84 0-1.054.109a1 1 0 0 0-.437.437C3 3.76 3 4.04 3 4.6v3.8c0 .56 0 .84.109 1.054a1 1 0 0 0 .437.437C3.76 10 4.04 10 4.6 10h3.8c.56 0 .84 0 1.054-.109a1 1 0 0 0 .437-.437C10 9.24 10 8.96 10 8.4V4.6c0-.56 0-.84-.109-1.054a1 1 0 0 0-.437-.437C9.24 3 8.96 3 8.4 3Zm11 0h-3.8c-.56 0-.84 0-1.054.109a1 1 0 0 0-.437.437C14 3.76 14 4.04 14 4.6v3.8c0 .56 0 .84.109 1.054a1 1 0 0 0 .437.437C14.76 10 15.04 10 15.6 10h3.8c.56 0 .84 0 1.054-.109a1 1 0 0 0 .437-.437C21 9.24 21 8.96 21 8.4V4.6c0-.56 0-.84-.109-1.054a1 1 0 0 0-.437-.437C20.24 3 19.96 3 19.4 3Zm0 11h-3.8c-.56 0-.84 0-1.054.109a1 1 0 0 0-.437.437C14 14.76 14 15.04 14 15.6v3.8c0 .56 0 .84.109 1.054a1 1 0 0 0 .437.437C14.76 21 15.04 21 15.6 21h3.8c.56 0 .84 0 1.054-.109a1 1 0 0 0 .437-.437C21 20.24 21 19.96 21 19.4v-3.8c0-.56 0-.84-.109-1.054a1 1 0 0 0-.437-.437C20.24 14 19.96 14 19.4 14Zm-11 0H4.6c-.56 0-.84 0-1.054.109a1 1 0 0 0-.437.437C3 14.76 3 15.04 3 15.6v3.8c0 .56 0 .84.109 1.054a1 1 0 0 0 .437.437C3.76 21 4.04 21 4.6 21h3.8c.56 0 .84 0 1.054-.109a1 1 0 0 0 .437-.437C10 20.24 10 19.96 10 19.4v-3.8c0-.56 0-.84-.109-1.054a1 1 0 0 0-.437-.437C9.24 14 8.96 14 8.4 14Z"/></svg>',
  list:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12H9m12-6H9m12 12H9m-4-6a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm0-6a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm0 12a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"/></svg>',
  users:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2m12-12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"/></svg>',
};

const NAV = {
  client: [
    { key: "today", label: "Today", href: "/app/client/home.html", icon: "home" },
    { key: "plan", label: "Plan", href: "/app/client/plan/index.html", icon: "calendar" },
  ],
  coach: [
    { key: "dashboard", label: "Dashboard", href: "/app/coach/home.html", icon: "grid" },
    { key: "group", label: "Group", href: "/app/coach/group.html", icon: "users" },
  ],
};

function renderSidebar(role, active) {
  const items = NAV[role] || [];
  const links = items
    .map((item) => {
      const activeClass = item.key === active ? " is-active" : "";
      return `
        <a class="app-nav-link${activeClass}" href="${item.href}" data-nav>
          ${ICONS[item.icon] || ""}
          <span>${item.label}</span>
        </a>
      `;
    })
    .join("");

  return `
    <div class="app-sidebar-inner">
      <a class="app-brand" href="/app/index.html" data-nav>
        <img src="/app/assets/bc_icon.svg" alt="" />
        <span>Bite Club</span>
      </a>
      <nav class="app-nav" aria-label="Primary">
        ${links}
      </nav>
      <button class="app-signout-btn" type="button" data-signout>
        Sign Out
      </button>
    </div>
  `;
}

function renderTabbar(role, active) {
  const items = NAV[role] || [];
  const tabs = items
    .map((item) => {
      const activeClass = item.key === active ? " is-active" : "";
      return `
        <a class="tab-item${activeClass}" href="${item.href}" data-nav>
          ${ICONS[item.icon] || ""}
          ${item.label}
        </a>
      `;
    })
    .join("");
  return `<div class="tab-bar-inner">${tabs}</div>`;
}

function bindSignOutButtons() {
  document.querySelectorAll("[data-signout]").forEach((button) => {
    button.addEventListener("click", async () => {
      await signOut();
      window.location.replace("/app/auth/index.html");
    });
  });
}

export function mountAppShell({ role, active, mobileTabs = false }) {
  const sidebar = document.querySelector("#app-sidebar");
  if (sidebar) {
    sidebar.innerHTML = renderSidebar(role, active);
  }

  const tabbar = document.querySelector("#app-tabbar");
  if (tabbar) {
    tabbar.innerHTML = mobileTabs ? renderTabbar(role, active) : "";
  }

  bindNavLinks();
  bindSignOutButtons();
}
