import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { InjectionKey } from "vue";
import { NOTIFICAR } from "./tipo-mutacoes";
import { INotificacao } from "@/interfaces/INotificacao";
import { EstadoProjeto, projeto } from "./modules/projeto";
import { EstadoTarefa, tarefa } from "./modules/tarefa";
export interface Estado {
  tarefa: EstadoTarefa;
  notificacoes: INotificacao[];
  projeto: EstadoProjeto;
}

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
  state: {
    notificacoes: [],
    projeto: {
      projetos: [],
    },
    tarefa: {
      tarefas: [],
    },
  },
  mutations: {
    [NOTIFICAR](state, novaNotificacao: INotificacao) {
      novaNotificacao.id = new Date().getTime();
      state.notificacoes.push(novaNotificacao);

      setTimeout(() => {
        state.notificacoes = state.notificacoes.filter(
          (notif) => notif.id !== novaNotificacao.id
        );
      }, 3000);
    },
  },
  actions: {},
  modules: {
    projeto,
    tarefa,
  },
});

export function useStore(): Store<Estado> {
  return vuexUseStore(key);
}
