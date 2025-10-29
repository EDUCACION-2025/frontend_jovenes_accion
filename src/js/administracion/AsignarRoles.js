import { forkJoin } from "rxjs";
import { observableAxios__informacion__usuarios, observableAxios__obtenerRoles, observableAxios__insertarRoles, observableAxios__obtenerRoles__asignadosUsuarios } from '@/js/axios/index.js';
import VsudInput from "@/components/VsudInput.vue";
import ImputBuscar from "@/components/VsudInputBuscador.vue";
import boton from "@/components/buttons.vue";
import Swal from 'sweetalert2';

export default {
    name: "AsignarRoles",
    components: {
        VsudInput,
        boton,
        ImputBuscar,

    },
    data() {
        return {
            formData: {
                buscar: ''
            },
            dataTable: null,
            data: [],
            columns:
                [
                    { data: 'id_usuario', title: 'ID' },
                    { data: 'cedula', title: 'CÉDULA' },
                    { data: 'nombreCompleto', title: 'NOMBRE' },
                    { data: 'usuario', title: 'USUARIO' },
                    { data: 'area', title: 'ÁREA' },
                    { data: 'cargo', title: 'CARGO' },
                ],
        }
    },
    methods: {
        initializeDataTable() {
            this.dataTable = $(this.$refs.dataTable).DataTable({
                data: this.data || [],
                columns: this.columns,
                columnDefs: [
                    {
                        targets: 0,
                        visible: false
                    }
                ],
                rowCallback: (row, data) => {
                    const $row = $(row);
                    $row.css('cursor', 'pointer');
                    $row.on('mouseenter', () => $row.addClass('bg-gray-800 text-white'));
                    $row.on('mouseleave', () => $row.removeClass('bg-gray-800 text-white'));

                    $(row).on('click', () => {

                        const obj = {};

                        obj.id_usuario = data.id_usuario;
                        obj.cedula = data.cedula;
                        obj.nombreCompleto = data.nombreCompleto;
                        obj.usuario = data.usuario;
                        obj.area = data.area;
                        obj.cargo = data.cargo;

                        const templateHtml = document.querySelector('.contenedor__modal').innerHTML;
                        this.sweetAlert(obj, templateHtml);

                    });
                }
            });
        },
        sweetAlert(objeto, templateHtml) {

            Swal.fire({
                title: '<h1 class="uppercase text-xs">' + objeto.nombreCompleto + '</h1><div class="text-xs">' + objeto.cedula + '</div>',
                html: templateHtml,
                showConfirmButton: false,
                showCloseButton: true,
                closeButtonHtml: '<i class="fas fa-times"></i>',
                showCancelButton: false,
                allowOutsideClick: false,
                didOpen: () => {
                    forkJoin([observableAxios__obtenerRoles(), observableAxios__obtenerRoles__asignadosUsuarios(objeto.cedula)]).subscribe({
                        next: (results) => {
                            const data = results[0].informacion;
                            const contenedor = Swal.getHtmlContainer().querySelector('#contenedor');

                            const rolesTraidos = results[1].informacion;


                            if (contenedor) {
                                data.forEach(({ idRol, nombre }) => {
                                    const div = document.createElement('div');
                                    div.className = "flex items-center space-x-2 mb-2";

                                    const isChecked = rolesTraidos.some(rol => rol.nombre === nombre) ? 'checked' : '';

                                    div.innerHTML = `
                                        <label for="rol-${idRol}" class="text-sm w-4/5">${nombre}</label>
                                        <input type="checkbox" id="rol-${idRol}" name="roles" value="${nombre}" class="form-checkbox h-10 w-10 text-blue-600" ${isChecked}>
                                    `;

                                    contenedor.appendChild(div);
                                });
                            }

                            const guardarEnvio = Swal.getHtmlContainer().querySelector('#guardarEnvio');

                            guardarEnvio.addEventListener('click', () => {

                                const checkboxes = Swal.getHtmlContainer().querySelectorAll('input[name="roles"]:checked');
                                const seleccionados = Array.from(checkboxes).map(cb => cb.value);

                                if (seleccionados.length === 0) {
                                    Swal.showValidationMessage('Es necesario escoger un rol');
                                } else {
                                    Swal.resetValidationMessage();
                                    this.insertarDatos(seleccionados, objeto.id_usuario);

                                }

                            });

                        },
                        error: (error) => {
                            console.error(error);
                        }
                    });
                }
            });

        },
        insertarDatos(seleccionados, id_usuario) {
            forkJoin([observableAxios__insertarRoles(seleccionados, localStorage.getItem("idCredencial"), id_usuario)]).subscribe({
                next: (results) => {

                    const mensaje = results[0].mensaje;


                    if (parseInt(mensaje, 10) === 1) {

                        Swal.fire({
                            title: 'Success',
                            text: 'Usuario ingresado satisfactoriamente',
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


                    } else {

                        Swal.fire({
                            title: 'Error',
                            text: 'Error al asignar',
                            icon: 'error',
                            confirmButtonText: 'Aceptar',
                            timer: 5000,
                            timerProgressBar: true,
                            allowOutsideClick: true,
                            allowEscapeKey: true
                        });

                    }

                },
            });
        },
        buscar() {
            forkJoin([observableAxios__informacion__usuarios(this.formData.buscar)]).subscribe({
                next: (results) => {
                    const data = results[0].informacion;

                    if (data.length > 0) {
                        if (this.dataTable) {
                            this.dataTable.clear().rows.add(data).draw();
                        } else {
                            this.data = data;
                            this.$nextTick(() => this.initializeDataTable());
                        }
                    } else {
                        Swal.fire({
                            title: 'Error',
                            text: 'Usuario no existe',
                            icon: 'error',
                            confirmButtonText: 'Aceptar',
                            timer: 5000,
                            timerProgressBar: true,
                            allowOutsideClick: true,
                            allowEscapeKey: true
                        });
                    }
                },
                error: (error) => {
                    console.error(error);
                }
            });
        }


    },

};
