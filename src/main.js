import { createApp } from "vue";
import App from "./App.vue";
import "./assets/global.css";
import { createRouter, createWebHistory } from "vue-router";
import NavbarOptions from "./components/Navbar/NavbarOptions.vue";

const app = createApp(App);

const routes = [
  { path: "/", name: "dashboard" },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

app.component("MyNavbar", NavbarOptions);
app.use(router);

app.mount("#app");
