<template>

<main class="flex flex-col w-full items-center">

    <div class="md:w-1/3 w-full flex flex-col p-2 border border-gray-200 rounded-lg bg-white shadow-sm space-y-2 text-gray-800 m-2 text-center text-2xl">
    <h1>DETALLE DE PUNTO ASIGNADO</h1>
    </div>

    <div class="md:w-1/3 w-full flex flex-col items-start p-4 border border-gray-200 rounded-lg bg-white shadow-sm space-y-2 text-gray-800">

<div class="text-lg font-bold text-gray-700">
    Punto
</div>
<div class="text-sm">
    {{ punto }}
</div>

<div class="text-lg font-bold text-gray-600">
    Cantón
</div>
<div class="text-sm">
    {{ canton }}
</div>

<div class="text-lg font-bold text-gray-600">
    Parroquia
</div>
<div class="text-sm">
    {{ parroquia }}
</div>

<div class="text-lg font-bold text-gray-600">
    Dirección
</div>
<div class="text-sm">
    {{ direccion }}
</div>

<div class="text-lg font-bold text-gray-600">
    Persona de contacto del punto
</div>
<div class="text-sm">
    {{ instructor }}
</div>

<div class="text-lg font-bold text-gray-600">
    Teléfono de contacto del punto
</div>
<div class="text-sm">
    {{ celularInstructor }}
</div>

</div>


</main>

</template>

<script>
import variable from "@/js/beneficiario/Beneficiario_validacion.js";

export default {
    name: "Beneficiario_validacion",
    mixins: [variable],
};
</script>