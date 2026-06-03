<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

/** 登录表单字段 */
const form = reactive({
  username: "",
  password: "",
  remember: true,
});

const loading = ref(false);
const errorMsg = ref("");

/** 本地 token 键名，供后续路由守卫读取 */
const AUTH_TOKEN_KEY = "project-b:auth-token";

/** 提交登录：当前无后端接口，校验通过后写入 token 并跳转首页 */
async function handleSubmit() {
  errorMsg.value = "";

  const username = form.username.trim();
  const password = form.password.trim();

  if (!username) {
    errorMsg.value = "请输入用户名";
    return;
  }
  if (!password) {
    errorMsg.value = "请输入密码";
    return;
  }

  loading.value = true;

  try {
    // TODO: 接入 api.login 后替换为真实请求
    await new Promise((resolve) => setTimeout(resolve, 600));

    // if (form.remember) {
    //   localStorage.setItem(AUTH_TOKEN_KEY, "mock-token");
    // } else {
    //   sessionStorage.setItem(AUTH_TOKEN_KEY, "mock-token");
    // }

    await router.push("/home");
  } catch {
    errorMsg.value = "登录失败，请稍后重试";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="login-page">
    <!-- 左侧品牌区 -->
    <section class="login-brand" aria-hidden="true">
      <div class="brand-inner">
        <span class="brand-mark">R</span>
        <h1 class="brand-title">Reddit Project B</h1>
        <p class="brand-desc">统一的管理后台入口，安全、简洁、高效</p>
      </div>
      <div class="brand-glow" />
    </section>

    <!-- 右侧表单区 -->
    <section class="login-panel">
      <div class="login-card">
        <header class="login-header">
          <h2 class="login-title">欢迎回来</h2>
          <p class="login-subtitle">请登录你的账号以继续</p>
        </header>

        <form class="login-form" @submit.prevent="handleSubmit">
          <div v-if="errorMsg" class="form-error" role="alert">
            {{ errorMsg }}
          </div>

          <label class="form-field">
            <span class="field-label">用户名</span>
            <input
              v-model="form.username"
              class="field-input"
              type="text"
              name="username"
              autocomplete="username"
              placeholder="请输入用户名"
              :disabled="loading"
            />
          </label>

          <label class="form-field">
            <span class="field-label">密码</span>
            <input
              v-model="form.password"
              class="field-input"
              type="password"
              name="password"
              autocomplete="current-password"
              placeholder="请输入密码"
              :disabled="loading"
            />
          </label>

          <div class="form-row">
            <label class="remember">
              <input
                v-model="form.remember"
                type="checkbox"
                class="remember-input"
                :disabled="loading"
              />
              <span>记住我</span>
            </label>
          </div>

          <button type="submit" class="submit-btn" :disabled="loading">
            {{ loading ? "登录中…" : "登录" }}
          </button>
        </form>
      </div>
    </section>
  </div>
</template>

<style scoped>
.login-page {
  --accent: #6366f1;
  --accent-soft: #818cf8;
  --bg-page: #f0f2f5;
  --bg-sidebar: #0f172a;
  --text-muted: #94a3b8;
  --border: #e2e8f0;
  --radius: 12px;
  --shadow: 0 1px 3px rgb(15 23 42 / 0.06), 0 8px 24px rgb(15 23 42 / 0.04);

  display: flex;
  min-height: 100vh;
  background: var(--bg-page);
  color: #0f172a;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
}

/* —— 左侧品牌 —— */
.login-brand {
  position: relative;
  flex: 1;
  display: none;
  align-items: center;
  justify-content: center;
  padding: 48px;
  background: var(--bg-sidebar);
  color: #e2e8f0;
  overflow: hidden;
}

.brand-inner {
  position: relative;
  z-index: 1;
  max-width: 360px;
}

.brand-mark {
  display: inline-grid;
  place-items: center;
  width: 56px;
  height: 56px;
  margin-bottom: 24px;
  border-radius: 14px;
  background: linear-gradient(135deg, var(--accent), #a855f7);
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
}

.brand-title {
  margin: 0 0 12px;
  font-size: 1.75rem;
  font-weight: 600;
  letter-spacing: -0.02em;
}

.brand-desc {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--text-muted);
}

.brand-glow {
  position: absolute;
  inset: auto -20% -30% -20%;
  height: 60%;
  background: radial-gradient(ellipse at center, rgb(99 102 241 / 0.35), transparent 70%);
  pointer-events: none;
}

/* —— 右侧表单 —— */
.login-panel {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 24px;
}

.login-card {
  width: 100%;
  max-width: 400px;
  padding: 40px 36px;
  background: #fff;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
}

.login-header {
  margin-bottom: 28px;
}

.login-title {
  margin: 0 0 6px;
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: -0.02em;
}

.login-subtitle {
  margin: 0;
  font-size: 0.9rem;
  color: var(--text-muted);
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.form-error {
  padding: 10px 12px;
  border-radius: 8px;
  font-size: 0.875rem;
  color: #b91c1c;
  background: #fef2f2;
  border: 1px solid #fecaca;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #334155;
}

.field-input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: 0.95rem;
  color: #0f172a;
  background: #fff;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.field-input::placeholder {
  color: #cbd5e1;
}

.field-input:focus {
  outline: none;
  border-color: var(--accent-soft);
  box-shadow: 0 0 0 3px rgb(99 102 241 / 0.15);
}

.field-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.form-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.remember {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.875rem;
  color: #475569;
  cursor: pointer;
  user-select: none;
}

.remember-input {
  width: 16px;
  height: 16px;
  accent-color: var(--accent);
}

.submit-btn {
  margin-top: 4px;
  width: 100%;
  padding: 11px 16px;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(135deg, var(--accent), var(--accent-soft));
  cursor: pointer;
  transition: opacity 0.15s, transform 0.1s;
}

.submit-btn:hover:not(:disabled) {
  opacity: 0.92;
}

.submit-btn:active:not(:disabled) {
  transform: scale(0.99);
}

.submit-btn:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

@media (min-width: 900px) {
  .login-brand {
    display: flex;
  }
}
</style>
