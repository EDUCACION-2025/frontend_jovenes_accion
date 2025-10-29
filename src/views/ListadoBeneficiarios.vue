<template>

  <button class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" @click="exportarTodoFiltrado"
    :disabled="exportando" v-if="exportando===false">
    <i class="fa-solid fa-file-excel"></i>&nbsp;Exportar Excel
  </button>

  <!-- Mensaje de carga -->
  <span v-if="exportando" class="ml-2 text-gray-700 italic">
    Esperando descarga...
  </span>

  <main class="w-full flex flex-col items-center">
    <div class="w-full">
      <div>
        <table ref="dataTable__recibidos" class="display w-full text-sm text-gray-700 border border-gray-200">

          <tr>

            <td v-for="(column, index) in columns" :key="index">

              <input type="text" class="w-full text-xs mt-1 border border-[#082f49] placeholder-gray-500 p-1"
                :placeholder="'BUSCAR POR ' + column.title" @input="filterColumn(index, $event)" />

            </td>

          </tr>

        </table>
      </div>
    </div>
  </main>

</template>

<script>
import ButtonExcel from "@/components/ButtonExcel.vue";
import ButtonExcelTotal from "@/components/ButtonExcelTotal.vue";
import variable from '@/js/administracion/ListadoBeneficiarios.js';
export default {
  name: "ListadoBeneficiarios",
  components: {
    ButtonExcel,
    ButtonExcelTotal,
  },
  mixins: [variable],
};
</script>
