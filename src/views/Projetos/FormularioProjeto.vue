<template>
  <section>
    <form @submit.prevent="salvar">
      <div class="field">
        <label for="nomeDoProjeto" class="label">Nome do Projeto</label>
        <input
          type="text"
          class="input"
          v-model="nomeDoProjeto"
          id="nomeDoProjeto"
        />
      </div>
      <div class="field">
        <button class="button" type="submit">Salvar</button>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import { TipoNotificacao } from "@/interfaces/INotificacao";
import { useStore } from "@/store";
import { defineComponent, ref } from "@vue/runtime-core";
import useNotificador from "@/hooks/notificador";
import { ALTERAR_PROJETO, CADASTRAR_PROJETO } from "@/store/tipo-acoes";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "FormularioProjeto",
  props: {
    id: {
      type: String,
    },
  },
  setup(props) {
    const store = useStore();
    const { notificar } = useNotificador();
    const nomeDoProjeto = ref("");
    const router = useRouter();

    if (props.id) {
      const projeto = store.state.projeto.projetos.find(
        (proj) => proj.id === props.id
      );
      nomeDoProjeto.value = projeto?.nome || "";
    }

    const salvar = () => {
      if (props.id) {
        store
          .dispatch(ALTERAR_PROJETO, {
            id: props.id,
            nome: nomeDoProjeto.value,
          })
          .then(() => lidarComSucesso());
      } else {
        store
          .dispatch(CADASTRAR_PROJETO, nomeDoProjeto.value)
          .then(() => lidarComSucesso());
      }
    };

    const lidarComSucesso = () => {
      nomeDoProjeto.value = "";

      notificar(
        TipoNotificacao.SUCESSO,
        "Novo Projeto Adicionado",
        "Prontinho, seu projeto já está disponível"
      );

      router.push("/projetos");
    };

    return {
      nomeDoProjeto,
      salvar,
    };
  },
});
</script>

<style scoped></style>
