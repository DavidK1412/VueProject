import Vue from 'vue'
import VueRouter from 'vue-router'
import App from "@/App";
import LogIn from "@/components/LogIn";
import SignUp from "@/components/SignUp";
import Menu from "./components/Menu";
import Ventas from "@/components/Ventas";
import Inventario from "@/components/Inventario";
import Catalogo from "@/components/Catalogo";
import AdminView from "@/components/AdminView";


Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'root',
    component: App
  },
  {
    path: '/user/logIn',
    name: "logIn",
    component: LogIn
  },
  {
    path: '/user/signUp',
    name: "signUp",
    component: SignUp
  },
  {
    path: '/user/Menu',
    name: "Menu",
    component: Menu
  },
  {
    path: '/user/Ventas',
    name: "Ventas",
    component: Ventas
  },
  {
    path: '/user/Inventario',
    name: "Inventario",
    component: Inventario
  },
  {
    path: '/Catalogo',
    name: "Catalogo",
    component: Catalogo,
  },
  {
    path: '/user/Admin',
    name: "Admin",
    component: AdminView,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
