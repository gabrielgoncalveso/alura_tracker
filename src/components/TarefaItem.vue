<template>
  <caixa-tarefa>
    <div class="columns">
      <div class="column is-7">
        {{ tarefa.descricao || "Tarefa sem Descrição" }}
      </div>
      <div class="column">
        <cronometro-formulario :tempoEmSegundos="tarefa.duracaoEmSegundos" />
      </div>
    </div>
  </caixa-tarefa>
</template>

<script lang="ts">
import ITarefa from "@/interfaces/ITarefa";
import { defineComponent, PropType } from "@vue/runtime-core";
import CronometroFormulario from "./CronometroFormulario.vue";
import CaixaTarefa from "./CaixaTarefa.vue";

export default defineComponent({
  name: "TarefaItem",
  components: {
    CronometroFormulario,
    CaixaTarefa,
  },
  props: {
    tarefa: {
      type: Object as PropType<ITarefa>,
      required: true,
    },
  },
});
</script>

<style scoped></style>
