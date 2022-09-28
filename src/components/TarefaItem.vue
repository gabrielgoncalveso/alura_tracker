<template>
  <caixa-tarefa>
    <div class="columns">
      <!-- <div class="column">
        {{ tarefa.id || "Tarefa sem Descrição" }}
      </div> -->
      <div class="column is-9 columns clickavel" @click="tarefaClickada">
        <div class="column is-5">
          {{ tarefa.descricao || "Tarefa sem Descrição" }}
        </div>
        <div class="column is-4">
          {{ tarefa.projeto?.nome || "Não Disponível" }}
        </div>
        <div class="column is-3">
          <cronometro-formulario :tempoEmSegundos="tarefa.duracaoEmSegundos" />
        </div>
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
import { DELETAR_TAREFA } from "@/store/tipo-acoes";

export default defineComponent({
  name: "TarefaItem",
  components: {
    CronometroFormulario,
    CaixaTarefa,
  },
  emits: ["aoTarefaClickada"],
  props: {
    tarefa: {
      type: Object as PropType<ITarefa>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const store = useStore();

    const excluirTarefa = (id: number) => {
      store.dispatch(DELETAR_TAREFA, id);
    };
    const tarefaClickada = (): void => {
      emit("aoTarefaClickada", props.tarefa);
    };

    return {
      excluirTarefa,
      tarefaClickada,
    };
  },
});
</script>

<style scoped>
.clickavel {
  cursor: pointer;
}
</style>
