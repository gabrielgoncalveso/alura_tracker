<template>
  <formulario-tarefa @aoSalvarTarefa="salvarTarefa" />
  <div class="lista">
    <caixa-tarefa v-if="tarefas.length === 0">
      Voce não está muito produtiovo hoje :(
    </caixa-tarefa>

    <tarefa-item
      v-for="(tarefa, i) in tarefas"
      :key="i"
      :tarefa="tarefa"
      @ao-tarefa-clickada="selecionarTarefa"
    />
  </div>

  <modal-edicao
    :mostrar="tarefaSelecionada !== null"
    v-if="tarefaSelecionada !== null"
  >
    <template v-slot:cabecalho>
      <p class="modal-card-title">Editando uma Tarefa</p>
      <button class="delete" aria-label="close" @click="fecharModal"></button>
    </template>
    <template v-slot:corpo>
      <div class="field">
        <label for="descricaoDaTarefa" class="label">Descrição da Tarefa</label>
        <input
          type="text"
          class="input"
          v-model="tarefaSelecionada.descricao"
          id="descricaoDaTarefa"
        />
      </div>
    </template>
    <template v-slot:rodape>
      <button @click="alterarTarefa" class="button is-success">
        Savar Alterações
      </button>
      <button @click="fecharModal" class="button">Cancelar</button>
    </template>
  </modal-edicao>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from "@vue/runtime-core";
import FormularioTarefa from "../components/FormularioTarefa.vue";
import TarefaItem from "../components/TarefaItem.vue";
import ITarefa from "../interfaces/ITarefa";
import CaixaTarefa from "../components/CaixaTarefa.vue";
import { useStore } from "@/store";
import { TipoNotificacao } from "@/interfaces/INotificacao";
import useNotificador from "@/hooks/notificador";
import {
  ALTERAR_TAREFA,
  CADASTRAR_TAREFA,
  OBTER_PROJETOS,
  OBTER_TAREFAS,
} from "@/store/tipo-acoes";
import ModalEdicao from "@/components/ModalEdicao.vue";
export default defineComponent({
  name: "TarefasView",
  components: {
    FormularioTarefa,
    TarefaItem,
    CaixaTarefa,
    ModalEdicao,
  },
  data() {
    return {
      tarefaSelecionada: null as ITarefa | null,
    };
  },
  methods: {
    salvarTarefa(tarefa: ITarefa) {
      this.store.dispatch(CADASTRAR_TAREFA, tarefa);
      this.notificar(
        TipoNotificacao.SUCESSO,
        "Sucesso",
        "Sucesso, sua tarefa foi salva!"
      );
    },
    selecionarTarefa(tarefa: ITarefa) {
      this.tarefaSelecionada = tarefa;
    },
    fecharModal() {
      this.tarefaSelecionada = null;
    },
    alterarTarefa() {
      this.store
        .dispatch(ALTERAR_TAREFA, this.tarefaSelecionada)
        .then(() => this.fecharModal());
    },
  },
  setup() {
    const store = useStore();
    const { notificar } = useNotificador();
    store.dispatch(OBTER_TAREFAS);
    store.dispatch(OBTER_PROJETOS); //FIXME

    const filtro = ref("");

    watchEffect(() => {
      store.dispatch(OBTER_TAREFAS, filtro.value);
    });

    const tarefas = computed(() =>
      store.state.tarefa.tarefas.filter(
        (t) => !filtro.value || t.descricao.includes(filtro.value)
      )
    );

    return {
      store,
      notificar,
      filtro,
      tarefas,
    };
  },
});
</script>

<style></style>
