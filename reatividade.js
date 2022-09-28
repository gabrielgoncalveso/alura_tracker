const projeto = {
  id: 1,
  descricao: "Alura tracker 3.0",
};

const proxy = new Proxy(projeto, {
  get(objetoOriginal, chave, receptor) {
    console.log("Alguem pediu a chave " + chave + " do projeto");
    return Reflect.get(objetoOriginal, chave, receptor);
  },
  set(objetoOriginal, chave, valor) {
    console.log("Alguem alterou a chave " + chave + " para o valor " + valor);
    objetoOriginal[chave] = valor;
  },
});

proxy.descricao = "Reatividade é top";

console.log(proxy.descricao);
