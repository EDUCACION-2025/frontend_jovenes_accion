import { forkJoin } from "rxjs";
import { observableAxios__actualizarPassword, observableAxios__documento, observableAxios__ingresarDocumento } from '@/js/axios/index.js';
import Swal from 'sweetalert2';
import { mensajeErrorDatos } from '@/js/validaciones/formularios/funcionesObligatorios.js';

export default {
    name: "Beneficiario_validacionCredenciales",
    data() {
        return {
            formData: {
                password: '',
                password__2: '',
                file: '',
            },
            errors: {
                password: '',
                password__2: '',
                password__validate: '',
                password__2__validate: '',
            },
            showPassword: false,
            showPassword__2: false,
            validacionEnvio: true,
            documentoCargado: '',
            habilitarDocumento: true,
            fileName: '',
        };
    },
    mounted() {
        this.cargaDocumento();
    },
    methods: {
        registrarCedula() {
            if (this.fileName === '') {

                Swal.fire({
                    title: 'Error',
                    text: 'Obligatorio cargar el documento de la cédula de identidad porfavor',
                    icon: 'error',
                    confirmButtonText: 'Aceptar',
                    timer: 5000,
                    timerProgressBar: true,
                    allowOutsideClick: true,
                    allowEscapeKey: true
                });

            } else {

                Swal.fire({
                    title: '¿Está seguro del archivo subido?',
                    text: '',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Sí, confirmar',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.isConfirmed) {

                        forkJoin([observableAxios__ingresarDocumento(localStorage.getItem("idCredencial"), this.formData.file)]).subscribe({
                            next: (results) => {

                                const mensaje = results[0].mensaje;
                                if (parseInt(mensaje, 10) === 1) {
                                    Swal.fire({
                                        title: 'success',
                                        text: 'Credenciales actualizadas correctamente',
                                        icon: 'success',
                                        confirmButtonText: 'Aceptar',
                                        timer: 5000,
                                        timerProgressBar: true,
                                        allowOutsideClick: true,
                                        allowEscapeKey: true
                                    });
                                    setTimeout(function () {
                                        window.location.reload();
                                    }, 2000);
                                }

                            },
                            error: (error) => {
                                console.error(error);
                            }
                        });

                    }
                });

            }

        },
        handleFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                this.fileName = file.name;
                this.formData.file = file;
            }
        },
        triggerFileInput() {
            this.$refs.fileInput.click();
        },
        cargaDocumento() {
            forkJoin([observableAxios__documento(localStorage.getItem("idCredencial"))]).subscribe({
                next: (results) => {

                    const documento = results[0].documento;
                    this.documentoCargado = documento;

                    if (this.documentoCargado === "Error: El archivo no existe") {
                        this.habilitarDocumento = true;
                    } else {
                        this.habilitarDocumento = false;
                    }

                },
                error: (error) => {
                    console.error(error);
                }
            });
        },
        registrar() {

            this.errors.password = !this.formData.password;
            this.errors.password__2 = !this.formData.password__2;

            if (this.errors.password__validate === true || this.errors.password__2__validate === true) {

                Swal.fire({
                    title: 'error',
                    text: 'Verficiar los errores de contraseña',
                    icon: 'error',
                    confirmButtonText: 'Aceptar',
                    timer: 5000,
                    timerProgressBar: true,
                    allowOutsideClick: true,
                    allowEscapeKey: true
                });

            } else if (!this.errors.password__2 && !this.errors.password) {

                Swal.fire({
                    title: '¿Está seguro de activar sus credenciales?',
                    text: '',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Sí, confirmar',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.isConfirmed) {

                        this.validacionEnvio = false;

                        forkJoin([observableAxios__actualizarPassword(localStorage.getItem("idCredencial"), this.formData)]).subscribe({
                            next: (results) => {
                                const mensaje = results[0].mensaje;
                                if (parseInt(mensaje) === 1) {
                                    Swal.fire({
                                        title: 'success',
                                        text: 'Credenciales generadas correctamente',
                                        icon: 'success',
                                        confirmButtonText: 'Aceptar',
                                        timer: 5000,
                                        timerProgressBar: true,
                                        allowOutsideClick: true,
                                        allowEscapeKey: true
                                    });
                                    setTimeout(function () {
                                        window.location.reload();
                                    }, 2000);
                                    localStorage.clear();
                                }
                            }
                        });

                    }
                });

            } else {
                mensajeErrorDatos();
            }

        },
        digitarContrasena__repetir() {
            if (this.formData.password === this.formData.password__2) {
                this.errors.password__2__validate = false;
            } else {
                this.errors.password__2__validate = true;
            }
        },
        digitarContrasena() {
            const password = this.formData.password;
            const minLength = 6;
            const hasNumber = /\d/;
            const hasUpperCase = /[A-Z]/;

            if (password.length >= minLength && hasNumber.test(password) && hasUpperCase.test(password)) {
                this.errors.password__validate = false;
            } else {
                this.errors.password__validate = true;
            }
        },
    },
};
