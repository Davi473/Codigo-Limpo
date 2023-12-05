const express = require("express");
const app = express();
app.use(express.json());
app.use("/", express.static("./public/window/"))
app.use("/public", express.static("./public"));

// valores dos clientes sem banco de dados
const clientesAdicionados = [
    {client: "Davi Marcos Dorn", email: "davi###@gmail.com", telephone: "47 995####", stats: "Novo"},
     {client: "Fulano", email: "fulano@gmail.com", telephone: "47 7876####", stats: "Ligar Mais Tarde"}
];


// Manda lista de clientes
app.get("/valoresDosClientes", (req, res) => {
    res.json(clientesAdicionados);
});

app.listen(3000);
console.log("Porta localhost:3000")