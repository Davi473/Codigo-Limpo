class Tela {
  constructor(web) {
    new Lista(web);
  }
}

const web = new Web("http://localhost:3000");

new Tela(web);
