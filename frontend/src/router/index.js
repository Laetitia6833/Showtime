import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Admin from "../views/Admin.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Concert from "../views/Concert.vue";
import Concerts from "../views/Concerts.vue";
import Profil from "../views/Profil.vue";
import User from "../views/UserVue.vue";
import store from "../store/index";
import Update from "../views/Update.vue";
import Users from "../views/Admin/Users.vue";
import AdminProfil from "../views/Admin/Profil.vue";
import ManageConcerts from "../views/Admin/Concerts.vue";
import UpdateUser from "../views/Admin/UpdateUser.vue";
import UpdateConcert from "../views/Admin/UpdateConcert.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },

  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/concerts",
    name: "Concerts",
    component: Concerts,
  },
  {
    path: "/concert/:id",
    name: "concert",
    component: Concert,
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    children: [
      {
        path: "",
        component: AdminProfil,
      },
      {
        path: "users",
        name: "manageUsers",
        component: Users,
      },
      {
        path: "concerts",
        name: "manageConcerts",
        component: ManageConcerts,
      },
      {
        path: "updateUser/:id",
        name: "updateUser",
        component: UpdateUser,
      },
      {
        path: "updateConcert/:id",
        name: "UpdateConcert",
        component: UpdateConcert,
      },
    ],
    // child dashboard
    beforeEnter: (to, from, next) => {
      if (store.state.authenticated !== "admin") {
        next("/login");
      } else {
        next();
      }
    },
  },
  {
    path: "/user/:id",
    name: "User",
    component: User,
    children: [
      {
        path: "",
        component: Profil,
      },
      {
        path: "update",
        component: Update,
      },
    ],
    beforeEnter: (to, from, next) => {
      if (store.state.authenticated !== "user") {
        next("/");
      } else {
        next();
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
