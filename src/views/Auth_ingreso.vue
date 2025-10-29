<template>
  <div class="app-container">

    <!-- Header con imagen de gobierno -->
    <!-- Header con imagen de gobierno -->
    <header class="w-full flex justify-center">
      <img :src="header" alt="Banner Gobierno" class="h-auto max-h-32" />
    </header>
    <main class="main-content flex-grow flex items-center justify-center">
      <section class="flex flex-wrap w-full min-h-[80vh]">
        <div class="container mx-auto flex flex-wrap items-start">
          <div class="row flex flex-wrap items-center">
            <!-- Login form - ahora más a la izquierda -->
            <div class="col-xl-3 col-lg-4 col-md-5 d-flex flex-column mt-n9 ml-0 md:ml-4">
              <div class="card shadow-lg p-4 bg-white rounded-lg">
                <div class="pb-0 card-header text-start">
                  <p class="mb-0 text-xs md:text-lg font-bold text-gray-800 text-center">JOVENES EN ACCIÓN</p>
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
                        <select name="mesNacimiento" id="mesNacimiento"
                          :class="{ 'error-border': errors.mesNacimiento }"
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
                          <option value="SANTO DOMINGO">SANTO DOMINGO DE LOS TSÁCHILAS</option>
                          <option value="SANTA ELENA">SANTA ELENA</option>
                        </select>
                      </div>
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

                    <div class="flex justify-center items-center mt-2 mb-1 w-full cursor-pointer"
                      @click="recuperarContrasenaModal">
                      <a
                        class="w-full px-2 py-2 bg-yellow-500 text-white font-semibold text-xs rounded-lg shadow-md hover:bg-yellow-500 transition duration-200 flex justify-center">
                        <i class="fa-solid fa-lock mr-2"></i>
                        Recuperar contraseña
                      </a>
                    </div>

                    <div class="flex justify-center items-center mt-2 mb-1 w-full">
                      <a href="./documentosAnexos/guiaDeUsuario.pdf" download="guiaDeUsuario.pdf"
                        class="w-full px-2 py-2 bg-blue-500 text-white font-semibold text-xs rounded-lg shadow-md hover:bg-blue-600 transition duration-200 flex justify-center">
                        <i class="fa-solid fa-file-pdf mr-2"></i>
                        Descargar Guía de Usuario
                      </a>
                    </div>

                  </form>
                </div>
              </div>
            </div>

            <!-- Imagen lateral - ahora ocupa más espacio con fondo azul -->
            <div class="col-md-7 col-lg-8 d-none d-md-block ml-auto">
              <div
                class="w-full max-h-[70vh] flex items-center justify-center overflow-hidden bg-custom-blue rounded-lg shadow-lg">
                <img :src="imageSrc" alt="Imagen desde el backend" class="max-w-full max-h-full object-contain"
                  loading="eager" fetchpriority="high" />
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  </div>


  <div class="hidden contenedor__modal flex flex-col items-center px-4 py-2">

    <div class="font-bold text-xs text-justify mb-4">
      Para recuperar su contraseña, deberá digitar su usuario (cédula de identidad) y se enviará un código a su correo
      registrado
    </div>

    <!-- Usuario -->
    <div class="flex flex-col md:flex-row w-full mt-2 items-start md:items-center gap-2">
      <span class="font-bold text-xs w-full md:w-1/5">Usuario</span>
      <input type="text" id="usuario" placeholder="Digite su usuario"
        class="form-control error__vacio w-full md:w-9/12" />
      <button class="bg-blue-800 text-white font-bold p-2 rounded hover:bg-blue-900 transition md:w-14 w-full"
        id="validarUsuario">
        <i class="fa-regular fa-share-from-square"></i>
        <img id="gifCarga" src="https://loading.io/spinners/typing/lg.typing-4.gif" alt="Cargando..."
          class="hidden w-6 h-6 ml-2" />
      </button>
    </div>

    <!-- Contenedor Contraseña -->
    <div id="contenedorContrasena" class="md:w-full w-full flex-col hidden mt-4">

      <div class="text-xs font-bold mt-1 mb-1 flex items-center">
        <i class="fa-solid fa-circle-info font-bold"></i>
        <p class="ml-2 font-bold text-xs text-justify">El código de verificación tendrá una vigencia de 5 minutos a
          partir de su envío.En caso de no visualizar el mensaje en su bandeja de entrada, le recomendamos revisar la
          carpeta de Spam o Correo no deseado.</p>
      </div>

      <!-- Código de validación -->
      <div class="flex flex-col md:flex-row w-full mt-2 items-start md:items-center gap-2">
        <span class="font-bold text-xs w-full md:w-1/5">Código de validación</span>
        <input type="text" id="codigo" placeholder="Ingrese código de validación"
          class="form-control error__vacio w-full md:w-9/12" />
      </div>

      <!-- Contraseña -->
      <div class="flex flex-col md:flex-row w-full mt-2 items-start md:items-center gap-2">
        <span class="font-bold text-xs w-full md:w-1/5">Contraseña</span>
        <div class="relative w-full md:w-9/12">
          <input type="password" id="contrasena__1" placeholder="Ingrese contraseña"
            class="form-control error__vacio w-full">
          <i id="toggleContrasena1"
            class="fas fa-eye absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"></i>
        </div>
      </div>

      <div id="error__conrasena__1" class="text-xs text-left text-red-500"></div>

      <!-- Repetir contraseña -->
      <div class="flex flex-col md:flex-row w-full mt-2 items-start md:items-center gap-2">
        <span class="font-bold text-xs w-full md:w-1/5">Repita su contraseña</span>
        <div class="relative w-full md:w-9/12">
          <input type="password" id="contrasena__2" placeholder="Ingrese contraseña"
            class="form-control error__vacio w-full">
          <i id="toggleContrasena2"
            class="fas fa-eye absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"></i>
        </div>
      </div>

      <div id="error__conrasena__2" class="text-xs tex-lef text-red-500"></div>

      <button class="bg-blue-800 text-white font-bold p-2 rounded hover:bg-blue-900 transition w-full mt-2"
        id="guardarInformacionEnviar">
        <i class="fa-solid fa-unlock mr-2"></i>Resetear Contraseña
      </button>

    </div>

  </div>

</template>

<script>
import variable from '@/js/auth/index.js';
export default {
  name: "Ingreso",
  mixins: [variable],
};
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}

header {
  flex-shrink: 0;
}

.main-content {
  flex-grow: 1;
  overflow-y: auto;
}

/* Asegurar que no haya scroll horizontal */
.container {
  max-width: 100%;
  padding-left: 1rem;
  padding-right: 1rem;
}

/* Para pantallas más grandes */
@media (min-width: 768px) {
  .container {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}

/* Estilos para el formulario de login */
.card {
  max-width: 100%;
  box-sizing: border-box;
}

/* Asegurar que las imágenes no causen overflow */
img {
  max-width: 100%;
  height: auto;
}

/* Fondo azul personalizado para la imagen lateral */
.bg-custom-blue {
  background-color: #14304E;
  /* HEX #14304E */
}
</style>