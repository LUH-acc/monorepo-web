<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

/** 侧栏导航项，与 routes 中 children 路径对应 */
const navItems = [
  { path: "/home", label: "首页", icon: "home" },
] as const;

const pageTitle = computed(() => {
  const title = route.meta?.title as string | undefined;
  const map: Record<string, string> = {
    home: "首页",
  };
  return title ? (map[title] ?? title) : "工作台";
});

const isActive = (path: string) => route.path === path || route.path.startsWith(`${path}/`);

const goLogin = () => router.push("/login");
</script>

<template>
  <div class="layout">
    <!-- 左侧导航 -->
    <aside class="sidebar">
      <div class="brand">
        <span class="brand-mark" aria-hidden="true">R</span>
        <div class="brand-text">
          <span class="brand-name">Reddit</span>
          <span class="brand-sub">Project B</span>
        </div>
      </div>

      <nav class="nav" aria-label="主导航">
        <RouterLink
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="nav-item"
          :class="{ 'nav-item--active': isActive(item.path) }"
        >
          <span class="nav-icon" :data-icon="item.icon" aria-hidden="true" />
          <span>{{ item.label }}</span>
        </RouterLink>
      </nav>

      <div class="sidebar-footer">
        <button type="button" class="nav-item nav-item--ghost" @click="goLogin">
          <span class="nav-icon" data-icon="logout" aria-hidden="true" />
          <span>退出登录</span>
        </button>
      </div>
    </aside>

    <!-- 右侧主区域 -->
    <div class="main">
      <header class="header">
        <div class="header-left">
          <h1 class="page-title">{{ pageTitle }}</h1>
          <p class="page-desc">欢迎回来，这里是你的管理后台</p>
        </div>
        <div class="header-right">
          <div class="user-pill">
            <span class="user-avatar" aria-hidden="true">U</span>
            <span class="user-name">用户</span>
          </div>
        </div>
      </header>

      <main class="content">
        <div class="content-card">
          <RouterView />
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.layout {
  --sidebar-w: 240px;
  --bg-page: #f0f2f5;
  --bg-sidebar: #0f172a;
  --bg-sidebar-hover: rgba(255, 255, 255, 0.06);
  --bg-sidebar-active: rgba(99, 102, 241, 0.22);
  --accent: #6366f1;
  --accent-soft: #818cf8;
  --text-sidebar: #e2e8f0;
  --text-muted: #94a3b8;
  --border: #e2e8f0;
  --shadow: 0 1px 3px rgb(15 23 42 / 0.06), 0 8px 24px rgb(15 23 42 / 0.04);
  --radius: 12px;

  display: flex;
  min-height: 100vh;
  background: var(--bg-page);
  color: #0f172a;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
}

/* —— 侧栏 —— */
.sidebar {
  width: var(--sidebar-w);
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  background: var(--bg-sidebar);
  color: var(--text-sidebar);
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px 18px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.brand-mark {
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  border-radius: 10px;
  background: linear-gradient(135deg, var(--accent), #a855f7);
  font-weight: 700;
  font-size: 1.1rem;
  color: #fff;
}

.brand-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.brand-name {
  font-weight: 600;
  font-size: 0.95rem;
  letter-spacing: 0.02em;
}

.brand-sub {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.nav {
  flex: 1;
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  color: var(--text-sidebar);
  text-decoration: none;
  background: transparent;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
  width: 100%;
  text-align: left;
}

.nav-item:hover {
  background: var(--bg-sidebar-hover);
  color: #fff;
}

.nav-item--active {
  background: var(--bg-sidebar-active);
  color: #fff;
}

.nav-item--active .nav-icon {
  color: var(--accent-soft);
}

.nav-item--ghost {
  opacity: 0.85;
}

.nav-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  opacity: 0.9;
}

.nav-icon[data-icon="home"]::before {
  content: "⌂";
  font-size: 1rem;
}

.nav-icon[data-icon="logout"]::before {
  content: "⎋";
  font-size: 0.95rem;
}

.sidebar-footer {
  padding: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

/* —— 主区 —— */
.main {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 10px 28px;
  background: #fff;
  border-bottom: 1px solid var(--border);
}

.page-title {
  margin: 0;
  font-size: 1.35rem;
  font-weight: 600;
  letter-spacing: -0.02em;
}

.page-desc {
  margin: 4px 0 0;
  font-size: 0.85rem;
  color: var(--text-muted);
}

.user-pill {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 12px 6px 6px;
  border-radius: 999px;
  background: var(--bg-page);
  border: 1px solid var(--border);
}

.user-avatar {
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent), var(--accent-soft));
  color: #fff;
  font-size: 0.8rem;
  font-weight: 600;
}

.user-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: #334155;
}

.content {
  flex: 1;
  padding: 24px 28px 28px;
  overflow: auto;
}

.content-card {
  min-height: calc(100vh - 140px);
  padding: 24px;
  background: #fff;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
}

@media (max-width: 768px) {
  .layout {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
  }

  .brand {
    flex: 1;
    border-bottom: none;
  }

  .nav {
    flex: none;
    flex-direction: row;
    padding: 8px 12px;
    width: 100%;
    order: 3;
    overflow-x: auto;
  }

  .sidebar-footer {
    border-top: none;
    padding: 8px 12px;
  }

  .header {
    padding: 16px;
  }

  .content {
    padding: 16px;
  }
}
</style>
