const express = require("express");
var cors = require('cors')
const app = express();
app.use(express.json());
app.use("/", express.static("./Site"));

// varivel dos clientes
const clientesAdicionados = [
   // {client: "Davi Marcos Dorn", email: "davi###@gmail.com", telephone: "47 995####", stats: "Novo"},
    {client: "Fulano", email: "fulano@gmail.com", telephone: "47 7876####", stats: "Ligar Mais Tarde"}
];

app.get("/valoresDosClientes", function (req, res){
    res.json(clientesAdicionados);
});

app.post("/adicionar", function (req, res) {
    const lancamento = (req.body);
    console.log(lancamento)
    clientesAdicionados.push(lancamento);  
    res.json({value: `Cliente Novo Adicionado`})
});

app.post("/trocarStats", function (req, res) {
    const valor = (req.body).valor;
    const stats = (req.body).stat;  
    clientesAdicionados[valor].stats = stats

});

app.post("/excluir", function (req, res) {
    const excluir = (req.body).valor;
    clientesAdicionados.splice(excluir, excluir + 1);
    res.json({value: `Excluido Cliente`});
});


app.listen(3002);
console.log("Porta 3002")