<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100 p-4">
    <div class="bg-white border-l-8 border-purple-900 rounded-lg shadow-lg p-6 max-w-xl w-full flex flex-col md:flex-row items-center">
      <div class="mt-4 md:mt-0 text-center md:text-left">
        <h2 class="text-xl font-bold text-gray-800">Ministerio del Deporte</h2>
        <p class="text-gray-800 mt-2">
          Este servicio no está disponible en este momento. Nos encontramos realizando mejoras para brindarte una mejor experiencia.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const imgBase64 =
  'data:image/svg+xml;base64,' +
  btoa(`<?xml version="1.0" encoding="UTF-8"?>
    <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300">
      <rect width="100%" height="100%" fill="#6B21A8"/>
      <image href="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Coat_of_arms_of_Ecuador.svg/1200px-Coat_of_arms_of_Ecuador.svg.png" x="85" y="40" height="80" width="130"/>
      <text x="150" y="180" text-anchor="middle" font-size="20" fill="#FFFFFF" font-family="Arial, sans-serif">
        En Mantenimiento
      </text>
      <text x="150" y="210" text-anchor="middle" font-size="16" fill="#FFFFFF" font-family="Arial, sans-serif">
        Min. del Deporte
      </text>
    </svg>
  `)
</script>

<style>
html,
body {
  overflow-x: hidden;
  overflow-y: auto;
  height: auto;
  min-height: 100vh;
}

.main-content {
  overflow-x: hidden;
  overflow-y: auto;
}

.container {
  min-height: 100vh;
}

img {
  object-fit: cover;
  object-position: center;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
}
</style>
