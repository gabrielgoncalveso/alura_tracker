<template>
  <main
    class="columns is-gapless is-multiline"
    :class="{ 'modo-escuro': modoEscuroAtivo }"
  >
    <div class="column is-one-quarter">
      <barra-lateral @aoAlterarTema="trocarTema" />
    </div>
    <div class="column is-three-quarter conteudo">
      <formulario-tarefa @aoSalvarTarefa="salvarTarefa" />
      <div class="lista">
        <caixa-tarefa v-if="tarefas.length === 0">
          Voce não está muito produtiovo hoje :(
        </caixa-tarefa>
        <tarefa-item v-for="(tarefa, i) in tarefas" :key="i" :tarefa="tarefa" />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BarraLateral from "./components/BarraLateral.vue";
import FormularioTarefa from "./components/FormularioTarefa.vue";
import TarefaItem from "./components/TarefaItem.vue";
import ITarefa from "./interfaces/ITarefa";
import CaixaTarefa from "./components/CaixaTarefa.vue";

export default defineComponent({
  name: "App",
  components: {
    BarraLateral,
    FormularioTarefa,
    TarefaItem,
    CaixaTarefa,
  },
  data() {
    return {
      tarefas: [] as ITarefa[],
      modoEscuroAtivo: false,
    };
  },
  methods: {
    salvarTarefa(tarefa: ITarefa) {
      this.tarefas.push(tarefa);
    },
    trocarTema(modoEscuroAtivo: boolean) {
      this.modoEscuroAtivo = modoEscuroAtivo;
    },
  },
});
</script>

<style>
.lista {
  padding: 1.25rem;
}
main {
  --bg-primario: #fff;
  --texto-primario: #000;
}
main.modo-escuro {
  --bg-primario: #2b2d42;
  --texto-primario: #ddd;
}
.conteudo {
  background-color: var(--bg-primario);
}
</style>
