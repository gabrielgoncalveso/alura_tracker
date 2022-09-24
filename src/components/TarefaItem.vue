<template>
  <caixa-tarefa>
    <div class="columns">
      <!-- <div class="column">
        {{ tarefa.id || "Tarefa sem Descrição" }}
      </div> -->
      <div class="column is-4">
        {{ tarefa.descricao || "Tarefa sem Descrição" }}
      </div>
      <div class="column is-3">
        {{ tarefa.projeto?.nome || "Não Disponível" }}
      </div>
      <div class="column">
        <cronometro-formulario :tempoEmSegundos="tarefa.duracaoEmSegundos" />
      </div>

      <div class="column">
        <button class="button is-danger" @click="excluirTarefa(tarefa.id)">
          <span class="icon is-small">
            <i class="fas fa-trash"></i>
          </span>
        </button>
      </div>
    </div>
  </caixa-tarefa>
</template>

<script lang="ts">
import ITarefa from "@/interfaces/ITarefa";
import { defineComponent, PropType } from "@vue/runtime-core";
import CronometroFormulario from "./CronometroFormulario.vue";
import CaixaTarefa from "./CaixaTarefa.vue";
import { useStore } from "@/store";
import { EXCLUIR_TAREFA } from "@/store/tipo-mutacoes";

export default defineComponent({
  name: "TarefaItem",
  components: {
    CronometroFormulario,
    CaixaTarefa,
  },
  methods: {
    excluirTarefa(id: string) {
      this.store.commit(EXCLUIR_TAREFA, id);
    },
  },
  props: {
    tarefa: {
      type: Object as PropType<ITarefa>,
      required: true,
    },
  },
  setup() {
    const store = useStore();
    return {
      store,
    };
  },
});
</script>

<style scoped></style>
