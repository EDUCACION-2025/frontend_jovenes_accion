<template>
  <button
    class="rounded-lg px-1 py-1 border-2 border-green-700 text-green-700 hover:bg-green-700 hover:text-green-100 duration-300"
    @click="exportToExcel">
    <i class="fa-solid fa-file-excel"></i> EXCEL
  </button>
</template>

<script>
import * as XLSX from 'xlsx';

export default {
  name: "ButtonExcelTotal",
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  methods: {
    exportToExcel() {
      if (this.data && this.data.length > 0) {
        const worksheet = XLSX.utils.json_to_sheet(this.data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Hoja 1');
        XLSX.writeFile(workbook, 'reporte.xlsx');
      } else {
        alert("No hay datos para exportar.");
      }
    },
  },
};
</script>