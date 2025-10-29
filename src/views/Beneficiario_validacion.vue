<template>
    <div class="h-screen overflow-y-auto">

        <div class="w-full text-center py-4 px-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-md mb-4">
            <p class="text-sm sm:text-base text-gray-700 font-medium" v-if="finaliza === true">
                ACTIVACIÓN FINALIZADA
            </p>
        </div>

        <div class="w-full text-center py-4 px-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-md mb-4"
            v-if="finaliza === false">
            <p class="text-sm sm:text-base text-gray-700 font-medium">
                Para continuar con el proceso de habilitación para <span class="font-bold">Jóvenes en Acción</span>,
                deberás completar la información requerida en todas las secciones.
            </p>
        </div>

        <!-- Pestañas -->
        <div
            class="flex flex-wrap border-b w-full bg-gradient-to-r from-blue-100 to-purple-100 sm:bg-transparent sm:border-none">
            <button v-for="(tab, index) in tabs" :key="index" @click="changeTab(index)" :disabled="!tab.unlocked"
                class="w-full sm:w-auto px-4 py-2 focus:outline-none text-center text-xs sm:text-sm" :class="{
                    'border-b-2 border-blue-500 font-bold': activeTab === index,
                    'text-blue-400 cursor-not-allowed': !tab.unlocked,
                    'text-black': tab.unlocked && activeTab !== index,
                    'text-blue-600': tab.unlocked && activeTab === index
                }">
                {{ tab.name }}
            </button>
        </div>


        <!-- Contenedor con scroll vertical -->
        <div class="p-4 bg-gray-100 mt-2 rounded-lg overflow-y-auto h-[calc(100vh-100px)]">

            <div v-if="activeTab === 0" class="h-screen overflow-y-auto">

                <DatosPersonales :id="id" :cedula="cedula" :apellidos="apellidos" :fechaNacimiento="fechaNacimiento"
                    :nombre="nombre" :siglas="siglas" :nombreInstitucion="nombreInstitucion" :area="area"
                    :destreza="destreza" :genero="genero" :nacionalidad="nacionalidad" :idProvincia="idProvincia"
                    :provincia="provincia" :idCanton="idCanton" :canton="canton" :idParroquia="idParroquia"
                    :parroquia="parroquia" :direccion="direccion" :telefono="telefono" :correo="correo" :idifi="idifi"
                    :nombreCorto="nombreCorto" :tipoCuenta="tipoCuenta" :numeroCuenta="numeroCuenta" :isspol="isspol"
                    :issfa="issfa" :iess="iess" :area_mdh="area_mdh" :puntaje="puntaje"
                    :condicion_pobreza="condicion_pobreza" :beneficios_mdh="beneficios_mdh"
                    :beneficiario_jovenes_1="beneficiario_jovenes_1" :cumplimiento="cumplimiento"
                    :puntaje_num="puntaje_num" :orden_puntaje="orden_puntaje" :mindedec_29600="mindedec_29600"
                    :edad="edad" @guardar="unlockNextTab(1)" />

            </div>

            <div v-else-if="activeTab === 1" class="h-screen overflow-y-auto">

                <DatosBancarios :active-tab="activeTab" :cuenta-bancaria-validada="cuentaBancariaValidada"
                    :editar-cuenta-bancaria-validada="editarCuentaBancariaValidada"
                    :mostrar-documento="mostrarDocumento" :edita-cuenta-despues="editaCuentaDespues"
                    v-model:tipoCuenta="tipoCuenta" v-model:numeroCuenta="numeroCuenta"
                    v-model:nombreCorto="nombreCorto" :tipoCuenta_nombre="tipoCuenta_nombre"
                    :cuentaBancaria_nombre="cuentaBancaria_nombre" :idBanco_cuenta="idBanco_cuenta"
                    :tipoCuenta_banco="tipoCuenta_banco" :numeroCuenta_banco="numeroCuenta_banco"
                    :idEntidadBancaria_banco="idEntidadBancaria_banco" :idCredencial="idCredencial"
                    :cod_pago_rechazo="cod_pago_rechazo" @editar-cuenta="editarCuentaBancariaValidada = $event"
                    @guardar="unlockNextTab(2)" />

            </div>

            <div v-else-if="activeTab === 2" class="h-screen overflow-y-auto">

                <InformacionCapacitacion :cedula="cedula" :area_responsable="area_responsable"
                    :cod_pago_rechazo="cod_pago_rechazo" :area_designacion="area_designacion"
                    :lugar_designacion="lugar_designacion" :zona="zona" :cod_distrito="cod_distrito"
                    :provincia_distrito="provincia_distrito" :canton_distrito="canton_distrito"
                    :direccion_distrito="direccion_distrito" :nombre_director_distrital="nombre_director_distrital"
                    :correo_electronico="correo_electronico" :actividadGeneral="actividadGeneral"
                    :idCredencial="idCredencial" @guardar="unlockNextTab(3)" />

            </div>


            <div v-else-if="activeTab === 3" class="h-screen overflow-y-auto">
                <div class="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
                    <h2 class="text-lg font-semibold text-gray-800 mb-4 text-center">Activar Credenciales</h2>

                    <!-- Campo de código -->
                    <label for="codigo" class="block text-sm font-medium text-gray-700 mb-1">
                        Código de activación
                    </label>

                    <div class="mb-4 flex items-center space-x-2">
                        <!-- Input principal -->
                        <div class="w-11/12">
                            <input id="codigo" v-model="formData.codigo" type="text" inputmode="numeric"
                                pattern="[0-9]*" maxlength="6" placeholder="Digite aquí su código"
                                class="w-full border border-gray-300 rounded px-3 py-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                                @input="codigoInput" />
                        </div>

                        <!-- Botón generar código -->
                        <div>
                            <!-- Botón o loading -->
                            <div v-if="!loading">
                                <button @click="generarCodigo"
                                    class="bg-blue-900 hover:bg-blue-800 text-white font-medium px-2 py-1 rounded flex items-center text-xs">
                                    <i class="fas fa-sync-alt mr-2"></i> Generar
                                </button>
                            </div>

                            <!-- Spinner mientras carga -->
                            <div v-else
                                class="flex items-center justify-center space-x-2 bg-blue-900 text-white px-2 py-1 rounded text-xs">
                                <svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg"
                                    fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                        stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor"
                                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                                </svg>
                                <span>Enviando...</span>
                            </div>
                        </div>

                    </div>

                    <!-- Campo contraseña -->
                    <div class="relative">
                        <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
                            Contraseña
                        </label>
                        <input id="password" :type="showPassword ? 'text' : 'password'" v-model="formData.password"
                            placeholder="Ingrese su contraseña"
                            class="w-full border border-gray-300 rounded px-3 py-2 pr-10 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                            @input="digitarContrasena" />
                        <button type="button" class="absolute inset-y-0 right-3 flex items-center text-gray-500"
                            @click="showPassword = !showPassword">
                            <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'" class="mt-4"></i>
                        </button>
                    </div>

                    <div v-if="errors.password__validate" class="text-red-500 text-xs mb-2">
                        La contraseña debe tener al menos 6 caracteres, incluir un número y una letra mayúscula.
                    </div>

                    <!-- Campo confirmar contraseña -->
                    <div class="relative">
                        <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1">
                            Confirmar contraseña
                        </label>
                        <input id="confirmPassword" :type="showConfirmPassword ? 'text' : 'password'"
                            v-model="formData.confirmPassword" placeholder="Confirme su contraseña"
                            class="w-full border border-gray-300 rounded px-3 py-2 pr-10 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                            @input="digitarContrasena__repetir" />
                        <button type="button" class="absolute inset-y-0 right-3 flex items-center text-gray-500"
                            @click="showConfirmPassword = !showConfirmPassword">
                            <i :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'" class="mt-4"></i>
                        </button>
                    </div>

                    <div v-if="errors.password__2__validate" class="text-red-500 text-xs mb-2">
                        Las contraseñas deben conicidir
                    </div>

                    <!-- Botón normal -->
                    <button v-if="!loadingIndice4" @click="procesarEnvio(4)"
                        class="mt-2 bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-auto sm:text-sm hover:bg-blue-600 transition">
                        Guardar
                    </button>

                    <!-- Botón de cargando -->
                    <button v-else disabled
                        class="mt-2 bg-gray-400 text-white px-4 py-2 rounded w-full sm:w-auto sm:text-sm">
                        Cargando...
                    </button>
                </div>

            </div>

        </div>

    </div>


    <template id="sweetAlertTemplateTerminosCondiciones" class="hidden">
        <div class="max-w-full mx-auto bg-white p-4 sm:p-6 rounded-lg shadow-lg">
            <div class="mb-1">
                <p class="text-xs mb-2 text-justify">
                    Declaro la veracidad y autenticidad de los datos proporcionados en este formulario y autorizo
                    expresamente al Ministerio del Deporte para el tratamiento de mis datos personales conforme a lo
                    establecido en la Ley Orgánica de Protección de Datos Personales y demás normativa vigente, para
                    fines de verificación, control y ejecución del programa “Ecuatorianos en Acción”, por lo que:
                </p>
                <ul class="list-disc list-inside ml-6 text-xs text-justify">
                    <li>
                        Cumplo con todos los criterios generales establecidos en el artículo 2 del Decreto Ejecutivo
                        Nro. 578 de 22 de marzo de 2025, así como con la normativa secundaria emitida por el Ministerio
                        del Deporte.
                    </li>
                    <li>
                        Ser el titular de la cuenta bancaria registrada en el sistema correspondiente y acepto que los
                        datos referentes a dicha cuenta no podrán ser modificados.
                    </li>
                    <li>
                        Que la información registrada es verídica, única y no ha sido duplicada.
                    </li>
                    <li>
                        Que no soy beneficiario o beneficiaria de ningún otro programa ejecutado por el Ministerio de
                        Inclusión Económica y Social (MIES).
                    </li>
                    <li>
                        Que resido en la provincia registrada y que mi domicilio corresponde efectivamente a dicha
                        ubicación; y, que
                    </li>
                    <li>
                        No me he inscrito en ninguna otra entidad ejecutora que lleve a cabo el mecanismo “Ecuatorianos
                        en Acción”.
                    </li>
                </ul>
                <p class="text-xs mb-2 text-justify">
                    Reconozco que el incumplimiento de los requisitos establecidos podrá conllevar a la exclusión del
                    programa sin derecho a reclamo alguno, y que cualquier falsedad puede dar lugar a las acciones
                    administrativas y legales que correspondan, para todos los efectos legales derivados de esta
                    declaración, me someto a las leyes de la República del Ecuador y a la jurisdicción de los jueces
                    competentes del lugar en que se gestione el programa.
                </p>
            </div>
        </div>
    </template>


</template>

<script>
import variable from "@/js/beneficiario/Beneficiario_validacion.js";

export default {
    name: "Beneficiario_validacion",
    mixins: [variable],
};
</script>