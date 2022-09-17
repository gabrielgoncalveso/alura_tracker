<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <cronometro-formulario :tempoEmSegundos="tempoEmSegundos" />
    <!-- Desafio -->
    <botao-temporizador
      @clique="iniciarContagem"
      :desabilitado="cronometroRodando"
      icone="fas fa-play"
      texto="Play"
    />
    <botao-temporizador
      @clique="finalizarContagem"
      :desabilitado="!cronometroRodando"
      icone="fas fa-stop"
      texto="Stop"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import CronometroFormulario from "./CronometroFormulario.vue";
import BotaoTemporizador from "./BotaoTemporizador.vue";
export default defineComponent({
  name: "TemporizadorFormulario",
  emits: ["aoTemporizadorFinalizado"],
  components: {
    CronometroFormulario,
    BotaoTemporizador,
  },
  data() {
    return {
      tempoEmSegundos: 0,
      idIntervalo: 0,
      cronometroRodando: false,
    };
  },

  methods: {
    iniciarContagem() {
      this.cronometroRodando = true;
      this.idIntervalo = setInterval(() => {
        this.tempoEmSegundos++;
      }, 1000);
    },
    finalizarContagem() {
      this.cronometroRodando = false;
      clearInterval(this.idIntervalo);
      this.$emit("aoTemporizadorFinalizado", this.tempoEmSegundos);
      this.tempoEmSegundos = 0;
    },
  },
});
</script>

<style></style>
