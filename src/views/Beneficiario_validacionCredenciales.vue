<template>

    <main class="flex flex-col items-center">

        <div class="md:w-1/4 flex-col" v-if="habilitarDocumento === true">

            <h2 class="text-2xl sm:text-3xl font-semibold text-center text-gray-800 mb-4 sm:mb-6">
                Carga tu
                cédula de identidad</h2>

            <div class="flex items-center justify-center border-2 border-dashed border-blue-400 p-4 sm:p-6 rounded-lg hover:border-blue-600 cursor-pointer"
                @click="triggerFileInput">

                <input ref="fileInput" type="file" class="hidden" @change="handleFileChange"
                    accept=".jpg, .jpeg, .png" />

                <div class="text-center text-gray-600">
                    <p class="text-lg sm:text-xl font-medium">Haz clic o arrastra tu archivo aquí</p>
                    <p class="text-sm sm:text-base">Solo archivos jpg, jpeg y png</p>
                </div>
            </div>

            <div v-if="fileName" class="mt-4 text-center text-gray-700">
                <strong>Archivo seleccionado:</strong> {{ fileName }}
            </div>

            <button id="registrar"
                class="my-3 bg-blue-800 hover:bg-blue-gray-700 text-white font-bold py-2 px-4 rounded-md w-full text-sm"
                @click.prevent="registrarCedula">
                Registrar
            </button>

        </div>

        <div class="md:w-1/4 flex-col" v-if="habilitarDocumento === false">

            <div class="font-bold text-xs">
                Ingresar contraseña
            </div>

            <div class="flex w-full mt-1">

                <input :type="showPassword ? 'text' : 'password'" :class="{ 'error-border': errors.password }"
                    class="w-11/12 px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm pr-10"
                    placeholder="Ingrese contraseña" id="password" name="password" v-model="formData.password"
                    @input="digitarContrasena" />
                <button type="button" @click="showPassword = !showPassword">
                    {{ showPassword ? '🙈' : '👁️' }}
                </button>

            </div>

            <div v-if="errors.password__validate" class="text-red-500 text-xs mt-2">
                La contraseña debe tener al menos 6 caracteres, incluir un número y una letra mayúscula.
            </div>

            <div class="font-bold text-xs mt-4">
                Repetir contraseña
            </div>

            <div class="flex w-full mt-1">

                <input :type="showPassword__2 ? 'text' : 'password'" :class="{ 'error-border': errors.password__2 }"
                    class="w-11/12 px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm pr-10"
                    placeholder="Repita su contraseña" id="password__2" name="password__2"
                    v-model="formData.password__2" @input="digitarContrasena__repetir" />
                <button type="button" @click="showPassword__2 = !showPassword__2">
                    {{ showPassword__2 ? '🙈' : '👁️' }}
                </button>

            </div>

            <div v-if="errors.password__2__validate" class="text-red-500 text-xs mt-2">
                Las contraseñas deben conicidir
            </div>

            <button id="registrar"
                class="my-3 bg-blue-800 hover:bg-blue-gray-700 text-white font-bold py-2 px-4 rounded-md w-full text-sm"
                @click.prevent="registrar" v-if="validacionEnvio === true">
                Registrar
            </button>

        </div>

    </main>

</template>

<script>
import variable from "@/js/beneficiario/Beneficiario_validacionCredenciales.js";

export default {
    name: "Beneficiario_validacionCredenciales",
    mixins: [variable],
};
</script>