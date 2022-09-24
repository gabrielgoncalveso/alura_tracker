import { TipoNotificacao } from "@/interfaces/INotificacao";
import { store } from "@/store";
import { NOTIFICAR } from "@/store/tipo-mutacoes";
type Notificador = {
  notificar: (tipo: TipoNotificacao, titulo: string, texto: string) => void;
};

export default (): Notificador => {
  const notificar = (
    tipo: TipoNotificacao,
    titulo: string,
    texto: string
  ): void => {
    store.commit(NOTIFICAR, {
      titulo: titulo, //"Novo Projeto Adicionado",
      texto: texto, //"Prontinho, seu projeto já está disponível",
      tipo: tipo, //TipoNotificacao.SUCESSO,
    });
  };

  return {
    notificar,
  };
};
