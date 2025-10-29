import { createRouter, createWebHashHistory } from "vue-router";
import Ingreso from "@/views/Auth_ingreso.vue";
import Beneficiario_validacion from "@/views/Beneficiario_validacion.vue";
import ListadoBeneficiarios from "@/views/ListadoBeneficiarios.vue";
import AsignarRoles from "@/views/AsignarRoles.vue";
import Beneficiario_validacionCredenciales from "@/views/Beneficiario_validacionCredenciales.vue";
import Informacion_punto from "@/views/Informacion_punto.vue";
import No_cumplenCriterios from "@/views/No_cumplenCriterios.vue";
import { observableAxios__salir } from '@/js/axios/index.js';
import { forkJoin } from "rxjs";

const routes = [];

function isAuthenticated() {

  const token = localStorage.getItem("jwt");
  if (!token) {
    return false;
  }

  return true;

}

routes.push(
  {
    path: "/",
    name: "/",
    redirect: "/ingreso",
  },
  {
    path: "/ingreso",
    name: "Ingreso",
    component: Ingreso,
  },
  {
    path: "/validacion-usuarios",
    name: "Validación de Usuarios",
    component: Beneficiario_validacion,
    beforeEnter: (to, from, next) => {
      if (!isAuthenticated()) {
        next({ name: "Ingreso" });
      } else {
        next();
      }
    },
  },
  {
    path: "/listado-beneficiarios",
    name: "Listado Beneficiarios",
    component: ListadoBeneficiarios,
    beforeEnter: (to, from, next) => {
      if (!isAuthenticated()) {
        next({ name: "Ingreso" });
      } else {
        next();
      }
    },
  },
  {
    path: "/asignacion-de-roles",
    name: "Asignación de Roles",
    component: AsignarRoles,
    beforeEnter: (to, from, next) => {
      if (!isAuthenticated()) {
        next({ name: "Ingreso" });
      } else {
        next();
      }
    },
  },
  {
    path: "/validacion-de-credenciales",
    name: "Validación Credenciales",
    component: Beneficiario_validacionCredenciales,
    beforeEnter: (to, from, next) => {
      if (!isAuthenticated()) {
        next({ name: "Ingreso" });
      } else {
        next();
      }
    },
  },
  {
    path: "/informacion-de-punto",
    name: "Información de punto",
    component: Informacion_punto,
    beforeEnter: (to, from, next) => {
      if (!isAuthenticated()) {
        next({ name: "Ingreso" });
      } else {
        next();
      }
    },
  },
  {
    path: "/no-cumplen-criterios",
    name: "No cumplen criterios",
    component: No_cumplenCriterios,
    beforeEnter: (to, from, next) => {
      if (!isAuthenticated()) {
        next({ name: "Ingreso" });
      } else {
        next();
      }
    },
  },
);

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

let inactivityTimer;

function resetInactivityTimer() {
  if (inactivityTimer) clearTimeout(inactivityTimer);

  inactivityTimer = setTimeout(() => {
    forkJoin([observableAxios__salir()]).subscribe({
      next: (results) => {
        const mensaje = results[0].mensaje;
        if (parseInt(mensaje, 10) === 1) {

          console.warn("Sesión cerrada por inactividad");
          localStorage.removeItem("jwt");
          router.push("/ingreso");

        }
      },
      error: (error) => {
        console.error(error);
      },
    });


  }, 10 * 60 * 1000);

}

function isAuthenticated__inactividad() {
  const token = localStorage.getItem("jwt");
  return !!token;
}

function requireAuth(to, from, next) {
  if (!isAuthenticated__inactividad()) {
    next({ name: "Ingreso" });
  } else {
    resetInactivityTimer();
    next();
  }
}

window.addEventListener("mousemove", resetInactivityTimer);
window.addEventListener("keydown", resetInactivityTimer);

export default router;
