import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "@/store";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/add",
    name: "AddStock",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "RecentOrders" */
        "../views/AddStock.vue"
      ),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/orders",
    name: "Orders",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "Orders" */ "../views/Orders.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/management",
    name: "Management",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "Management" */ "../views/Management.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/login",
    name: "login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "Login" */ "../views/Login.vue")
  },
  {
    path: "/calculator",
    name: "Calculator",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "Login" */ "../views/Calculator.vue")
  },
  {
    path: "/signup",
    name: "signup",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "Login" */ "../views/SignUp.vue")
  },
  {
    path: "/forgot",
    name: "forgot",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "Login" */ "../views/ForgotPassword.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (!store.state.user) {
      next({
        name: "login"
      });
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router;
