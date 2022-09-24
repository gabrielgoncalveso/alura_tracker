import { createRouter, RouteRecordRaw, createWebHashHistory } from "vue-router";
import TarefasView from "../views/TarefasView.vue";
import ProjetosView from "../views/ProjetosView.vue";
import FormularioProjeto from "../views/Projetos/FormularioProjeto.vue";
import ListaProjetos from "../views/Projetos/ListaProjetos.vue";
const rotas: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Tarefas",
    component: TarefasView,
  },
  {
    path: "/projetos",
    component: ProjetosView,
    children: [
      {
        path: "",
        name: "Projetos",
        component: ListaProjetos,
      },
      {
        path: "novo",
        name: "Novo Projeto",
        component: FormularioProjeto,
      },
      {
        path: ":id",
        name: "Editar Projeto",
        props: true,
        component: FormularioProjeto,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: rotas,
});

export default router;
