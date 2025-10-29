<template>
  <div>
    <!-- DATOS PERSONALES -->
    <div class="text-lg font-bold mt-2 mb-1 underline">Datos personales</div>

    <div class="flex">
      <div class="font-bold text-xs w-2/5 sm:w-1/4">Cédula</div>
      <div class="text-xs">{{ cedula }}</div>
    </div>


    <div class="flex">
      <div class="font-bold text-xs w-2/5 sm:w-1/4">Nombres</div>
      <div class="text-xs uppercase">{{ nombre }} {{ apellidos }}</div>
    </div>


    <div class="flex">
      <div class="font-bold text-xs w-2/5 sm:w-1/4">Fecha de nacimiento</div>
      <div class="text-xs">{{ fechaNacimiento }}</div>
    </div>

    <div class="flex">
      <div class="font-bold text-xs w-2/5 sm:w-1/4">Edad</div>
      <div class="text-xs">{{ edad }}</div>
    </div>

    <div class="flex">
      <div class="font-bold text-xs w-2/5 sm:w-1/4">Género</div>
      <div class="text-xs uppercase">{{ genero }}</div>
    </div>

    <div class="flex">
      <div class="font-bold text-xs w-2/5 sm:w-1/4">Nacionalidad</div>
      <div class="text-xs uppercase">{{ nacionalidad }}</div>
    </div>


    <!-- DATOS DE CONTACTO -->
    <div class="text-lg font-bold mt-2 mb-1 underline">Datos de contacto</div>

    <div class="flex">
      <div class="font-bold text-xs w-2/5 sm:w-1/4">Teléfono</div>
      <div class="text-xs">{{ telefono }}</div>
    </div>

    <div class="flex">
      <div class="font-bold text-xs w-2/5 sm:w-1/4">Correo</div>
      <div class="text-xs">{{ correo }}</div>
    </div>

    <!-- DATOS DOMICILIO -->
    <div class="text-lg font-bold mt-2 mb-1 underline">Datos domicilio</div>

    <div class="flex">
      <div class="font-bold text-xs w-2/5 sm:w-1/4">Provincia</div>
      <div class="text-xs uppercase">{{ provincia }}</div>
    </div>

    <div class="flex">
      <div class="font-bold text-xs w-2/5 sm:w-1/4">Cantón</div>
      <div class="text-xs uppercase">{{ canton }}</div>
    </div>

    <div class="flex">
      <div class="font-bold text-xs w-2/5 sm:w-1/4">Parroquia</div>
      <div class="text-xs uppercase">{{ parroquia }}</div>
    </div>

    <div class="flex">
      <div class="font-bold text-xs w-2/5 sm:w-1/4">Dirección</div>
      <div class="text-xs">{{ direccion }}</div>
    </div>

    <!-- INFORMACIÓN ADICIONAL -->
    <!-- <div class="flex">
      <div class="font-bold text-xs w-2/5 sm:w-1/4">Institución</div>
      <div class="text-xs uppercase">{{ nombreInstitucion }}</div>
    </div>

    <div class="flex">
      <div class="font-bold text-xs w-2/5 sm:w-1/4">Área</div>
      <div class="text-xs uppercase">{{ area }}</div>
    </div> -->

    <!-- <div class="flex">
      <div class="font-bold text-xs w-2/5 sm:w-1/4">Condición de pobreza</div>
      <div class="text-xs uppercase">{{ condicion_pobreza }}</div>
    </div>

    <div class="flex">
      <div class="font-bold text-xs w-2/5 sm:w-1/4">Destreza</div>
      <div class="text-xs uppercase">{{ destreza }}</div>
    </div> -->

    <button
      @click="$emit('guardar')"
      class="mt-2 bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-auto sm:text-sm">
      Guardar
    </button>
  </div>
</template>

<script>
export default {
  name: "DatosPersonales",
  props: {
    id: Number,
    cedula: String,
    apellidos: String,
    fechaNacimiento: String,
    nombre: String,
    edad:String,
    siglas: String,
    nombreInstitucion: String,
    area: String,
    destreza: String,
    genero: String,
    nacionalidad: String,
    idProvincia: String,
    provincia: String,
    idCanton: String,
    canton: String,
    idParroquia: String,
    parroquia: String,
    direccion: String,
    telefono: String,
    correo: String,
    idifi: String,
    nombreCorto: String,
    tipoCuenta: String,
    numeroCuenta: String,
    isspol: String,
    issfa: String,
    iess: String,
    area_mdh: String,
    puntaje: String,
    condicion_pobreza: String,
    beneficios_mdh: String,
    beneficiario_jovenes_1: String,
    cumplimiento: String,
    puntaje_num: String,
    orden_puntaje: String,
    mindedec_29600: String

  }
};
</script>
