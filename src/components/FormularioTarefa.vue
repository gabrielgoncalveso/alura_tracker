<template>
  <div class="box formulario">
    <div class="columns">
      <div
        class="column is-8"
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
      <div class="column">
        <temporizador-formulario @aoTemporizadorFinalizado="finalizarTarefa" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import TemporizadorFormulario from "./TemporizadorFormulario.vue";

export default defineComponent({
  name: "FormularioTarefa",
  emits: ["aoSalvarTarefa"],
  components: {
    TemporizadorFormulario,
  },
  data() {
    return {
      descricao: "",
    };
  },
  methods: {
    finalizarTarefa(tempoDecorrido: number): void {
      this.$emit("aoSalvarTarefa", {
        duracaoEmSegundos: tempoDecorrido,
        descricao: this.descricao,
      });
    },
  },
});
</script>

<style>
.formulario {
  background-color: var(--bg-primario);
  color: var(--texto-primario);
}
</style>
