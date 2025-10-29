<template>
  <div class="w-full mx-auto px-3 sm:px-6 mt-4 flex flex-col items-center">

    <div class="w-full md:w-10/12">

      <!-- 🔹 LUGAR DE ASIGNACIÓN -->
      <div class="text-lg font-bold mt-3 mb-1 underline">Lugar de Asignación</div>

      <div class="flex">
        <div class="font-bold text-xs w-2/5 sm:w-1/4">Área Responsable</div>
        <div class="text-xs uppercase">{{ area_responsable }}</div>
      </div>

      <div class="flex">
        <div class="font-bold text-xs w-2/5 sm:w-1/4">Lugar Designación</div>
        <div class="text-xs uppercase">{{ lugar_designacion }}</div>
      </div>

      <div class="flex">
        <div class="font-bold text-xs w-2/5 sm:w-1/4">Provincia</div>
        <div class="text-xs uppercase">{{ provincia_distrito }}</div>
      </div>

      <div class="flex">
        <div class="font-bold text-xs w-2/5 sm:w-1/4">Cantón</div>
        <div class="text-xs uppercase">{{ canton_distrito }}</div>
      </div>

      <div class="flex">
        <div class="font-bold text-xs w-2/5 sm:w-1/4">Dirección</div>
        <div class="text-xs uppercase">{{ direccion_distrito }}</div>
      </div>

      <div class="flex">
        <div class="font-bold text-xs w-2/5 sm:w-1/4">Nombre Director Distrital</div>
        <div class="text-xs uppercase">{{ nombre_director_distrital }}</div>
      </div>

      <div class="flex">
        <div class="font-bold text-xs w-2/5 sm:w-1/4">Área Designación</div>
        <div class="text-xs uppercase">{{ area_designacion }}</div>
      </div>

      <div class="flex">
        <div class="font-bold text-xs w-2/5 sm:w-1/4">Actividad General</div>
        <div class="text-xs uppercase">{{ actividadGeneral }}</div>
      </div>


      <!-- 🔹 CAPACITACIÓN -->
      <div class="text-lg font-bold mt-3 mb-1 underline">Capacitación</div>

      <template
        v-if="direccionCapacitacion || fechaDeCapacitacion || horaDeCapacitacion || linkAcceso || lugarDeCapacitacion || tipoCapacitacion">

        <div class="flex" v-if="tipoCapacitacion">
          <div class="font-bold text-xs w-2/5 sm:w-1/4">Tipo</div>
          <div class="text-xs uppercase">{{ tipoCapacitacion }}</div>
        </div>

        <div class="flex" v-if="lugarDeCapacitacion">
          <div class="font-bold text-xs w-2/5 sm:w-1/4">Lugar</div>
          <div class="text-xs uppercase">{{ lugarDeCapacitacion }}</div>
        </div>

        <div class="flex" v-if="direccionCapacitacion">
          <div class="font-bold text-xs w-2/5 sm:w-1/4">Dirección</div>
          <div class="text-xs uppercase">{{ direccionCapacitacion }}</div>
        </div>

        <div class="flex" v-if="fechaDeCapacitacion">
          <div class="font-bold text-xs w-2/5 sm:w-1/4">Fecha</div>
          <div class="text-xs">{{ fechaDeCapacitacion }}</div>
        </div>

        <div class="flex" v-if="horaDeCapacitacion">
          <div class="font-bold text-xs w-2/5 sm:w-1/4">Hora</div>
          <div class="text-xs">{{ horaDeCapacitacion }}</div>
        </div>

        <div class="flex" v-if="linkAcceso">
          <div class="font-bold text-xs w-2/5 sm:w-1/4">Enlace</div>
          <div class="text-xs">
            <a :href="linkAcceso" target="_blank" class="text-blue-600 underline hover:text-blue-800 break-words">
              {{ linkAcceso }}
            </a>
          </div>
        </div>

      </template>

      <template v-else>
        <p class="text-xs font-semibold text-gray-700 text-center mt-1">POR CONFIRMAR</p>
      </template>

      <!-- ✅ Checkbox y botón -->
      <div
        v-if="(direccionCapacitacion || fechaDeCapacitacion || horaDeCapacitacion || linkAcceso || lugarDeCapacitacion || tipoCapacitacion) && parseInt(finalizadoCapacitacion) !== 1"
        class="flex flex-col items-center justify-center text-center mt-2 space-y-2">

        <div class="flex items-center justify-center gap-2 flex-wrap">
          <input id="checkTerminos" type="checkbox" v-model="aceptaTerminos"
            class="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500 align-middle" />
          <label for="checkTerminos" class="text-xs sm:text-sm text-gray-700 flex items-center gap-1 select-none">
            <span>He leído y acepto los</span>
            <button @click="abrirModal" type="button"
              class="text-blue-600 underline hover:text-blue-800 focus:outline-none">
              Términos y Condiciones
            </button>
          </label>
        </div>

        <p v-if="mostrarError" class="text-red-500 text-xs mt-1">
          Debe aceptar los términos y condiciones antes de continuar.
        </p>

        <button @click="finalizarRegistro"
          class="bg-red-600 text-white px-4 sm:px-5 py-2 rounded-md hover:bg-red-700 transition text-xs sm:text-sm">
          Finalizar Registro
        </button>
      </div>

    </div>

    <!-- 🧩 Modal de Términos -->
    <div v-if="mostrarModal" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-3">
      <div class="bg-white rounded-lg shadow-lg max-w-lg w-full relative max-h-[85vh] overflow-y-auto text-center p-4">
        <!-- Botón cerrar -->
        <button @click="cerrarModal" class="absolute top-2 right-3 text-gray-500 hover:text-red-600 text-xl font-bold">
          ×
        </button>

        <h2 class="font-bold text-gray-700 text-sm mb-2 underline">Términos y Condiciones</h2>

        <div class="text-xs text-gray-700 text-justify space-y-2 leading-tight">
          <p>
            Declaro la veracidad y autenticidad de los datos proporcionados en este formulario y autorizo expresamente
            al
            Ministerio de Educación, Deporte y Cultura para el tratamiento de mis datos personales conforme a lo
            establecido
            en la Ley Orgánica de Protección de Datos Personales y demás normativa vigente, para fines de verificación,
            control y ejecución del mecanismo “Jóvenes en Acción”, por lo que:
          </p>

          <ul class="list-disc list-inside ml-4">
            <li>Cumplo con todos los criterios generales establecidos en el artículo 2 del Decreto Ejecutivo Nro. 178 de
              07
              de octubre de 2025, así como con la normativa secundaria emitida por el Ministerio de Educación, Deporte y
              Cultura.</li>
            <li>Ser el titular de la cuenta bancaria registrada en el sistema correspondiente y acepto que los datos
              referentes a dicha cuenta no podrán ser modificados.</li>
            <li>Que la información registrada es verídica, única y no ha sido duplicada.</li>
            <li>Que no soy beneficiario o beneficiaria de ningún otro programa ejecutado por el Ministerio de Desarrollo
              Humano.</li>
            <li>Que no cuento con seguridad social contributiva; y, que</li>
            <li>Que previamente no he sido beneficiario del mecanismo “Jóvenes en Acción” (primer periodo).</li>
          </ul>

          <p>
            Reconozco que el incumplimiento de los requisitos establecidos podrá conllevar a la exclusión del mecanismo
            sin
            derecho a reclamo alguno, y que cualquier falsedad puede dar lugar a las acciones administrativas y legales
            que
            correspondan, para todos los efectos legales derivados de esta declaración, me someto a las leyes de la
            República del Ecuador y a la jurisdicción de los jueces competentes del lugar en que se gestione el
            mecanismo.
          </p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

import { observableAxios__cargar_capacitacion, cumplimiento__finalizar } from '@/js/axios/index.js';
import { forkJoin } from "rxjs";

export default {
  name: "InformacionCapacitacion",
  props: {
    area_responsable: String,
    cod_pago_rechazo: String,
    area_designacion: String,
    lugar_designacion: String,
    zona: String,
    cod_distrito: String,
    provincia_distrito: String,
    canton_distrito: String,
    direccion_distrito: String,
    nombre_director_distrital: String,
    actividadGeneral: String,
    cedula: String,
    idCredencial: Number,
  },
  data() {
    return {
      aceptaTerminos: false,
      mostrarModal: false,
      mostrarError: false,
      direccionCapacitacion: null,
      fechaDeCapacitacion: null,
      horaDeCapacitacion: null,
      linkAcceso: null,
      lugarDeCapacitacion: null,
      tipoCapacitacion: null,
      finalizadoCapacitacion: null,
    };
  },
  mounted() {
    this.cargaCapacitacion();
    this.cargaFinalizar();
  },
  methods: {
    cargaFinalizar() {
      forkJoin([cumplimiento__finalizar(this.idCredencial)]).subscribe({
        next: (results) => {

          const data = results[0].informacion || [];
          this.finalizadoCapacitacion = data;


        },
        error: (error) => {
          console.error('Error cargando datos bancarios:', error);
        }
      });
    },
    cargaCapacitacion() {
      forkJoin([observableAxios__cargar_capacitacion(this.cedula)]).subscribe({
        next: (results) => {

          const data = results[0].mensaje || [];
          this.direccionCapacitacion = data[0].direccionCapacitacion;
          this.fechaDeCapacitacion = data[0].fechaDeCapacitacion;
          this.horaDeCapacitacion = data[0].horaDeCapacitacion;
          this.linkAcceso = data[0].linkAcceso;
          this.lugarDeCapacitacion = data[0].lugarDeCapacitacion;
          this.tipoCapacitacion = data[0].tipoCapacitacion;

        },
        error: (error) => {
          console.error('Error cargando datos bancarios:', error);
        }
      });
    },
    abrirModal() {
      this.mostrarModal = true;
    },
    cerrarModal() {
      this.mostrarModal = false;
    },
    finalizarRegistro() {
      if (!this.aceptaTerminos) {
        this.mostrarError = true;
        setTimeout(() => (this.mostrarError = false), 3000);
        return;
      }
      this.$emit("guardar");
    },
  },
};
</script>
