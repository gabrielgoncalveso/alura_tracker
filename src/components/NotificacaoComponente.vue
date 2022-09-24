<template>
  <div class="notificacoes">
    <article
      class="message"
      v-for="notificacao in notificacoes"
      :key="notificacao.id"
      :class="contexto[notificacao.tipo]"
    >
      <div class="message-header">{{ notificacao.titulo }}</div>
      <div class="message-body">{{ notificacao.texto }}</div>
    </article>
  </div>
</template>

<script lang="ts">
import { TipoNotificacao } from "@/interfaces/INotificacao";
import { useStore } from "@/store";
import { computed, defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "NotificacaoComponente",
  data() {
    return {
      contexto: {
        [TipoNotificacao.SUCESSO]: "is-success",
        [TipoNotificacao.ATENCAO]: "is-warning",
        [TipoNotificacao.FALHA]: "is-danger",
      },
    };
  },
  setup() {
    const store = useStore();
    return {
      //   store,
      notificacoes: computed(() => store.state.notificacoes),
    };
  },
});
</script>

<style scoped>
.notificacoes {
  position: absolute;
  right: 0;
  height: 300px;
  padding: 8px;
  z-index: 105;
}
</style>
