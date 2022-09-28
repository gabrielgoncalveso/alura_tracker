import ITarefa from "@/interfaces/ITarefa";
import { Estado } from "@/store";
import {
  ALTERAR_TAREFA,
  CADASTRAR_TAREFA,
  DELETAR_TAREFA,
  OBTER_TAREFAS,
} from "@/store/tipo-acoes";
import {
  ADICIONAR_TAREFA,
  DEFINIR_TAREFAS,
  EXCLUIR_TAREFA,
  MODIFICAR_TAREFA,
} from "@/store/tipo-mutacoes";
import { Module } from "vuex";
import httpCliente from "@/http";

export interface EstadoTarefa {
  tarefas: ITarefa[];
}

export const tarefa: Module<EstadoTarefa, Estado> = {
  mutations: {
    [EXCLUIR_TAREFA](state, id: number) {
      state.tarefas = state.tarefas.filter((tar) => tar.id !== id);
    },
    [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
      state.tarefas = tarefas;
    },
    [ADICIONAR_TAREFA](state, tarefa: ITarefa) {
      state.tarefas.push(tarefa);
    },
    [MODIFICAR_TAREFA](state, tarefa: ITarefa) {
      const index = state.tarefas.findIndex((tar) => tar.id === tarefa.id);
      state.tarefas[index] = tarefa;
    },
  },

  actions: {
    [OBTER_TAREFAS]({ commit }, filtro: string) {
      let url = "tarefas";
      if (filtro) url += "?descricao=" + filtro;

      httpCliente.get(url).then((response) => {
        console.log(response.data);
        commit(DEFINIR_TAREFAS, response.data);
      });
    },
    [CADASTRAR_TAREFA]({ commit }, tarefa: ITarefa) {
      return httpCliente.post("tarefas", tarefa).then((response) => {
        commit(ADICIONAR_TAREFA, response.data);
      });
    },

    [ALTERAR_TAREFA]({ commit }, tarefa: ITarefa) {
      return httpCliente
        .put(`tarefas/${tarefa.id}`, tarefa)
        .then(() => commit(MODIFICAR_TAREFA, tarefa));
    },

    [DELETAR_TAREFA]({ commit }, idTarefa: ITarefa) {
      return httpCliente
        .delete(`tarefas/${idTarefa}`)
        .then(() => commit(EXCLUIR_TAREFA, idTarefa));
    },
  },
};
