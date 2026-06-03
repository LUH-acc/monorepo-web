import { createApp } from "vue";
import App from "./App.vue";
import router from "./routes";
import "./index.css";
// main.ts
import 'virtual:uno.css'

const app = createApp(App);
app.use(router);
app.mount("#app");

