// DESAFIO 4
console.log('--- \nDesafio 4');
const empresa = {
  nome: 'Rocketseat',
  endereco: {
    cidade: 'Rio do Sul',
    estado: 'SC',
  }
};
function mostraDados(empresa) {
  const { nome, endereco: { cidade, estado } } = empresa;
  console.log(nome); // Rocketseat
  console.log(cidade); // Rio do Sul
  console.log(estado); // SC
}
mostraDados(empresa)


function mostraInfo(usuario) {
  const { nome, idade } = usuario;
  return `${nome} tem ${idade} anos.`;
 }
 console.log( mostraInfo({ nome: 'Diego', idade: 23 }) );