class Usuario {
  constructor(email, senha) {
    this.user = {
      email,
      senha,
      admin: false
    }
  }
  isAdmin() {
    return this.user.admin;
  }  
}

class Admin extends Usuario {
  constructor() {
    super();
    this.user.admin = true;
  }
}

const User1 = new Usuario('email@teste.com', 'senha123');
const Adm1 = new Admin('email@teste.com', 'senha123');

console.log(User1.isAdmin()) // false
console.log(Adm1.isAdmin()) // true