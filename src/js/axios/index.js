import axios from "axios";
import { Observable } from "rxjs";

export const observableAxios__terminacionValidacion = (idCredencial) => new Observable((observer) => {

    let paqueteDeDatos = new FormData();
    paqueteDeDatos.append("idCredencial", idCredencial);

    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'observableAxios__terminacionValidacion',
        data: paqueteDeDatos,
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

});

export const observableAxios__generar__codigo = (idCredencial) => new Observable((observer) => {

    let paqueteDeDatos = new FormData();
    paqueteDeDatos.append("idCredencial", idCredencial);

    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'observableAxios__generar__codigo',
        data: paqueteDeDatos,
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

});

export const cumplimiento__finalizar = (idCredencial) => new Observable((observer) => {

    let paqueteDeDatos = new FormData();
    paqueteDeDatos.append("idCredencial", idCredencial);

    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'cumplimiento__finalizar',
        data: paqueteDeDatos,
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

});

export const observableAxios__cargar_capacitacion = (cedula) => new Observable((observer) => {

    let paqueteDeDatos = new FormData();
    paqueteDeDatos.append("cedula", cedula);

    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'observableAxios__cargar_capacitacion',
        data: paqueteDeDatos,
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

});

export const observableAxios__cargar__edicionCuenta = (idCredencial) => new Observable((observer) => {

    let paqueteDeDatos = new FormData();
    paqueteDeDatos.append("idCredencial", idCredencial);

    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'observableAxios__cargar__edicionCuenta',
        data: paqueteDeDatos,
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

});


export const observableAxios__cargar_asignacion = (cedula) => new Observable((observer) => {

    let paqueteDeDatos = new FormData();
    paqueteDeDatos.append("cedula", cedula);

    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'observableAxios__cargar_asignacion',
        data: paqueteDeDatos,
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

});

export const observableAxios__cargar_datos_bancarios = (idCredencial) => new Observable((observer) => {

    let paqueteDeDatos = new FormData();
    paqueteDeDatos.append("idCredencial", idCredencial);

    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'observableAxios__cargar_datos_bancarios',
        data: paqueteDeDatos,
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

});

export const observableAxios__obtener__tipo__cuenta = (params) => new Observable((observer) => {

    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'observableAxios__obtener__tipo__cuenta',
        data: params,
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

});

export const observableAxios__obtener__bancos = (params) => new Observable((observer) => {

    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'observableAxios__obtener__bancos',
        data: params,
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

});

export const observableAxios__informacionBeneficiario__excel__no__cumplen = (params = {}) =>
    new Observable((observer) => {
        const formData = new FormData();

        Object.entries(params).forEach(([key, value]) => {
            if (typeof value === "object") {
                formData.append(key, JSON.stringify(value));
            } else {
                formData.append(key, value);
            }
        });

        axios({
            method: "post",
            url: process.env.VUE_APP_URL_AXIOS + "informacionBeneficiario__excel__no__cumplen",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then((response) => {
                observer.next(response.data);
                observer.complete();
            })
            .catch((error) => {
                observer.error(error);
            });
    });

export const observableAxios__informacionBeneficiario__excel = (params = {}) =>
    new Observable((observer) => {
        const formData = new FormData();

        Object.entries(params).forEach(([key, value]) => {
            if (typeof value === "object") {
                formData.append(key, JSON.stringify(value));
            } else {
                formData.append(key, value);
            }
        });

        axios({
            method: "post",
            url: process.env.VUE_APP_URL_AXIOS + "informacionBeneficiario__excel",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then((response) => {
                observer.next(response.data);
                observer.complete();
            })
            .catch((error) => {
                observer.error(error);
            });
    });

export const observableAxios__informacionBeneficiario__sin = () => new Observable((observer) => {


    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'informacionBeneficiario__sin',
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

});

export const observableAxios__comprobarUsuario__reseteoContrasena = (codigo, idCredencial, contrasena__1) => new Observable((observer) => {

    let paqueteDeDatos = new FormData();

    paqueteDeDatos.append("codigo", codigo);
    paqueteDeDatos.append("idCredencial", idCredencial);
    paqueteDeDatos.append("contrasena__1", contrasena__1);

    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'comprobarUsuario__reseteoContrasena',
        data: paqueteDeDatos,
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

});

export const observableAxios__comprobarUsuario = (usuario) => new Observable((observer) => {

    let paqueteDeDatos = new FormData();

    paqueteDeDatos.append("usuario", usuario);

    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'comprobarUsuario',
        data: paqueteDeDatos,
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

});

export const observableAxios__informacionPuntos__asignados__2 = (params) => new Observable((observer) => {

    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'informacionPuntos__asignados__2',
        data: params,
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

});

export const observableAxios__obtenerRol__pertenece = (idCredencial) => new Observable((observer) => {

    let paqueteDeDatos = new FormData();

    paqueteDeDatos.append("idCredencial", idCredencial);

    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'obtener__rol__definido',
        data: paqueteDeDatos,
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

});

export const observableAxios__parroquia__con = (idCanton) => new Observable((observer) => {

    let paqueteDeDatos = new FormData();

    paqueteDeDatos.append("idCanton", idCanton);

    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'parroquia__con',
        data: paqueteDeDatos,
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

});

export const observableAxios__informacionPuntos__asignados__sin = (id) => new Observable((observer) => {

    let paqueteDeDatos = new FormData();
    paqueteDeDatos.append("id", id);

    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'beneficiarioAsignado__sin',
        data: paqueteDeDatos,
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

});

export const observableAxios__informacionPuntos__asignados = (params) => new Observable((observer) => {

    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'informacionPuntos__asignados',
        data: params,
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

});

export const observableAxios__obtenerActividad = (idCredencial) => new Observable((observer) => {

    let paqueteDeDatos = new FormData();
    paqueteDeDatos.append("idCredencial", idCredencial);

    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'actividadRegistrada',
        data: paqueteDeDatos,
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

});

export const observableAxios__ingresarDocumento = (idCredencial, file) => new Observable((observer) => {

    let paqueteDeDatos = new FormData();
    paqueteDeDatos.append("idCredencial", idCredencial);
    paqueteDeDatos.append("archivo", file);

    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'ingresarDocumento',
        data: paqueteDeDatos,
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

});

export const observableAxios__actualizarPassword = (idCredencial, formData) => new Observable((observer) => {

    let paqueteDeDatos = new FormData();
    paqueteDeDatos.append("idCredencial", idCredencial);

    Object.entries(formData).forEach(([key, value]) => {
        paqueteDeDatos.append(key, value);
    });


    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'actualizar__credenciales__beneficiario',
        data: paqueteDeDatos,
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

});


export const observableAxios__provincia__dependencia = (id) => new Observable((observer) => {

    let paqueteDeDatos = new FormData();
    paqueteDeDatos.append("id", id);

    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'provincia__dependencia',
        data: paqueteDeDatos,
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

});

export const observableAxios__dependencia = new Observable((observer) => {

    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'dependencia',
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

});

export const observableAxios__eliminarInformacion = (id) => new Observable((observer) => {

    let paqueteDeDatos = new FormData();
    paqueteDeDatos.append("id", id);

    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'eliminar__puntoActivate',
        data: paqueteDeDatos,
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

});

export const observableAxios__insertarPunto = (zona, provinciaSelect, cantonSelect, parroquiaSelect, nombrePunto, barrio, callePrincipal, calleSecundaria, isntructor, contactoInstructor, ubicacion, idCredencial) => new Observable((observer) => {

    let paqueteDeDatos = new FormData();
    paqueteDeDatos.append("zona", zona);
    paqueteDeDatos.append("provinciaSelect", provinciaSelect);
    paqueteDeDatos.append("cantonSelect", cantonSelect);
    paqueteDeDatos.append("parroquiaSelect", parroquiaSelect);
    paqueteDeDatos.append("nombrePunto", nombrePunto);
    paqueteDeDatos.append("barrio", barrio);
    paqueteDeDatos.append("callePrincipal", callePrincipal);
    paqueteDeDatos.append("calleSecundaria", calleSecundaria);
    paqueteDeDatos.append("isntructor", isntructor);
    paqueteDeDatos.append("contactoInstructor", contactoInstructor);
    paqueteDeDatos.append("ubicacion", ubicacion);
    paqueteDeDatos.append("idCredencial", idCredencial);

    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'informacionUsuario__insertarPunto',
        data: paqueteDeDatos,
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

});

export const observableAxios__actualizarRoles = (telefono, correo, numeroCuenta, banco, tipoCuenta, parroquiaSelect, idCredencial, cedula, barrio, callePrincipal, calleSecundaria, documentoIdentidad, canton, provincia) => new Observable((observer) => {

    let paqueteDeDatos = new FormData();

    paqueteDeDatos.append("telefono", telefono);
    paqueteDeDatos.append("correo", correo);
    paqueteDeDatos.append("numeroCuenta", numeroCuenta);
    paqueteDeDatos.append("banco", banco);
    paqueteDeDatos.append("tipoCuenta", tipoCuenta);
    paqueteDeDatos.append("parroquiaSelect", parroquiaSelect);
    paqueteDeDatos.append("idCredencial", idCredencial);
    paqueteDeDatos.append("cedula", cedula);
    paqueteDeDatos.append("barrio", barrio);
    paqueteDeDatos.append("callePrincipal", callePrincipal);
    paqueteDeDatos.append("calleSecundaria", calleSecundaria);
    paqueteDeDatos.append("documentoIdentidad", documentoIdentidad);
    paqueteDeDatos.append("canton", canton);
    paqueteDeDatos.append("provincia", provincia);

    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'actualizar__beneficiario__datos',
        data: paqueteDeDatos,
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

});


export const observableAxios__obtenerParroquiasNombres__beneficiario = (canton) => new Observable((observer) => {


    let paqueteDeDatos = new FormData();

    paqueteDeDatos.append("canton", canton);

    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'obtener__parroquiasNombres',
        data: paqueteDeDatos,
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

});

export const observableAxios__obtenerProvinciaNombres = () => new Observable((observer) => {

    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'obtenerProvinciaNombres',
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

});

export const observableAxios__obtenerCantonNombres = (provincia) => new Observable((observer) => {

    let paqueteDeDatos = new FormData();

    paqueteDeDatos.append("provincia", provincia);

    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'obtener__cantonNombres',
        data: paqueteDeDatos,
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

});

export const observableAxios__obtenerParroquiasNombres = (canton) => new Observable((observer) => {


    let paqueteDeDatos = new FormData();

    paqueteDeDatos.append("canton", canton);

    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'obtener__parroquiasNombres',
        data: paqueteDeDatos,
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

});

export const observableObtener__rolPertenece = (idCredencial) => new Observable((observer) => {

    let paqueteDeDatos = new FormData();

    paqueteDeDatos.append("idCredencial", idCredencial);

    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'obtener__rol__pertenece',
        data: paqueteDeDatos,
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

});

export const observableAxios__obtenerRoles__asignadosUsuarios = (cedula) => new Observable((observer) => {

    let paqueteDeDatos = new FormData();

    paqueteDeDatos.append("cedula", cedula);

    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'informacionRoles__asignadoRoles',
        data: paqueteDeDatos,
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

});

export const observableAxios__insertarRoles = (seleccionados, idCredencial, idUsuario) => new Observable((observer) => {

    let paqueteDeDatos = new FormData();
    paqueteDeDatos.append("seleccionados", JSON.stringify(seleccionados));
    paqueteDeDatos.append("idCredencial", idCredencial);
    paqueteDeDatos.append("idUsuario", idUsuario);

    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'insertarRoles',
        data: paqueteDeDatos,
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

});

export const observableAxios__obtenerRoles = () => new Observable((observer) => {

    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'informacionRoles',
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

});

export const observableAxios__informacionBeneficiario__actividades__registradas = (params = {}) => new Observable((observer) => {
    const formData = new FormData();

    // Añade los parámetros al FormData
    for (const key in params) {
        formData.append(key, params[key]);
    }

    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'informacionBeneficiario__actividades__registradas',
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });
});


export const observableAxios__informacion__usuarios__beneficiarios__pagos = (nombre) => new Observable((observer) => {

    let paqueteDeDatos = new FormData();
    paqueteDeDatos.append("nombre", nombre);

    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'informacionUsuario__beneficiario',
        data: paqueteDeDatos,
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

});

export const observableAxios__informacion__usuarios__beneficiarios__sin__pagos = (nombre) => new Observable((observer) => {

    let paqueteDeDatos = new FormData();
    paqueteDeDatos.append("nombre", nombre);

    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'informacionUsuario__beneficiario__sin',
        data: paqueteDeDatos,
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

});

export const observableAxios__informacion__usuarios__beneficiarios = (nombre) => new Observable((observer) => {

    let paqueteDeDatos = new FormData();
    paqueteDeDatos.append("nombre", nombre);

    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'informacionUsuario__beneficiario',
        data: paqueteDeDatos,
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

});

export const observableAxios__informacion__usuarios = (nombre) => new Observable((observer) => {

    let paqueteDeDatos = new FormData();
    paqueteDeDatos.append("nombre", nombre);

    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'informacionUsuario',
        data: paqueteDeDatos,
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

});

export const observableAxios__documento__recuperar__evidencia = (documento) => new Observable((observer) => {

    let paqueteDeDatos = new FormData();

    paqueteDeDatos.append("documento", documento);

    axios({
        method: "post",
        data: paqueteDeDatos,
        url: process.env.VUE_APP_URL_AXIOS + 'documento__recuperar__evidencia',
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

});

export const observableAxios__documento__recuperar = (documento) => new Observable((observer) => {

    let paqueteDeDatos = new FormData();

    paqueteDeDatos.append("documento", documento);

    axios({
        method: "post",
        data: paqueteDeDatos,
        url: process.env.VUE_APP_URL_AXIOS + 'documento__recuperar',
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

});

export const observableAxios__informacionPuntos = () => new Observable((observer) => {

    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'reporteriaPuntos',
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

});

export const observableAxios__informacionActividades__ingresadas = (params) => new Observable((observer) => {

    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'informacionActividades__ingresadas',
        headers: { "Content-Type": "multipart/form-data" },
        data: params,
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

});

export const observableAxios__informacionBeneficiario__no = (params) => new Observable((observer) => {

    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'reporteriaBeneficiarios__no',
        headers: { "Content-Type": "multipart/form-data" },
        data: params,
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

});

export const observableAxios__informacionBeneficiario = (params) => new Observable((observer) => {

    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'reporteriaBeneficiarios',
        headers: { "Content-Type": "multipart/form-data" },
        data: params,
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

});

export const observableAxios__informacionBeneficiario__encuesta__serverside__pagos = (params) => new Observable((observer) => {

    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'reporteriaBeneficiarios__cuestionario__serverside__pagos',
        headers: { "Content-Type": "multipart/form-data" },
        data: params,
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

});


export const observableAxios__informacionBeneficiario__encuesta__serverside = (params) => new Observable((observer) => {

    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'reporteriaBeneficiarios__cuestionario__serverside',
        headers: { "Content-Type": "multipart/form-data" },
        data: params,
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

});

export const observableAxios__obtenerCuestionarios = (idCredencial) => new Observable((observer) => {

    let paqueteDeDatos = new FormData();

    paqueteDeDatos.append("idCredencial", idCredencial);


    axios({
        method: "post",
        data: paqueteDeDatos,
        url: process.env.VUE_APP_URL_AXIOS + 'consultarEncuestaIngresada',
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

});

export const observableAxios__preguntas = () => new Observable((observer) => {

    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'obtenerPreguntas',
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

});

export const observableAxios__documento = (idCredencial) => new Observable((observer) => {

    let paqueteDeDatos = new FormData();

    paqueteDeDatos.append("idCredencial", idCredencial);

    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'obtenerDocumento',
        data: paqueteDeDatos,
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

});



export const observableAxios__ingresarInformacion = (idCredencial, indice, tipoCuenta, numeroCuenta, nombreCorto, editarCuentaBancariaValidada, formData) => new Observable((observer) => {

    let paqueteDeDatos = new FormData();

    paqueteDeDatos.append("idCredencial", idCredencial);
    paqueteDeDatos.append("indice", indice);
    paqueteDeDatos.append("tipoCuenta", tipoCuenta);
    paqueteDeDatos.append("numeroCuenta", numeroCuenta);
    paqueteDeDatos.append("nombreCorto", nombreCorto);
    paqueteDeDatos.append("editarCuentaBancariaValidada", editarCuentaBancariaValidada);

    Object.entries(formData).forEach(([key, value]) => {
        paqueteDeDatos.append(key, value);
    });

    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'ingresar__informacion',
        data: paqueteDeDatos,
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

});

export const observableAxios__menuFormulario = (idCredencial, canton) => new Observable((observer) => {

    let paqueteDeDatos = new FormData();

    paqueteDeDatos.append("idCredencial", idCredencial);
    paqueteDeDatos.append("canton", canton);

    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'comprobar__formulario',
        data: paqueteDeDatos,
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

});




export const observableAxios__parroquia = (idCanton) => new Observable((observer) => {

    let paqueteDeDatos = new FormData();

    paqueteDeDatos.append("idCanton", idCanton);

    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'parroquia',
        data: paqueteDeDatos,
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

});

export const observableAxios__cantones = (idProvincia) => new Observable((observer) => {

    let paqueteDeDatos = new FormData();

    paqueteDeDatos.append("idProvincia", idProvincia);

    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'canton',
        data: paqueteDeDatos,
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

});

export const observableAxios__sedes = (parroquia) => new Observable((observer) => {

    let paqueteDeDatos = new FormData();

    paqueteDeDatos.append("parroquia", parroquia);

    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'sedes',
        data: paqueteDeDatos,
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

});


export const observableAxios__provincia__s = () => new Observable((observer) => {


    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'provincia',
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

});

export const observableAxios__provincia = new Observable((observer) => {

    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'provincia',
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

});


export const observableAxios__dinardap__ruc = (ruc) => new Observable((observer) => {

    let paqueteDeDatos = new FormData();

    paqueteDeDatos.append("ruc", ruc);

    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'dinardap__ruc',
        data: paqueteDeDatos,
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

});

export const observableAxios__obtenerMenu = (idCredencial, cedula) => new Observable((observer) => {

    let paqueteDeDatos = new FormData();

    paqueteDeDatos.append("idCredencial", idCredencial);
    paqueteDeDatos.append("cedula", cedula);

    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'menu',
        data: paqueteDeDatos,
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });


});

export const observableAxios__salir = () => new Observable((observer) => {

    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'salir',
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

});

export const observableAxios__auth__inicial = (usuario) => new Observable((observer) => {

    let paqueteDeDatos = new FormData();

    paqueteDeDatos.append("usuario", usuario);

    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'auth__inicial',
        data: paqueteDeDatos,
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });


});

export const observableAxios__auth__beneficiario = (formData) => new Observable((observer) => {

    let paqueteDeDatos = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
        paqueteDeDatos.append(key, value);
    });

    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'auth__beneficiario',
        data: paqueteDeDatos,
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });


});

export const observableAxios__auth = (formData) => new Observable((observer) => {

    let paqueteDeDatos = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
        paqueteDeDatos.append(key, value);
    });

    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'auth',
        data: paqueteDeDatos,
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });


});