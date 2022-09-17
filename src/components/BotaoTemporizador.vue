<!-- Desafio -->
<template>
  <button class="button" @click="aoClicar" :disabled="desabilitado">
    <span class="icon">
      <i :class="icone"></i>
    </span>
    <span>{{ texto }}</span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "BotaoTemporizador",
  emits: ["clique"],
  props: {
    desabilitado: {
      type: Boolean,
      required: true,
    },
    icone: {
      type: String,
      required: true,
    },
    texto: {
      type: String,
      required: true,
    },
  },
  methods: {
    aoClicar() {
      this.$emit("clique");
    },
  },
});
</script>

<style></style>
