<template>
  <formulario-tarefa @aoSalvarTarefa="salvarTarefa" />
  <div class="lista">
    <caixa-tarefa v-if="tarefas.length === 0">
      Voce não está muito produtiovo hoje :(
    </caixa-tarefa>
    <tarefa-item v-for="(tarefa, i) in tarefas" :key="i" :tarefa="tarefa" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "@vue/runtime-core";
import FormularioTarefa from "../components/FormularioTarefa.vue";
import TarefaItem from "../components/TarefaItem.vue";
import ITarefa from "../interfaces/ITarefa";
import CaixaTarefa from "../components/CaixaTarefa.vue";
import { useStore } from "@/store";
import { ADICIONA_TAREFA } from "@/store/tipo-mutacoes";
import { TipoNotificacao } from "@/interfaces/INotificacao";
import useNotificador from "@/hooks/notificador";
export default defineComponent({
  name: "TarefasView",
  components: {
    FormularioTarefa,
    TarefaItem,
    CaixaTarefa,
  },
  methods: {
    salvarTarefa(tarefa: ITarefa) {
      this.store.commit(ADICIONA_TAREFA, tarefa);
      this.notificar(
        TipoNotificacao.SUCESSO,
        "Sucesso",
        "Sucesso, sua tarefa foi salva!"
      );
    },
  },
  setup() {
    const store = useStore();
    const { notificar } = useNotificador();
    return {
      store,
      notificar,
      tarefas: computed(() => store.state.tarefas),
    };
  },
});
</script>

<style></style>
