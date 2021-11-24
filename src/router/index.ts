import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "LayoutMain",
    redirect: "Repository",
    component: () => import("../layouts/LayoutMain.vue"),
    children: [
      {
        path: "Repository",
        name: "Repository",
        component: () => import("../views/Repository.vue"),
      },
      {
        path: "Repository/CreateCase",
        name: "CreateCase",
        component: () => import("../views/CreateCase.vue"),
      },
      {
        path: "Repository/:id",
        name: "EditCase",
        component: () => import("../views/EditCase.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
