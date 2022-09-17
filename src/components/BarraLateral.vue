<template>
  <header>
    <h1>
      <img src="../assets/logo.png" alt="logo" />
    </h1>
    <button class="button" @click="alterarTema">{{ textoBotao }}</button>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "BarraLateral",
  emits: ["aoAlterarTema"],
  data() {
    return {
      modoEscuroAtivo: false,
    };
  },
  computed: {
    textoBotao() {
      if (this.modoEscuroAtivo) {
        return "Desativar Modo Escuro";
      }
      return "Ativar Modo Escuro";
    },
  },
  methods: {
    alterarTema() {
      this.modoEscuroAtivo = !this.modoEscuroAtivo;
      this.$emit("aoAlterarTema", this.modoEscuroAtivo);
    },
  },
});
</script>

<style scoped>
header {
  padding: 1rem;
  background: #0d3b65;
  width: 100%;
  height: 100vh;
  text-align: center;
}

@media only sreen and (max-width: 768px) {
  header {
    padding: 2.5rem;
    height: auto;
  }
}
</style>
