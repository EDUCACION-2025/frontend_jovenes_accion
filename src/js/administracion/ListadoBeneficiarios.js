import { forkJoin } from "rxjs";
import { observableAxios__informacionBeneficiario, observableAxios__informacionBeneficiario__excel } from '@/js/axios/index.js';
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default {
  data() {
    return {
      exportando: false,
      columns: [
        { data: 'id', title: 'ID', className: 'text-center text-xs' },
        { data: 'cedula', title: 'CÉDULA', className: 'text-center text-xs' },
        { data: 'apellidos', title: 'APELLIDOS', className: 'text-center text-xs' },
        { data: 'fechaNacimiento', title: 'FECHA NACIMIENTO', className: 'text-center text-xs' },
        { data: 'nombre', title: 'NOMBRE', className: 'text-center text-xs' },
        { data: 'siglas', title: 'SIGLAS', className: 'text-center text-xs' },
        { data: 'nombreInstitucion', title: 'INSTITUCIÓN', className: 'text-center text-xs' },
        { data: 'area', title: 'ÁREA', className: 'text-center text-xs' },
        { data: 'destreza', title: 'DESTREZA', className: 'text-center text-xs' },
        { data: 'genero', title: 'GÉNERO', className: 'text-center text-xs' },
        { data: 'nacionalidad', title: 'NACIONALIDAD', className: 'text-center text-xs' },
        { data: 'idProvincia', title: 'ID PROVINCIA', className: 'text-center text-xs' },
        { data: 'provincia', title: 'PROVINCIA', className: 'text-center text-xs' },
        { data: 'idCanton', title: 'ID CANTÓN', className: 'text-center text-xs' },
        { data: 'canton', title: 'CANTÓN', className: 'text-center text-xs' },
        { data: 'idParroquia', title: 'ID PARROQUIA', className: 'text-center text-xs' },
        { data: 'parroquia', title: 'PARROQUIA', className: 'text-center text-xs' },
        { data: 'direccion', title: 'DIRECCIÓN', className: 'text-center text-xs' },
        { data: 'telefono', title: 'TELÉFONO', className: 'text-center text-xs' },
        { data: 'correo', title: 'CORREO', className: 'text-center text-xs' },
        { data: 'idifi', title: 'IDIFI', className: 'text-center text-xs' },
        { data: 'nombreCorto', title: 'NOMBRE CORTO', className: 'text-center text-xs' },
        { data: 'tipoCuenta', title: 'TIPO CUENTA', className: 'text-center text-xs' },
        { data: 'numeroCuenta', title: 'NÚMERO DE CUENTA', className: 'text-center text-xs' },
        { data: 'isspol', title: 'ISSPOL', className: 'text-center text-xs' },
        { data: 'issfa', title: 'ISSFA', className: 'text-center text-xs' },
        { data: 'iess', title: 'IESS', className: 'text-center text-xs' },
        { data: 'area_mdh', title: 'ÁREA MDH', className: 'text-center text-xs' },
        { data: 'puntaje', title: 'PUNTAJE', className: 'text-center text-xs' },
        { data: 'condicion_pobreza', title: 'CONDICIÓN POBREZA', className: 'text-center text-xs' },
        { data: 'beneficios_mdh', title: 'BENEFICIOS MDH', className: 'text-center text-xs' },
        { data: 'beneficiario_jovenes_1', title: 'BENEFICIARIO JÓVENES 1', className: 'text-center text-xs' },
        { data: 'cumplimiento', title: 'CUMPLIMIENTO', className: 'text-center text-xs' },
        { data: 'puntaje_num', title: 'PUNTAJE NUM', className: 'text-center text-xs' },
        { data: 'orden_puntaje', title: 'ORDEN PUNTAJE', className: 'text-center text-xs' },
        { data: 'mindedec_29600', title: 'MINDEDEC 29600', className: 'text-center text-xs' },
        {
          data: 'idCredencial',
          title: 'VALIDADO',
          className: 'text-center text-xs',
          render: (data) => data ? data : 'No validado'
        }
      ],
      data: [],
      dataReporteriaCompleta: [],
    };
  },
  mounted() {
    this.cargarDatatabletsInicial();
  },
  methods: {
    filterColumn(index, event) {
      const searchValue = event.target.value;
      this.dataTable.column(index).search(searchValue).draw();
      this.excelReporteriaTotal(); // actualizar Excel al filtrar
    },
    cargarData(d, callback) {
      forkJoin([observableAxios__informacionBeneficiario(d)]).subscribe({
        next: (results) => {
          const response = results[0];
          this.data = response.data || [];
          callback({
            draw: response.draw,
            recordsTotal: response.recordsTotal || 0,
            recordsFiltered: response.recordsFiltered || 0,
            data: this.data
          });
        },
        error: (err) => console.error(err)
      });
    },
    cargarDatatabletsInicial() {
      this.dataTable = $(this.$refs.dataTable__recibidos).DataTable({
        processing: true,
        serverSide: true,
        ajax: (d, callback) => this.cargarData(d, callback),
        columns: this.columns,
        scrollX: true,
        scrollY: "50vh",
        autoWidth: false,
        paging: true,
        pageLength: 20,
        searching: true,
        lengthMenu: [10, 25, 50, 100],
        order: [],
        language: {
          search: "Buscar:",
          lengthMenu: "Mostrar _MENU_ registros por página",
          info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
          paginate: { first: "Primero", last: "Último", next: "Siguiente", previous: "Anterior" },
        },
      });

      // Cuando carga DataTable, actualiza el Excel
      $(this.$refs.dataTable__recibidos).on('xhr.dt', () => this.excelReporteriaTotal());
    },
    excelReporteriaTotal() {
      if (!this.dataTable) return;
      const params = this.dataTable.ajax.params();

      forkJoin([observableAxios__informacionBeneficiario__excel(params)])
        .subscribe({
          next: (results) => {
            this.dataReporteriaCompleta = results[0].data || [];
          },
          error: (err) => console.error(err)
        });
    },
    exportarTodoFiltrado() {
      if (!this.dataTable) return;

      this.exportando = true; // 🔹 empieza el “esperando descarga”

      // ✅ Obtener todos los filtros y búsqueda de DataTables
      const params = this.dataTable.ajax.params();

      // Forzar que traiga todo (sin límite)
      params.length = -1;
      params.start = 0;

      forkJoin([observableAxios__informacionBeneficiario__excel(params)]).subscribe({
        next: (results) => {
          const res = results[0];
          const info = res.data || [];

          if (!info || info.length === 0) {
            alert("No hay datos para exportar.");
            this.exportando = false; // 🔹 finalizar carga
            return;
          }

          // 🧾 Crear hoja Excel
          const worksheet = XLSX.utils.json_to_sheet(info);
          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, "Beneficiarios");

          const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
          const blob = new Blob([excelBuffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          saveAs(blob, "beneficiarios_filtrados.xlsx");

          // 🔹 finalizar carga después de descargar
          this.exportando = false;
        },
        error: (err) => {
          console.error("Error al exportar Excel:", err);
          alert("Ocurrió un error al exportar el archivo.");
          this.exportando = false; // 🔹 finalizar carga
        },
      });
    },
  },
};
