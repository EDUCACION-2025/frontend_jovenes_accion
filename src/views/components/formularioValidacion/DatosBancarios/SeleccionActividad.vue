<template>
  <div class="space-y-4 mt-2">
    <div>
      <div class="flex items-center">
        <input
          type="radio"
          id="limpieza"
          value="limpieza"
          v-model="formData.opcionSeleccionada"
          @change="$emit('seleccionarOpcion')"
          class="mr-2"
          :disabled="mostrarDocumento"
        />
        <label for="limpieza" class="font-bold text-xs cursor-pointer">Limpieza</label>
      </div>
      <div v-if="formData.opcionSeleccionada === 'limpieza'" class="mt-2">
        <p class="text-xs sm:text-sm">a) Recolección y gestión de residuos</p>
        <p class="text-xs sm:text-sm">b) Limpieza de sistemas de drenaje</p>
        <p class="text-xs sm:text-sm">c) Limpieza de caminos, senderos, áreas de juegos, canchas y más</p>
      </div>
    </div>

    <div>
      <div class="flex items-center">
        <input
          type="radio"
          id="mantenimiento"
          value="mantenimiento"
          v-model="formData.opcionSeleccionada"
          @change="$emit('seleccionarOpcion')"
          class="mr-2"
          :disabled="mostrarDocumento"
        />
        <label for="mantenimiento" class="font-bold text-xs cursor-pointer">Mantenimiento</label>
      </div>
      <div v-if="formData.opcionSeleccionada === 'mantenimiento'" class="mt-2">
        <p class="text-xs sm:text-sm">a) Corte y poda de césped, poda de árboles y arbustos</p>
        <p class="text-xs sm:text-sm">b) Siembra y riego de áreas verdes</p>
      </div>
    </div>

    <button
      v-if="!mostrarDocumento"
      @click="$emit('guardar')"
      class="mt-2 bg-blue-500 text-white px-4 py-2 rounded sm:px-6 sm:py-3 w-full sm:w-auto sm:text-sm"
    >
      Guardar
    </button>
  </div>
</template>

<script>
export default {
  name: "SeleccionActividad",
  props: {
    formData: Object,
    mostrarDocumento: Boolean
  }
};
</script>
