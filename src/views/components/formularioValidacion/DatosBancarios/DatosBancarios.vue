<template>
  <div v-if="activeTab === 1" class="h-screen overflow-y-auto">

    <div class="text-lg font-bold mt-2 mb-4 underline border-2 border-red-500 p-2 rounded-lg bg-red-100">
      Alerta : Recuerde si los datos de la cuenta no pertenecen al beneficiario registrado, el valor correspondiente no será acreditado
    </div>

    <div
      class="text-lg font-bold mt-2 mb-4 border-2 border-cyan-500 p-2 rounded-lg bg-sky-100 inline-flex items-center space-x-2"
      v-if="parseInt(cod_pago_rechazo) !== 1 && parseInt(editoCuenta)!==1">
      <input type="checkbox" @click="accionModificar" />
      <span>Click para editar su cuenta (Recuerde que solo puede editar una sola vez)</span>
    </div>

    <!-- Vista cuando no está en modo edición -->
    <div v-if="!editarCuentaBancariaValidada">
      <div class="flex">
        <div class="font-bold text-xs w-2/5 sm:w-1/4">Tipo cuenta</div>
        <div class="text-xs">{{ localTipoCuentaBase }}</div>
      </div>
      <div class="flex">
        <div class="font-bold text-xs w-2/5 sm:w-1/4">Número de cuenta</div>
        <div class="text-xs">{{ localNumeroCuenta }}</div>
      </div>
      <div class="flex">
        <div class="font-bold text-xs w-2/5 sm:w-1/4">Entidad financiera</div>
        <div class="text-xs">{{ localNumeroCuentaBase }}</div>
      </div>
    </div>

    <!-- Vista editable -->
    <div v-else>
      <div class="flex">
        <div class="font-bold text-xs w-2/5 sm:w-1/4">Tipo cuenta</div>
        <select class="text-xs form-control" v-model="localTipoCuenta">
          <option v-for="tipo in tiposCuenta" :key="tipo.id" :value="tipo.id">
            {{ tipo.nombre }}
          </option>
        </select>
      </div>
      <div class="flex mt-1">
        <div class="font-bold text-xs w-2/5 sm:w-1/4">Número de cuenta</div>
        <input class="text-xs form-control" v-model="localNumeroCuenta" />
      </div>
      <div class="flex mt-1">
        <div class="font-bold text-xs w-2/5 sm:w-1/4">Entidad financiera</div>
        <select class="text-xs form-control" v-model="localNombreCorto">
          <option v-for="banco in bancos" :key="banco.id" :value="banco.id">
            {{ banco.razonSocial }}
          </option>
        </select>
      </div>
    </div>

    <button @click="emitirGuardar" v-if="!mostrarDocumento || (mostrarDocumento && !editaCuentaDespues)" class="mt-2 bg-blue-500 text-white px-4 py-2 rounded 
        sm:px-6 sm:py-3 sm:mt-4 sm:mr-0 
        w-full sm:w-auto sm:text-sm sm:mr-2 sm:text-white">
      Guardar
    </button>

  </div>
</template>

<script>
import { observableAxios__obtener__tipo__cuenta, observableAxios__obtener__bancos, observableAxios__cargar_datos_bancarios,observableAxios__cargar__edicionCuenta } from '@/js/axios/index.js';
import { forkJoin } from "rxjs";

export default {
  name: "DatosBancarios",
  props: {
    activeTab: Number,
    cuentaBancariaValidada: Boolean,
    editarCuentaBancariaValidada: Boolean,
    mostrarDocumento: Boolean,
    editaCuentaDespues: Boolean,
    tipoCuenta: String,
    numeroCuenta: String,
    nombreCorto: String,
    tipoCuenta_nombre: String,
    cuentaBancaria_nombre: String,
    idBanco_cuenta: String,
    tipoCuenta_banco: String,
    numeroCuenta_banco: String,
    idEntidadBancaria_banco: String,
    idCredencial: Number,
    cod_pago_rechazo: String,
  },
  emits: ["update:tipoCuenta", "update:numeroCuenta", "update:nombreCorto", "editar-cuenta", "guardar"],
  data() {
    return {
      localTipoCuenta: null,
      localNumeroCuenta: this.numeroCuenta_banco || this.numeroCuenta,
      localNombreCorto: null,
      bancos: [],
      tiposCuenta: [],
      localNumeroCuentaBase: null,
      localTipoCuentaBase: null,
      localEditarCuenta: false,
      editoCuenta:false,
    };
  },
  mounted() {
    this.cargarBancos();
    this.cargarTipoCuenta();
    this.cargarDatosBancarios();
    this.cargarEditableCuenta();
  },
  watch: {
    // Si los props cambian luego de montado
    tipoCuenta_banco(newVal) {
      this.localTipoCuenta = newVal;
    },
    idEntidadBancaria_banco(newVal) {
      this.localNombreCorto = newVal;
    },
    // Emitir cambios al padre
    localTipoCuenta(val) {
      this.$emit("update:tipoCuenta", val);
    },
    localNumeroCuenta(val) {
      this.$emit("update:numeroCuenta", val);
    },
    localNombreCorto(val) {
      this.$emit("update:nombreCorto", val);
    },
  },
  methods: {
    cargarEditableCuenta() {
      forkJoin([observableAxios__cargar__edicionCuenta(this.idCredencial)]).subscribe({
        next: (results) => {
          const data = results[0].informacion || [];
          this.editoCuenta=data;
        },
        error: (error) => {
          console.error('Error cargando datos bancarios:', error);
        }
      });
    },
    cargarDatosBancarios() {
      forkJoin([observableAxios__cargar_datos_bancarios(this.idCredencial)]).subscribe({
        next: (results) => {
          const data = results[0].mensaje || [];

          if (data.length > 0) {
            const cuenta = data[0];
            this.localTipoCuenta = cuenta.tipoCuenta;
            this.localNumeroCuenta = cuenta.numeroCuenta;
            this.localNombreCorto = cuenta.idEntidadBancaria;
            this.localNumeroCuentaBase = cuenta.bancoData;
            this.localTipoCuentaBase = cuenta.tipoCuentaData;
          }

        },
        error: (error) => {
          console.error('Error cargando datos bancarios:', error);
        }
      });
    },
    cargarBancos() {
      forkJoin([observableAxios__obtener__bancos()]).subscribe({
        next: (results) => {
          this.bancos = results[0].mensaje || [];
        },
        error: (error) => {
          console.error('Error cargando bancos:', error);
        }
      });
    },
    cargarTipoCuenta() {
      forkJoin([observableAxios__obtener__tipo__cuenta()]).subscribe({
        next: (results) => {
          this.tiposCuenta = results[0].mensaje || [];
        },
        error: (error) => {
          console.error('Error cargando tipos de cuenta:', error);
        }
      });
    },
    accionModificar(event) {
      const checked = event.target.checked;
      this.$emit("editar-cuenta", checked);
    },

    emitCambioDatos() {
      this.$emit("cambio-datos-bancarios", {
        tipoCuenta: this.localTipoCuenta,
        numeroCuenta: this.localNumeroCuenta,
        nombreCorto: this.localNombreCorto,
        editarCuenta: this.localEditarCuenta
      });
    },
    emitirGuardar() {
      this.$emit("guardar", 2);
      this.emitCambioDatos();
    },
  },
};
</script>
