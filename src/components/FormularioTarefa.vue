<template>
  <div class="box formulario">
    <div class="columns">
      <div
        class="column is-5"
        role="form"
        aria-label="Formulário para criação de nova tarefa"
      >
        <input
          type="text"
          class="input"
          placeholder="Qual tarefa você deseja iniciar?"
          v-model="descricao"
        />
      </div>

      <div class="column is-3">
        <div class="select">
          <select v-model="idProjeto">
            <option value="">Selecione o Projeto</option>
            <option
              :value="projeto.id"
              v-for="projeto in projetos"
              :key="projeto.id"
            >
              {{ projeto.nome }}
            </option>
          </select>
        </div>
      </div>
      <div class="column">
        <temporizador-formulario
          :projeto="idProjeto"
          @aoTemporizadorFinalizado="finalizarTarefa"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { TipoNotificacao } from "@/interfaces/INotificacao";
import { useStore } from "@/store";
import { computed, defineComponent, ref } from "@vue/runtime-core";
import TemporizadorFormulario from "./TemporizadorFormulario.vue";
import useNotificador from "@/hooks/notificador";

export default defineComponent({
  name: "FormularioTarefa",
  emits: ["aoSalvarTarefa"],
  components: {
    TemporizadorFormulario,
  },
  setup(props, { emit }) {
    const store = useStore();
    const { notificar } = useNotificador();

    const descricao = ref("");
    const idProjeto = ref("");

    const projetos = computed(() => store.state.projeto.projetos);

    const finalizarTarefa = (tempoDecorrido: number): void => {
      const projeto = projetos.value.find(
        (proj) => proj.id === idProjeto.value
      );
      if (projeto === undefined) {
        notificar(
          TipoNotificacao.ATENCAO,
          "Atenção",
          "Selecione um projeto antes de salvar a tarefas!"
        );
        return;
      }

      emit("aoSalvarTarefa", {
        duracaoEmSegundos: tempoDecorrido,
        descricao: descricao.value,
        projeto: projeto,
      });
    };

    return {
      projetos,
      descricao,
      idProjeto,
      finalizarTarefa,
    };
  },
});
</script>

<style>
.formulario {
  background-color: var(--bg-primario);
  color: var(--texto-primario);
  padding: 1.25rem;
}
</style>
