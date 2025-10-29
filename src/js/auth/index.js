import { forkJoin } from "rxjs";
import VsudButton from "@/components/VsudButton.vue";
import ministerioPortada__2 from '@/assets/img/ministerioPortada__2.png';
import header from '@/assets/img/banner-gobierno_color.png';
import { mensajeErrorDatos } from '@/js/validaciones/formularios/funcionesObligatorios.js';
import { observableAxios__auth, observableAxios__auth__inicial, observableAxios__auth__beneficiario, observableAxios__comprobarUsuario, observableAxios__comprobarUsuario__reseteoContrasena } from '@/js/axios/index.js';
import Swal from 'sweetalert2';
import { numeros, longitud } from '@/js/validaciones/validacion.js';


const body = document.getElementsByTagName("body")[0];

export default {
  name: "Ingreso",
  components: {
    VsudButton,
  },
  data() {
    return {
      formData: {
        usuario: '',
        password: '',
        mesNacimiento: '',
        diaNacimientoForm: '',
        provincia: '',
      },
      errors: {
        usuario: '',
        password: '',
        mesNacimiento: '',
        diaNacimientoForm: '',
        provincia: '',
      },
      cargando: false,
      imageSrc: null,
      showPassword: false,
      validaContrasena: false,
      tipoUsuario: '',
      tipo: '',
      tipologia: '',
      habilitar__instancia: false,
      idCredencial: '',
      validacion__1: false,
      validacion__2: false,
      header: null,
    }
  },
  mounted() {
    this.fetchImageData__inicial();
  },
  methods: {
    recuperarContrasenaModal() {

      const templateHtml = document.querySelector('.contenedor__modal').innerHTML;

      Swal.fire({
        title: `<div class="text-lg font-semibold text-gray-800 text-center">RECUPERAR CONTRASEÑA</div>`,
        html: templateHtml,
        showConfirmButton: false,
        showCloseButton: true,
        closeButtonHtml: '<i class="fas fa-times"></i>',
        showCancelButton: false,
        allowOutsideClick: false,
        didOpen: () => {

          const usuario = Swal.getHtmlContainer().querySelector('#usuario');
          this.validacionUsuario(usuario);

          const validarUsuario = Swal.getHtmlContainer().querySelector('#validarUsuario');
          const contenedorContrasena = Swal.getHtmlContainer().querySelector('#contenedorContrasena');
          this.validacionCredencialDeUsuario(validarUsuario, usuario, contenedorContrasena);

          const codigo = Swal.getHtmlContainer().querySelector('#codigo');
          this.validacionCodigo(codigo);

          const error__conrasena__1 = Swal.getHtmlContainer().querySelector('#error__conrasena__1');
          const error__conrasena__2 = Swal.getHtmlContainer().querySelector('#error__conrasena__2');

          const contrasena__1 = Swal.getHtmlContainer().querySelector('#contrasena__1');
          const contrasena__2 = Swal.getHtmlContainer().querySelector('#contrasena__2');

          this.valiarContrasena__1(contrasena__1, contrasena__2, error__conrasena__1);
          this.valiarContrasena__2(contrasena__2, contrasena__1, error__conrasena__2);

          const guardarInformacionEnviar = Swal.getHtmlContainer().querySelector('#guardarInformacionEnviar');
          this.validacionCredencialDeUsuario__envio(guardarInformacionEnviar, codigo, contrasena__1, contrasena__2);

          const toggleContrasena1 = Swal.getHtmlContainer().querySelector('#toggleContrasena1');
          const toggleContrasena2 = Swal.getHtmlContainer().querySelector('#toggleContrasena2');

          toggleContrasena1.addEventListener('click', () => {
            if (contrasena__1.type === 'password') {
              contrasena__1.type = 'text';
              toggleContrasena1.classList.remove('fa-eye');
              toggleContrasena1.classList.add('fa-eye-slash');
            } else {
              contrasena__1.type = 'password';
              toggleContrasena1.classList.remove('fa-eye-slash');
              toggleContrasena1.classList.add('fa-eye');
            }
          });

          toggleContrasena2.addEventListener('click', () => {
            if (contrasena__2.type === 'password') {
              contrasena__2.type = 'text';
              toggleContrasena2.classList.remove('fa-eye');
              toggleContrasena2.classList.add('fa-eye-slash');
            } else {
              contrasena__2.type = 'password';
              toggleContrasena2.classList.remove('fa-eye-slash');
              toggleContrasena2.classList.add('fa-eye');
            }
          });

        }
      });

    },
    validacionCredencialDeUsuario__envio(guardarInformacionEnviar, codigo, contrasena__1, contrasena__2) {

      guardarInformacionEnviar.addEventListener('click', () => {

        if (contrasena__1.value === '' || contrasena__1.value === null || contrasena__1.value === undefined || contrasena__2.value === '' || contrasena__2.value === null || contrasena__2.value === undefined) {

          Swal.showValidationMessage('Obligatorio ingresar la contraseña a restablecer y la confirmación de la misma');
          return;

        } else if (this.validacion__1 === false || this.validacion__2 === false) {

          Swal.fire({
            title: 'error',
            text: 'No deben existir errores en el ingreso de la contraseña',
            icon: 'error',
            confirmButtonText: 'Aceptar',
            timer: 5000,
            timerProgressBar: true,
            allowOutsideClick: true,
            allowEscapeKey: true
          });

        } else {

          Swal.showValidationMessage(' ');
          Swal.getValidationMessage().style.display = 'none';

          forkJoin([observableAxios__comprobarUsuario__reseteoContrasena(codigo.value, this.idCredencial, contrasena__1.value)]).subscribe({

            next: (results) => {

              const mensaje = results[0].mensaje;


              if (parseInt(mensaje, 10) === 1) {

                Swal.fire({
                  title: 'Success',
                  text: 'Actualización realizada correctamente',
                  icon: 'success',
                  confirmButtonText: 'Aceptar',
                  timer: 2000,
                  timerProgressBar: true,
                  allowOutsideClick: true,
                  allowEscapeKey: true
                });

                setTimeout(function () {
                  window.location.reload();
                }, 2000);

              } else if (parseInt(mensaje, 10) === 0) {

                Swal.showValidationMessage('Código de verificación no válido');
                return;

              }

            },

          });

        }

      });

    },
    validacionCodigo(codigo) {
      codigo.addEventListener('input', () => {

        codigo.value = codigo.value.replace(/\D/g, '');

        if (codigo.value.length > 10) {
          codigo.value = codigo.value.slice(0, 6);
        }

      });
    },
    valiarContrasena__2(contrasena__2, contrasena__1, error__conrasena__2) {

      contrasena__2.addEventListener('input', () => {
        if (contrasena__2.value === contrasena__1.value && this.validacion__1) {
          error__conrasena__2.innerHTML = '';
          this.validacion__2 = true;
        } else {
          error__conrasena__2.innerHTML = 'Las contraseñas deben coincidir';
          this.validacion__2 = false;
        }
      });

    },
    valiarContrasena__1(contrasena__1, contrasena__2, error__conrasena__1) {

      contrasena__1.addEventListener('input', () => {
        const valor = contrasena__1.value;
        const tieneLongitud = valor.length >= 6;
        const tieneNumero = /\d/.test(valor);
        const tieneMayuscula = /[A-Z]/.test(valor);

        if (tieneLongitud && tieneNumero && tieneMayuscula) {
          error__conrasena__1.innerHTML = '';
          this.validacion__1 = true;
        } else {
          error__conrasena__1.innerHTML = 'La contraseña debe tener al menos 6 caracteres, incluir un número y una letra mayúscula.';
          this.validacion__1 = false;
        }

        if (contrasena__2.value !== '') {
          contrasena__2.dispatchEvent(new Event('input'));
        }

      });

    },
    validacionCredencialDeUsuario(validarUsuario, usuario, contenedorContrasena) {

      validarUsuario.addEventListener('click', () => {

        if (usuario.value === '' || usuario.value === null || usuario.value === undefined) {
          validarUsuario.classList.remove('hidden');
          Swal.showValidationMessage('Usuario obligatorio');
          return;
        } else {

          Swal.showValidationMessage(' ');
          Swal.getValidationMessage().style.display = 'none';

          validarUsuario.classList.add('hidden');

          forkJoin([observableAxios__comprobarUsuario(usuario.value)]).subscribe({
            next: (results) => {
              const mensaje = results[0].mensaje;

              if (parseInt(mensaje, 10) !== 0) {

                this.idCredencial = mensaje;
                contenedorContrasena.classList.remove('hidden');
                validarUsuario.classList.remove('hidden');

              } else {

                Swal.showValidationMessage('Credenciales inválidas');
                validarUsuario.classList.remove('hidden');

              }
            }
          });
        }
      });
    },
    validacionUsuario(usuario) {

      usuario.addEventListener('input', () => {

        usuario.value = usuario.value.replace(/\D/g, '');

        if (usuario.value.length > 10) {
          usuario.value = usuario.value.slice(0, 10);
        }

      });

    },
    ingresarBeneficiario() {

      this.errors.usuario = !this.formData.usuario;
      this.errors.mesNacimiento = !this.formData.mesNacimiento;
      this.errors.diaNacimientoForm = !this.formData.diaNacimientoForm;
      this.errors.provincia = !this.formData.provincia;

      if (!this.errors.mesNacimiento && !this.errors.diaNacimientoForm && !this.errors.provincia) {

        forkJoin([observableAxios__auth__beneficiario(this.formData)]).subscribe({

          next: (results) => {

            const resultado = results[0].informacionValidada;


            if (parseInt(resultado, 10) !== 0) {

              localStorage.setItem('id', resultado.id);
              localStorage.setItem('cedula', resultado.cedula);
              localStorage.setItem('apellidos', resultado.apellidos);
              localStorage.setItem('fechaNacimiento', resultado.fechaNacimiento);
              localStorage.setItem('nombre', resultado.nombre);
              localStorage.setItem('siglas', resultado.siglas);
              localStorage.setItem('nombreInstitucion', resultado.nombreInstitucion);
              localStorage.setItem('area', resultado.area);
              localStorage.setItem('destreza', resultado.destreza);
              localStorage.setItem('genero', resultado.genero);
              localStorage.setItem('nacionalidad', resultado.nacionalidad);
              localStorage.setItem('idProvincia', resultado.idProvincia);
              localStorage.setItem('provincia', resultado.provincia);
              localStorage.setItem('idCanton', resultado.idCanton);
              localStorage.setItem('canton', resultado.canton);
              localStorage.setItem('idParroquia', resultado.idParroquia);
              localStorage.setItem('parroquia', resultado.parroquia);
              localStorage.setItem('direccion', resultado.direccion);
              localStorage.setItem('telefono', resultado.telefono);
              localStorage.setItem('correo', resultado.correo);
              localStorage.setItem('idifi', resultado.idifi);
              localStorage.setItem('nombreCorto', resultado.nombreCorto);
              localStorage.setItem('tipoCuenta', resultado.tipoCuenta);
              localStorage.setItem('numeroCuenta', resultado.numeroCuenta);
              localStorage.setItem('isspol', resultado.isspol);
              localStorage.setItem('issfa', resultado.issfa);
              localStorage.setItem('iess', resultado.iess);
              localStorage.setItem('area_mdh', resultado.area_mdh);
              localStorage.setItem('puntaje', resultado.puntaje);
              localStorage.setItem('condicion_pobreza', resultado.condicion_pobreza);
              localStorage.setItem('beneficios_mdh', resultado.beneficios_mdh);
              localStorage.setItem('beneficiario_jovenes_1', resultado.beneficiario_jovenes_1);
              localStorage.setItem('cumplimiento', resultado.cumplimiento);
              localStorage.setItem('puntaje_num', resultado.puntaje_num);
              localStorage.setItem('orden_puntaje', resultado.orden_puntaje);
              localStorage.setItem('mindedec_29600', resultado.mindedec_29600);
              localStorage.setItem('idCredencial', resultado.idCredencial);
              localStorage.setItem('idBanco_cuenta', resultado.idBanco_cuenta);
              localStorage.setItem('tipoCuenta_banco', resultado.tipoCuenta_banco);
              localStorage.setItem('numeroCuenta_banco', resultado.numeroCuenta_banco);
              localStorage.setItem('idEntidadBancaria_banco', resultado.idEntidadBancaria_banco);
              localStorage.setItem('tipoCuenta_nombre', resultado.tipoCuenta_nombre);
              localStorage.setItem('cuentaBancaria_nombre', resultado.cuentaBancaria_nombre);
              localStorage.setItem('jwt', resultado.jwt);


              if (parseInt(resultado.ingresarActivo__password, 10) === 1) {
                this.$router.push('/validacion-de-credenciales');
              } else {
                this.$router.push('/validacion-usuarios');
              }

            } else {
              if (parseInt(this.tipoUsuario, 10) === 2) {
                Swal.fire({
                  title: 'error',
                  text: 'Datos Incorrectos',
                  icon: 'error',
                  confirmButtonText: 'Aceptar',
                  timer: 5000,
                  timerProgressBar: true,
                  allowOutsideClick: true,
                  allowEscapeKey: true
                });
              } else {
                Swal.fire({
                  title: 'error',
                  text: 'Credenciales incorrectas',
                  icon: 'error',
                  confirmButtonText: 'Aceptar',
                  timer: 5000,
                  timerProgressBar: true,
                  allowOutsideClick: true,
                  allowEscapeKey: true
                });
              }

            }


          },
          error: (error) => {
          }

        });

      } else {
        mensajeErrorDatos();
      }

    },
    validar() {

      this.cargando = true;

      forkJoin([observableAxios__auth__inicial(this.formData.usuario)]).subscribe({
        next: (results) => {
          const resultado = results[0].informacionValidada;

          if (parseInt(resultado, 10) === 5000) {
            Swal.fire({
              title: 'Aviso Importante',
              html: `
                <div class="text-center">
                  <p class="text-lg font-bold">
                    El aplicativo Ecuatorianos en Acción estará temporalmente suspendido debido al proceso de verificación para el segundo pago. Agradecemos su comprensión.
                  </p>
                </div>
              `,
              icon: 'error',
              confirmButtonText: 'Aceptar',
              timer: 10000,
              timerProgressBar: true,
              allowOutsideClick: true,
              allowEscapeKey: true
            });


          } else if (parseInt(resultado, 10) === 1000) {
            Swal.fire({
              title: 'Error',
              html: `
                <div class="text-center">
                  <p class="text-lg font-bold">
                    El periodo de validación ha finalizado
                  </p>
                </div>
              `,
              icon: 'error',
              confirmButtonText: 'Aceptar',
              timer: 10000,
              timerProgressBar: true,
              allowOutsideClick: true,
              allowEscapeKey: true
            });


          } else if (parseInt(resultado, 10) === 200) {
            Swal.fire({
              title: 'Error',
              html: `
                <div class="text-left">
                  <p class="text-xs">
                    Usted no se encuentra en la base de datos de beneficiarios del mecanismo Jóvenes en Acción del Ministerio de Educación, Deporte y Cultura
                  </p>
                </div>
              `,
              icon: 'error',
              confirmButtonText: 'Aceptar',
              timer: 10000,
              timerProgressBar: true,
              allowOutsideClick: true,
              allowEscapeKey: true
            });


          } else if (parseInt(resultado, 10) === 2) {
            this.validaContrasena = true;
            this.tipoUsuario = resultado;
            this.tipologia = 'Digite código de verificación';

          } else if (parseInt(resultado, 10) === 1) {
            this.validaContrasena = true;
            this.tipoUsuario = resultado;
            this.tipologia = 'Digite contraseña';

          } else {
            Swal.fire({
              title: 'Error',
              html: `
              <div class="text-left">
                <p class="text-xs">
                  Usted no se encuentra en la base de datos de beneficiarios del mecanismo Jóvenes en acción del Ministerio de Educación, Deporte y Cultura 
                </p>
              </div>
            `,
              icon: 'error',
              confirmButtonText: 'Aceptar',
              timer: 5000,
              timerProgressBar: true,
              allowOutsideClick: true,
              allowEscapeKey: true
            });
          }

          this.cargando = false;
        },
        error: () => {
          this.cargando = false;
        }
      });

    },
    inputCedula() {
      numeros(document.getElementById("usuario"));
      longitud(document.getElementById("usuario"), 10);
    },
    fetchImageData__inicial() {
      this.imageSrc = ministerioPortada__2;
      this.header = header;
    },

    ingresar() {

      this.errors.usuario = !this.formData.usuario;
      this.errors.password = !this.formData.password;

      if (!this.errors.usuario && !this.errors.password) {

        forkJoin([observableAxios__auth(this.formData)]).subscribe({

          next: (results) => {

            const resultado = results[0].informacionValidada;

            if (parseInt(resultado, 10) !== 0) {

              if (resultado[0].ruta === "/validacion-usuarios") {
                localStorage.setItem('id', resultado.id);
                localStorage.setItem('cedula', resultado.cedula);
                localStorage.setItem('apellidos', resultado.apellidos);
                localStorage.setItem('fechaNacimiento', resultado.fechaNacimiento);
                localStorage.setItem('nombre', resultado.nombre);
                localStorage.setItem('siglas', resultado.siglas);
                localStorage.setItem('nombreInstitucion', resultado.nombreInstitucion);
                localStorage.setItem('area', resultado.area);
                localStorage.setItem('destreza', resultado.destreza);
                localStorage.setItem('genero', resultado.genero);
                localStorage.setItem('nacionalidad', resultado.nacionalidad);
                localStorage.setItem('idProvincia', resultado.idProvincia);
                localStorage.setItem('provincia', resultado.provincia);
                localStorage.setItem('idCanton', resultado.idCanton);
                localStorage.setItem('canton', resultado.canton);
                localStorage.setItem('idParroquia', resultado.idParroquia);
                localStorage.setItem('parroquia', resultado.parroquia);
                localStorage.setItem('direccion', resultado.direccion);
                localStorage.setItem('telefono', resultado.telefono);
                localStorage.setItem('correo', resultado.correo);
                localStorage.setItem('idifi', resultado.idifi);
                localStorage.setItem('nombreCorto', resultado.nombreCorto);
                localStorage.setItem('tipoCuenta', resultado.tipoCuenta);
                localStorage.setItem('numeroCuenta', resultado.numeroCuenta);
                localStorage.setItem('isspol', resultado.isspol);
                localStorage.setItem('issfa', resultado.issfa);
                localStorage.setItem('iess', resultado.iess);
                localStorage.setItem('area_mdh', resultado.area_mdh);
                localStorage.setItem('puntaje', resultado.puntaje);
                localStorage.setItem('condicion_pobreza', resultado.condicion_pobreza);
                localStorage.setItem('beneficios_mdh', resultado.beneficios_mdh);
                localStorage.setItem('beneficiario_jovenes_1', resultado.beneficiario_jovenes_1);
                localStorage.setItem('cumplimiento', resultado.cumplimiento);
                localStorage.setItem('puntaje_num', resultado.puntaje_num);
                localStorage.setItem('orden_puntaje', resultado.orden_puntaje);
                localStorage.setItem('mindedec_29600', resultado.mindedec_29600);
                localStorage.setItem('idCredencial', resultado.idCredencial);
                localStorage.setItem('idBanco_cuenta', resultado.idBanco_cuenta);
                localStorage.setItem('tipoCuenta_banco', resultado.tipoCuenta_banco);
                localStorage.setItem('numeroCuenta_banco', resultado.numeroCuenta_banco);
                localStorage.setItem('idEntidadBancaria_banco', resultado.idEntidadBancaria_banco);
                localStorage.setItem('tipoCuenta_nombre', resultado.tipoCuenta_nombre);
                localStorage.setItem('cuentaBancaria_nombre', resultado.cuentaBancaria_nombre);

                localStorage.setItem('jwt', resultado.jwt);
              } else {
                localStorage.setItem('cedula', resultado[0].cedula);
                localStorage.setItem('jwt', resultado[0].jwt);
                localStorage.setItem('nombre', resultado[0].nombre);
                localStorage.setItem('idCredencial', resultado[0].idCredencial);
                localStorage.setItem('ruta', resultado[0].ruta);
              }


              this.$router.push(resultado[0].ruta);

            } else {

              if (parseInt(this.tipoUsuario, 10) === 2) {
                Swal.fire({
                  title: 'error',
                  text: 'Datos Incorrectos',
                  icon: 'error',
                  confirmButtonText: 'Aceptar',
                  timer: 5000,
                  timerProgressBar: true,
                  allowOutsideClick: true,
                  allowEscapeKey: true
                });
              } else {
                Swal.fire({
                  title: 'error',
                  text: 'Credenciales incorrectas',
                  icon: 'error',
                  confirmButtonText: 'Aceptar',
                  timer: 5000,
                  timerProgressBar: true,
                  allowOutsideClick: true,
                  allowEscapeKey: true
                });
              }

            }


          },
          error: (error) => {
          }

        });

      } else {
        mensajeErrorDatos();
      }

    }
  },
  beforeMount() {
    this.$store.state.hideConfigButton = true;
    this.$store.state.showNavbar = false;
    this.$store.state.showSidenav = false;
    this.$store.state.showFooter = false;
    body.classList.remove("bg-gray-100");
  },
  beforeUnmount() {
    this.$store.state.hideConfigButton = false;
    this.$store.state.showNavbar = true;
    this.$store.state.showSidenav = true;
    this.$store.state.showFooter = true;
    body.classList.add("bg-gray-100");
  },
};
