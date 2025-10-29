<template>
    <main class="mt-0 main-content main-content-bg flex flex-col min-h-screen w-screen overflow-x-hidden overflow-y-auto">
      <section class="flex-grow flex items-start justify-center py-10">
        <div class="container">
          <div class="row">
            <div class="mx-auto col-xl-3 col-lg-4 col-md-5 d-flex flex-column mt-n9">
              <div class="card shadow-lg p-4 bg-white rounded-lg">
                <div class="pb-0 card-header text-start">
                  <p class="mb-0 text-lg font-bold text-gray-800 text-center">ECUATORIANOS EN ACCIÓN</p>
                </div>
                <div class="card-body">
                  <form id="formulario" ref="formulario" role="form" class="text-start">
  
                    <div class="mb-3">
  
                      <label class="text-gray-700 font-semibold block mb-1 text-sm">Cédula de identidad</label>
                      <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
                        :class="{ 'error-border': errors.usuario }" placeholder="Usuario" id="usuario" name="usuario"
                        v-model="formData.usuario" @input="inputCedula" />
  
                    </div>
  
  
                    <button id="validar"
                      class="my-3 bg-blue-800 hover:bg-blue-gray-700 text-white font-bold py-2 px-4 rounded-md w-full text-sm"
                      @click.prevent="validar" v-if="!cargando && !validaContrasena">
                      Continuar
                    </button>
  
                    <img v-if="cargando" src="https://i.gifer.com/ZZ5H.gif" alt="Cargando..." class="w-10 mx-auto" />
  
                    <div class="mb-3 relative" v-if="validaContrasena === true && parseInt(tipoUsuario, 10) !== 2">
  
                      <label class="text-gray-700 font-semibold block mb-1 text-sm">{{ tipologia }}</label>
                      <div class="relative">
                        <input :type="showPassword ? 'text' : 'password'" :class="{ 'error-border': errors.password }"
                          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm pr-10"
                          :placeholder="tipologia" id="password" name="password" v-model="formData.password" />
                        <button type="button" class="absolute inset-y-0 right-2 flex items-center text-gray-500"
                          @click="showPassword = !showPassword">
                          {{ showPassword ? '🙈' : '👁️' }}
                        </button>
                      </div>
  
                    </div>
  
  
                    <div class="mb-3 relative" v-if="validaContrasena === true && parseInt(tipoUsuario, 10) === 2">
  
                      <label class="text-gray-700 font-semibold block mb-1 text-sm">Seleccione mes de nacimiento</label>
                      <div class="relative">
  
                        <select name="mesNacimiento" id="mesNacimiento" :class="{ 'error-border': errors.mesNacimiento }"
                          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm pr-10 mb-2"
                          v-model="formData.mesNacimiento">
                          <option value="" disabled selected>--Seleccione un mes--</option>
                          <option value="1">ENERO</option>
                          <option value="2">FEBRERO</option>
                          <option value="3">MARZO</option>
                          <option value="4">ABRIL</option>
                          <option value="5">MAYO</option>
                          <option value="6">JUNIO</option>
                          <option value="7">JULIO</option>
                          <option value="8">AGOSTO</option>
                          <option value="9">SEPTIEMBRE</option>
                          <option value="10">OCTUBRE</option>
                          <option value="11">NOVIEMBRE</option>
                          <option value="12">DICIEMBRE</option>
                        </select>
  
                      </div>
  
                      <label class="text-gray-700 font-semibold block mb-1 text-sm">Día de nacimiento</label>
                      <div class="relative">
  
                        <select name="diaNacimientoForm" id="diaNacimientoForm"
                          :class="{ 'error-border': errors.diaNacimientoForm }"
                          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm pr-10 mb-2"
                          v-model="formData.diaNacimientoForm">
                          <option value="" disabled selected>--Seleccione un día--</option>
                          <option v-for="day in 31" :key="day" :value="day">{{ day }}</option>
                        </select>
  
                      </div>
  
  
                      <label class="text-gray-700 font-semibold block mb-1 text-sm">Provincia a la que postuló</label>
                      <div class="relative">
  
                        <select name="provincia" id="provincia" :class="{ 'error-border': errors.provincia }"
                          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm pr-10 mb-2"
                          v-model="formData.provincia">
                          <option value="" disabled selected>--Seleccione una provincia--</option>
                          <option value="AZUAY">AZUAY</option>
                          <option value="BOLÍVAR">BOLÍVAR</option>
                          <option value="CAÑAR">CAÑAR</option>
                          <option value="CARCHI">CARCHI</option>
                          <option value="COTOPAXI">COTOPAXI</option>
                          <option value="CHIMBORAZO">CHIMBORAZO</option>
                          <option value="EL ORO">EL ORO</option>
                          <option value="ESMERALDAS">ESMERALDAS</option>
                          <option value="GUAYAS">GUAYAS</option>
                          <option value="IMBABURA">IMBABURA</option>
                          <option value="LOJA">LOJA</option>
                          <option value="LOS RÍOS">LOS RÍOS</option>
                          <option value="MANABÍ">MANABÍ</option>
                          <option value="MORONA SANTIAGO">MORONA SANTIAGO</option>
                          <option value="NAPO">NAPO</option>
                          <option value="PASTAZA">PASTAZA</option>
                          <option value="PICHINCHA">PICHINCHA</option>
                          <option value="TUNGURAHUA">TUNGURAHUA</option>
                          <option value="ZAMORA CHINCHIPE">ZAMORA CHINCHIPE</option>
                          <option value="GALÁPAGOS">GALÁPAGOS</option>
                          <option value="SUCUMBÍOS">SUCUMBÍOS</option>
                          <option value="ORELLANA">ORELLANA</option>
                          <option value="SANTO DOMINGO DE LOS TSÁCHILAS">SANTO DOMINGO DE LOS TSÁCHILAS</option>
                          <option value="SANTA ELENA">SANTA ELENA</option>
                        </select>
  
  
                      </div>
  
                    </div>
  
                    <div class="flex justify-center items-center mt-2 mb-1">
                      <a href="./documentosAnexos/guiaDeUsuario.pdf" download="guiaDeUsuario.pdf"
                        class="px-2 py-2 bg-blue-500 text-white font-semibold text-xs rounded-lg shadow-md hover:bg-blue-600 transition duration-200">
                        Descargar Guía de Usuario
                      </a>
                    </div>
  
                    <button id="ingresar"
                      class="my-3 bg-blue-800 hover:bg-blue-gray-700 text-white font-bold py-2 px-4 rounded-md w-full text-sm"
                      @click.prevent="ingresar" v-if="validaContrasena === true && parseInt(tipoUsuario) === 1">
                      Ingresar
                    </button>
  
  
                    <button id="ingresar"
                      class="my-3 bg-blue-800 hover:bg-blue-gray-700 text-white font-bold py-2 px-4 rounded-md w-full text-sm"
                      @click.prevent="ingresarBeneficiario"
                      v-if="validaContrasena === true && parseInt(tipoUsuario) === 2">
                      Ingresar
                    </button>
  
                  </form>
                </div>
              </div>
            </div>
  
            <div class="col-md-6 d-none d-md-block">
              <div class="top-0 position-absolute h-100 me-n2">
                <img :src="imageSrc" alt="Imagen desde el backend" class="object-cover object-center w-full h-full"
                  loading="eager" fetchpriority="high" />
              </div>
            </div>
  
          </div>
        </div>
      </section>
  
    </main>
  </template>
  
  <script>
  import variable from '@/js/auth/index.js';
  export default {
    name: "Ingreso",
    mixins: [variable],
  };
  </script>
  
  <style>
  html,
  body {
    overflow-x: hidden; /* Bloquea solo el scroll horizontal */
    overflow-y: auto;   /* Permite el scroll vertical */
    height: auto;
    min-height: 100vh;  /* Asegura que el cuerpo tenga al menos el alto de la pantalla */
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
  