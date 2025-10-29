import { forkJoin } from "rxjs";
import { observableAxios__menuFormulario, observableAxios__ingresarInformacion, observableAxios__cargar_asignacion, observableAxios__generar__codigo, observableAxios__terminacionValidacion } from '@/js/axios/index.js';
import { numeros, longitud } from '@/js/validaciones/validacion.js';
import Swal from 'sweetalert2';
import { mensajeSatisfactorio } from '@/js/validaciones/formularios/funcionesObligatorios.js';
import DatosBancarios from "@/views/components/formularioValidacion/DatosBancarios/DatosBancarios.vue";
import DatosPersonales from "@/views/components/formularioValidacion/DatosBancarios/DatosPersonales.vue";
import InformacionCapacitacion from "@/views/components/formularioValidacion/DatosBancarios/InformacionCapacitacion.vue";

export default {
    name: "Beneficiario_validacion",
    components: { DatosBancarios, DatosPersonales, InformacionCapacitacion },
    data() {
        return {
            activeTab: 0,
            menuOpen: false,
            formData: {
                celular1: '',
                opcionSeleccionada: '',
                file: '',
                nombreContactoEmergencia: '',
                parroquia: '',
                barrio: '',
                callePrincipal: '',
                calleSecundaria: '',
                password: '',
                confirmPassword: '',
                codigo: '',
            },
            errors: {
                celular1: '',
                nombreContactoEmergencia: '',
                parroquia: '',
                barrio: '',
                callePrincipal: '',
                calleSecundaria: '',
            },
            tabs: [
                { name: "SECCIÓN 1: Datos personales", unlocked: true },
                { name: "SECCIÓN 2: Datos bancarios", unlocked: false },
                { name: "SECCIÓN 3: Información del lugar de asignación y capacitación", unlocked: false },
                { name: "SECCIÓN 4: Validación de credenciales", unlocked: false },
            ],
            id: localStorage.getItem("id") || "No disponible",
            cedula: localStorage.getItem("cedula") || "No disponible",
            apellidos: localStorage.getItem("apellidos") || "No disponible",
            fechaNacimiento: localStorage.getItem("fechaNacimiento") || "No disponible",
            nombre: localStorage.getItem("nombre") || "No disponible",
            edad: this.calcularEdad(localStorage.getItem("fechaNacimiento")),
            siglas: localStorage.getItem("siglas") || "No disponible",
            nombreInstitucion: localStorage.getItem("nombreInstitucion") || "No disponible",
            area: localStorage.getItem("area") || "No disponible",
            destreza: localStorage.getItem("destreza") || "No disponible",
            genero: localStorage.getItem("genero") || "No disponible",
            nacionalidad: localStorage.getItem("nacionalidad") || "No disponible",
            idProvincia: localStorage.getItem("idProvincia") || "No disponible",
            provincia: localStorage.getItem("provincia") || "No disponible",
            idCanton: localStorage.getItem("idCanton") || "No disponible",
            canton: localStorage.getItem("canton") || "No disponible",
            idParroquia: localStorage.getItem("idParroquia") || "No disponible",
            parroquia: localStorage.getItem("parroquia") || "No disponible",
            direccion: localStorage.getItem("direccion") || "No disponible",
            telefono: localStorage.getItem("telefono") || "No disponible",
            correo: localStorage.getItem("correo") || "No disponible",
            idifi: localStorage.getItem("idifi") || "No disponible",
            nombreCorto: localStorage.getItem("idEntidadBancaria_banco") || "No disponible",
            tipoCuenta: localStorage.getItem("tipoCuenta_banco") || "No disponible",
            numeroCuenta: localStorage.getItem("numeroCuenta_banco") || "No disponible",
            isspol: localStorage.getItem("isspol") || "No disponible",
            issfa: localStorage.getItem("issfa") || "No disponible",
            iess: localStorage.getItem("iess") || "No disponible",
            area_mdh: localStorage.getItem("area_mdh") || "No disponible",
            puntaje: localStorage.getItem("puntaje") || "No disponible",
            condicion_pobreza: localStorage.getItem("condicion_pobreza") || "No disponible",
            beneficios_mdh: localStorage.getItem("beneficios_mdh") || "No disponible",
            beneficiario_jovenes_1: localStorage.getItem("beneficiario_jovenes_1") || "No disponible",
            cumplimiento: localStorage.getItem("cumplimiento") || "No disponible",
            puntaje_num: localStorage.getItem("puntaje_num") || "No disponible",
            orden_puntaje: localStorage.getItem("orden_puntaje") || "No disponible",
            mindedec_29600: localStorage.getItem("mindedec_29600") || "No disponible",
            actividad: localStorage.getItem("actividad") || "No disponible",
            tipoCuenta_nombre: localStorage.getItem("tipoCuenta_nombre") || "No disponible",
            cuentaBancaria_nombre: localStorage.getItem("cuentaBancaria_nombre") || "No disponible",
            idBanco_cuenta: localStorage.getItem("idBanco_cuenta") || "No disponible",
            tipoCuenta_banco: localStorage.getItem("tipoCuenta_banco") || "No disponible",
            numeroCuenta_banco: localStorage.getItem("numeroCuenta_banco") || "No disponible",
            idEntidadBancaria_banco: localStorage.getItem("idEntidadBancaria_banco") || "No disponible",
            idCredencial: localStorage.getItem("idCredencial") || "No disponible",
            cuentaBancariaValidada: false,
            editarCuentaBancariaValidada: false,
            fileName: '',
            mostrarDocumento: false,
            documentoCargado: '',
            arrayPreguntasRespuestas: [],
            opciones: ['A', 'B', 'C', 'D'],
            respuestasFormulario: [],
            preguntaIdEnviar: [],
            respuestaIdEnviar: [],
            valorIdEnviar: [],
            cuestionarioActivado: false,
            videoActivo: false,
            videoUrl: "",
            opcionesParroquia: [],
            editaDatosDespues: false,
            editaCuentaDespues: false,
            editaFotografiaDespues: false,
            activador: false,
            punto: '',
            instructor: '',
            celularInstructor: '',
            area_responsable: null,
            cod_pago_rechazo: null,
            area_designacion: null,
            lugar_designacion: null,
            zona: null,
            cod_distrito: null,
            provincia_distrito: null,
            canton_distrito: null,
            direccion_distrito: null,
            nombre_director_distrital: null,
            correo_electronico: null,
            actividadGeneral: null,
            showPassword: false,
            showConfirmPassword: false,
            loading: false,
            errors: {
                password: '',
                confirmPassword: '',
                password__validate: '',
                password__2__validate: '',
            },
            informacionValdiada: false,
            finaliza: false,
            loadingIndice4: false,
        };
    },
    mounted() {
        this.cargaDataActivar();
        this.cargaDataAsignacion();
        this.validacionFinal();
    },
    computed: {
        preguntasFiltradas() {
            return this.arrayPreguntasRespuestas.filter(item => item.tipo === 'PREGUNTA');
        }
    },
    methods: {
        digitarContrasena() {
            const password = this.formData.password;
            const minLength = 6;
            const hasNumber = /\d/;
            const hasUpperCase = /[A-Z]/;

            this.errors.password__validate = !(password.length >= minLength && hasNumber.test(password) && hasUpperCase.test(password));
        },
        digitarContrasena__repetir() {
            this.errors.password__2__validate = this.formData.password !== this.formData.confirmPassword;
        },
        codigoInput() {
            numeros(document.getElementById("codigo"));
            longitud(document.getElementById("codigo"), 6);
        },
        generarCodigo() {
            this.loading = true;
            forkJoin([observableAxios__generar__codigo(this.idCredencial)]).subscribe({
                next: (results) => {
                    const data = results[0].mensaje || "Correo enviado correctamente.";

                    Swal.fire({
                        icon: "success",
                        title: "¡Código enviado!",
                        text: data,
                        confirmButtonColor: "#1e3a8a",
                    });

                    this.loading = false;
                },
                error: (error) => {
                    console.error("Error generando código:", error);
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Ocurrió un problema al generar el código.",
                        confirmButtonColor: "#b91c1c",
                    });
                    this.loading = false;
                },
            });
        },
        validacionFinal() {
            forkJoin([observableAxios__terminacionValidacion(this.idCredencial)]).subscribe({
                next: (results) => {

                    const data = results[0].informacion;
                    this.informacionValdiada = data;

                },
                error: (error) => {
                    console.error('Error cargando datos bancarios:', error);
                }
            });
        },
        cargaDataAsignacion() {
            forkJoin([observableAxios__cargar_asignacion(this.cedula)]).subscribe({
                next: (results) => {

                    const data = results[0].mensaje || [];
                    this.area_responsable = data[0].area_responsable;
                    this.cod_pago_rechazo = data[0].cod_pago_rechazo;
                    this.area_designacion = data[0].area_designacion;
                    this.lugar_designacion = data[0].lugar_designacion;
                    this.zona = data[0].zona;
                    this.cod_distrito = data[0].cod_distrito;
                    this.provincia_distrito = data[0].provincia_distrito;
                    this.canton_distrito = data[0].canton_distrito;
                    this.direccion_distrito = data[0].direccion_distrito;
                    this.nombre_director_distrital = data[0].nombre_director_distrital;
                    this.correo_electronico = data[0].correo_electronico;
                    this.actividadGeneral = data[0].actividadGeneral;
                },
                error: (error) => {
                    console.error('Error cargando datos bancarios:', error);
                }
            });
        },
        activarVideo() {
            this.videoUrl = "https://www.youtube.com/embed/bjgNkGY1ktE?autoplay=1";
            this.videoActivo = true;
        },
        isImage(base64Data) {
            return base64Data.startsWith('iVBORw0KGgo') ||
                base64Data.startsWith('/9j/');
        },
        respuestasPorPregunta(idPregunta) {
            return this.arrayPreguntasRespuestas.filter(item => item.tipo !== 'PREGUNTA' && item.tipo == idPregunta);
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
        terminosCondicionesModal() {
            const template = document.getElementById('sweetAlertTemplateTerminosCondiciones');
            const templateContent = template.innerHTML;

            const width = window.innerWidth < 640 ? '100%' : '50%';

            Swal.fire({
                title: '<h1 class="uppercase text-xs">POLÍTICA DE PRIVACIDAD</h1>',
                html: templateContent,
                showConfirmButton: false,
                showCloseButton: true,
                closeButtonHtml: '<i class="fas fa-times"></i>',
                showCancelButton: false,
                allowOutsideClick: false,
                width: width,
            });
        },
        accionModificar(event) {
            this.editarCuentaBancariaValidada = event.target.checked;
        },
        calcularEdad(fechaNacimiento) {
            if (!fechaNacimiento) return "No disponible";

            const nacimiento = new Date(fechaNacimiento);
            const hoy = new Date();

            let edad = hoy.getFullYear() - nacimiento.getFullYear();
            const mesDiferencia = hoy.getMonth() - nacimiento.getMonth();
            const diaDiferencia = hoy.getDate() - nacimiento.getDate();

            if (mesDiferencia < 0 || (mesDiferencia === 0 && diaDiferencia < 0)) {
                edad--;
            }

            return edad;
        },
        inputCelular() {
            const celularInput = document.getElementById("celular1");

            numeros(celularInput);
            longitud(celularInput, 10);


            this.formData.celular1 = celularInput.value;

            if (this.formData.celular1.length < 10 && this.formData.celular1.length >= 1) {
                this.errorCelular1 = 'Es necesario que el campo tenga mínimo 10 y máximo 10';
            } else {
                this.errorCelular1 = '';
                document.querySelectorAll('[name="celularValido1"]').forEach(element => element.classList.remove('error-border'));
            }
        },
        agregarPrefijo(event) {
            this.formData.celular1 = '09';
            event.target.value = '09';

        },
        cargaDataActivar() {
            forkJoin([observableAxios__menuFormulario(localStorage.getItem("idCredencial"), this.canton)]).subscribe({
                next: (results) => {

                    const data = results[0].informacion?.[0];

                    if (!data) return;

                    const { seccion1, seccion2, seccion3, seccion4 } = data;

                    if (seccion1 === null && seccion2 === null && seccion3 === null && seccion4 === null) {
                        this.tabs[0].unlocked = true;
                        this.tabs[1].unlocked = false;
                        this.activeTab = 0;
                    } else if (seccion1 === "A" && seccion2 === null && seccion3 === null && seccion4 === null) {
                        this.tabs[0].unlocked = true;
                        this.tabs[1].unlocked = true;
                        this.activeTab = 1;
                    } else if (seccion1 === "A" && seccion2 === "A" && seccion3 === null && seccion4 === null) {
                        this.tabs[0].unlocked = true;
                        this.tabs[1].unlocked = true;
                        this.tabs[2].unlocked = true;
                        this.tabs[3].unlocked = false;
                        this.activeTab = 2;
                    } else if (seccion1 === "A" && seccion2 === "A" && seccion3 === "A" && seccion4 === null) {
                        this.tabs.forEach(tab => tab.unlocked = true);
                        this.activeTab = 3;
                    } else if (seccion1 === "A" && seccion2 === "A" && seccion3 === "A" && seccion4 === "A") {
                        this.tabs.splice(3, 1);
                        this.tabs.forEach(tab => tab.unlocked = true);
                        this.activeTab = 2;
                        this.finaliza = true;
                    }

                },
                error: (error) => {
                    console.error(error);
                }
            });
        },
        changeTab(index) {
            if (this.tabs[index].unlocked) {
                this.activeTab = index;
            }
        },
        toggleMenu() {
            this.menuOpen = !this.menuOpen;
        },
        unlockNextTab(indice) {

            if (parseInt(indice) === 4) {

                if (!this.formData.codigo || !this.formData.password || !this.formData.confirmPassword) {
                    Swal.fire({
                        title: 'Campos vacíos',
                        text: 'Debe ingresar el código, la contraseña y la confirmación de contraseña.',
                        icon: 'warning',
                        confirmButtonText: 'Aceptar',
                    });
                    return;
                }

                if (this.errors.password__validate || this.errors.password__2__validate) {
                    Swal.fire({
                        title: 'Error',
                        text: 'Verifique los errores de contraseña antes de continuar.',
                        icon: 'error',
                        confirmButtonText: 'Aceptar',
                        timer: 5000,
                        timerProgressBar: true,
                    });
                    return;
                }

                Swal.fire({
                    title: '¿Está seguro de activar sus credenciales?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Sí, confirmar',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.procesarEnvio(indice);
                    }
                });

            } else if (parseInt(indice) === 3) {
                Swal.fire({
                    title: '¿Está seguro?',
                    text: 'Está de finalizar la etapa de registro.',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Sí, confirmar',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.procesarEnvio(indice);
                    }
                });
            } else if (this.editarCuentaBancariaValidada === true && parseInt(indice) === 2) {
                Swal.fire({
                    title: '¿Está seguro?',
                    text: 'Está seguro de los datos de su cuenta. Una vez confirmado, no podrá volver a editar.',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Sí, confirmar',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.procesarEnvio(indice);
                        if (this.editarCuentaBancariaValidada) {
                            this.localTipoCuenta = this.tipoCuenta;
                            this.localNumeroCuenta = this.numeroCuenta;
                            this.localNombreCorto = this.idEntidadBancaria_banco;
                            this.editarCuentaBancariaValidada = false;
                        }
                    }
                });
            } else {
                this.procesarEnvio(indice);
            }


        },
        procesarEnvio(indice) {
            if (parseInt(indice) !== 4) {
                // Si no es 4, solo ejecuta la función normal
                forkJoin([
                    observableAxios__ingresarInformacion(
                        localStorage.getItem("idCredencial"),
                        indice,
                        this.tipoCuenta,
                        this.numeroCuenta,
                        this.nombreCorto,
                        this.editarCuentaBancariaValidada,
                        this.formData
                    )
                ]).subscribe({
                    next: (results) => {
                        const data = results[0].mensaje;
                        if ([1, 2, 3].includes(parseInt(indice))) {
                            this.tabs[1].unlocked = true;
                            this.activeTab = parseInt(indice);
                        }
                    },
                    error: (error) => console.error(error)
                });
                return;
            }

            // Solo para índice 4
            this.loadingIndice4 = true; // mostrar cargando
            forkJoin([
                observableAxios__ingresarInformacion(
                    localStorage.getItem("idCredencial"),
                    indice,
                    this.tipoCuenta,
                    this.numeroCuenta,
                    this.nombreCorto,
                    this.editarCuentaBancariaValidada,
                    this.formData
                )
            ]).subscribe({
                next: (results) => {
                    const data = results[0].mensaje;

                    if (parseInt(data) === 10) {
                        Swal.fire({
                            title: 'Error',
                            text: 'El código no es válido',
                            icon: 'error',
                            confirmButtonText: 'Aceptar',
                            timer: 5000,
                            timerProgressBar: true,
                        });
                        this.loadingIndice4 = false;
                        return;
                    }

                    if (parseInt(data) === 1) {
                        mensajeSatisfactorio();
                        setTimeout(() => location.reload(), 3000);
                    }

                    this.loadingIndice4 = false; // terminar carga
                },
                error: (error) => {
                    console.error(error);
                    this.loadingIndice4 = false;
                }
            });
        }
    },
};
