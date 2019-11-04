// DESAFIO 2
console.log('--- \nDesafio 2');
const usuarios = [
  { nome: 'Diego', idade: 23, empresa: 'Rocketseat' },
  { nome: 'Gabriel', idade: 15, empresa: 'Rocketseat' },
  { nome: 'Lucas', idade: 30, empresa: 'Facebook' },
];
const idades = [];
const rockets = [];
let googles;

usuarios.map( usuario => {
  const { idade } = usuario;
  idades.push(idade);  
});

usuarios.filter( usuario => {
  const { empresa, idade } = usuario;
  if ( empresa == 'Rocketseat' && idade >= 18 )
    rockets.push(usuario);
});

usuarios.find( usuario => {
  const { empresa } = usuario;
  if( empresa == 'Rocketseat' )
    googles = true;
});

console.log(idades);
console.log(rockets);
console.log(googles);

const filterByAge = (users, age) => {
  const newUsers = []
  users.filter( user => {
    const { idade } = user;
    if ( idade <= age )
      newUsers.push(user);
  });
  return newUsers;
}

const doubleAge = (users) => {
  const newUsers = []
  users.map( user => {
    user.idade = user.idade * 2;
    newUsers.push(user);
  });
  return newUsers;
}

const dobrados = doubleAge(usuarios);
console.log( filterByAge(dobrados, 50) );