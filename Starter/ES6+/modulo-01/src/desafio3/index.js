// DESAFIO 3
console.log('--- \nDesafio 3');

const arr = [1, 2, 3, 4, 5];
const mappedarr = arr.map( item => item + 10 );
console.log(mappedarr);

const usuario = { nome: 'Diego', idade: 23 };
const mostraIdade = usuario => usuario.idade;
console.log( mostraIdade(usuario) );

const nome = "Diego";
const idade = 23;
const mostraUsuario = (nome = 'Diego', idade = 18) => ({ nome, idade});
console.log( mostraUsuario(nome, idade) );
console.log( mostraUsuario(nome) );

const promise = () => (
  new Promise( (resolve, reject) => resolve )
);
console.log(promise);