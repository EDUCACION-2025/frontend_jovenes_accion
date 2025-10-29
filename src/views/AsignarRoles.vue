<template>

  <form id="formulario" ref="formulario" role="form" class="flex-1 flex flex-col items-center w-full">

    <div class="flex justify-start items-center w-full sm:w-4/5 md:w-1/5 lg:w-2/5 ">

      <VsudInput type="text" placeholder="Buscar por nombre/ cédula/ usuario/ área / cargo" name="buscar" ref="buscar"
        v-model="formData.buscar" />

      <boton icon="fa-solid fa-magnifying-glass" text="" :ancho="'.w-5'" @click.prevent="buscar"></boton>

    </div>

  </form>

  <table ref="dataTable" class="display w-full"></table>

  <div class="hidden contenedor__modal">

    <div class="flex flex-col w-full text-bold items-start" id="contenedor">



    </div>

    <boton class="text-lg cursor-pointer mt-6" icon="fa-solid fa-floppy-disk" text="Guardar" :ancho="'.w-full'"
      id="guardarEnvio">
    </boton>

  </div>

</template>


<script>
import variable from '@/js/administracion/AsignarRoles.js';
export default {
  name: "AsignarRoles",
  mixins: [variable],
};
</script>